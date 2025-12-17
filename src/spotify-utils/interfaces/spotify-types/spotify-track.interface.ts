import { SpotifyAlbum } from './spotify-album.interface';

export interface SpotifyTrack {
    id: string;
    album: SpotifyAlbum;
}
