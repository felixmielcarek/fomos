import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from 'src/products/service/products.service';
import { UsersProductsService } from 'src/users-products/service/users-products.service';
import { SpotifyApiTokenRes } from '../interfaces/responses/spotify-api-token-res.interface';
import { SpotifyMeRes } from '../interfaces/responses/spotify-me-res.interface';

@Injectable()
export class SpotifyUtilsService {
    constructor(
        private readonly productsService: ProductsService,
        private readonly usersProductsService: UsersProductsService,
        private readonly httpService: HttpService,
    ) {}

    readonly spotifyRequestsLimit = 50;

    private async getTokens(
        productId: string,
        code: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const product = await this.productsService.getProduct(productId);
        if (!product) throw Error();

        const authHeader = Buffer.from(
            `${product.clientId}:${product.clientSecret}`,
        ).toString('base64');
        const body = new URLSearchParams({
            code,
            redirect_uri: product.redirectUri,
            grant_type: 'authorization_code',
        });

        const response = await lastValueFrom(
            this.httpService.post<SpotifyApiTokenRes>(
                'https://accounts.spotify.com/api/token',
                body.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${authHeader}`,
                    },
                },
            ),
        );
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        };
    }

    private async getSpotifyId(accessToken: string): Promise<string> {
        const response = await lastValueFrom(
            this.httpService.get<SpotifyMeRes>(
                'https://api.spotify.com/v1/me',
                {
                    headers: { Authorization: 'Bearer ' + accessToken },
                },
            ),
        );
        return response.data.id;
    }

    async getRefreshedAccessToken(
        userProductId: number,
        clientId: string,
        clientSecret: string,
        refreshToken: string,
    ): Promise<string> {
        const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
            'base64',
        );
        const body = new URLSearchParams({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
            client_id: clientId,
        });

        const response = await lastValueFrom(
            this.httpService.post<SpotifyApiTokenRes>(
                'https://accounts.spotify.com/api/token',
                body.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${authHeader}`,
                    },
                },
            ),
        );

        await this.usersProductsService.setTokens(userProductId, {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        });

        return response.data.access_token;
    }

    async authorizationCodeCallback(
        productId: string,
        code: string,
        state: string,
    ) {
        if (!state) return;

        const { accessToken, refreshToken } = await this.getTokens(
            productId,
            code,
        );
        const spotifyId = await this.getSpotifyId(accessToken);
        await this.usersProductsService.createUserProductFromSpotifyId(
            spotifyId,
            productId,
            accessToken,
            refreshToken,
        );
    }
}
