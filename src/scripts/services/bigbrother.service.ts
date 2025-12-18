import { Injectable } from '@nestjs/common';
import { ScriptUtilityService } from './script-utility.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductsEvents } from 'src/scheduler/enums/products-events.enum';
import { ProductsIds } from 'src/products/enums/products-ids.enum';
import { UserProductDto } from 'src/users-products/dtos/user-product.dto';
import { SpotifyUtilsService } from 'src/spotify-utils/services/spotify-utils.service';
import { ProductsService } from 'src/products/services/products.service';
import { ProductDto } from 'src/products/dtos/product.dto';
import { HttpService } from '@nestjs/axios';
import { SpotifyMeTracksRes } from 'src/spotify-utils/interfaces/responses/spotify-me-tracks-res.interface';
import { BigBrotherAlbumDataModel } from '../models/bigbrother-album-data.models';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BigBrotherService {
    constructor(
        private readonly productsService: ProductsService,
        private readonly scriptUtility: ScriptUtilityService,
        private readonly spotifyUtils: SpotifyUtilsService,
        private readonly httpService: HttpService,
    ) {}

    private readonly productId: ProductsIds = ProductsIds.BIGBROTHER;
    private readonly savedTracksTreshold: number = 0.6;
    private readonly concatenatedIdsLimit: number = 20;

    private async getSavedTracksAlbums(
        accessToken: string,
        albums: BigBrotherAlbumDataModel[],
        href = `https://api.spotify.com/v1/me/tracks?offset=0&limit=${this.spotifyUtils.spotifyRequestsLimit}`,
    ): Promise<BigBrotherAlbumDataModel[]> {
        const response = await lastValueFrom(
            this.httpService.get<SpotifyMeTracksRes>(href, {
                headers: { Authorization: 'Bearer ' + accessToken },
            }),
        );

        for (const savedTrack of response.data.items) {
            const track = savedTrack.track;

            if (track.album.total_tracks > 1) {
                let albumIndex = albums.findIndex(
                    (i) => i.id === track.album.id,
                );
                if (albumIndex == -1) {
                    const album = new BigBrotherAlbumDataModel(
                        track.album.id,
                        track.album.total_tracks,
                    );
                    albumIndex = albums.push(album) - 1;
                }
                albums[albumIndex].savedTracks.push(track.id);
            }
        }

        return response.data.next
            ? await this.getSavedTracksAlbums(
                  accessToken,
                  albums,
                  response.data.next,
              )
            : albums;
    }

    private async saveAlbums(accessToken: string, albumIds: string) {
        await lastValueFrom(
            this.httpService.put(
                `https://api.spotify.com/v1/me/albums?ids=${albumIds}`,
                { x: 'x' },
                { headers: { Authorization: 'Bearer ' + accessToken } },
            ),
        );
    }

    private async saveTresholdReachedAlbums(
        accessToken: string,
        albums: BigBrotherAlbumDataModel[],
    ): Promise<BigBrotherAlbumDataModel[]> {
        const tresholdReachedAlbums: BigBrotherAlbumDataModel[] = [];

        for (const album of albums) {
            if (
                album.savedTracks.length >=
                album.totalTracks * this.savedTracksTreshold
            ) {
                tresholdReachedAlbums.push(album);
            }
        }

        let albumIds = '';
        let idsCounter = 0;

        for (const album of tresholdReachedAlbums) {
            albumIds = albumIds.concat(album.id, ',');
            idsCounter++;

            if (idsCounter === this.concatenatedIdsLimit) {
                await this.saveAlbums(accessToken, albumIds);
                albumIds = '';
                idsCounter = 0;
            }
        }
        if (idsCounter > 0) await this.saveAlbums(accessToken, albumIds);

        return tresholdReachedAlbums;
    }

    private async removeSavedTracks(accessToken: string, tracksIds: string) {
        await lastValueFrom(
            this.httpService.delete(
                `https://api.spotify.com/v1/me/tracks?ids=${tracksIds}`,
                { headers: { Authorization: 'Bearer ' + accessToken } },
            ),
        );
    }

    private async removeSavedTracksFromSavedAlbums(
        accessToken: string,
        savedAlbums: BigBrotherAlbumDataModel[],
    ) {
        let tracksIds = '';
        let idsCounter = 0;

        for (const album of savedAlbums) {
            for (const track of album.savedTracks) {
                tracksIds = tracksIds.concat(track, ',');
                idsCounter = idsCounter + 1;

                if (idsCounter == this.concatenatedIdsLimit) {
                    await this.removeSavedTracks(accessToken, tracksIds);

                    tracksIds = '';
                    idsCounter = 0;
                }
            }
        }
        if (idsCounter > 0)
            await this.removeSavedTracks(accessToken, tracksIds);
    }

    private async runScriptForOneSubscriber(
        product: ProductDto,
        subscriber: UserProductDto,
    ) {
        const accessToken = await this.spotifyUtils.getRefreshedAccessToken(
            subscriber.id,
            product.clientId,
            product.clientSecret,
            subscriber.refreshToken,
        );

        const savedTracksAlbums = await this.getSavedTracksAlbums(
            accessToken,
            [],
        );

        const savedAlbums = await this.saveTresholdReachedAlbums(
            accessToken,
            savedTracksAlbums,
        );

        await this.removeSavedTracksFromSavedAlbums(accessToken, savedAlbums);
    }

    @OnEvent(ProductsEvents.EVERY_DAYS_EVENT)
    async runScript() {
        const product = await this.productsService.getProduct(this.productId);

        if (!product) return;

        const subscribers = await this.scriptUtility.getSubscribers(
            this.productId,
        );
        for (const s of subscribers) {
            await this.runScriptForOneSubscriber(product, s);
        }
    }

    /*configureProduct(userId: string, config: string) {
        return;
    }*/
}
