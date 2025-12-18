import { SpotifyPaging } from '../spotify-types/spotify-paging.interface';
import { SpotifySavedTrack } from '../spotify-types/spotify-saved-track.interface';

export type SpotifyMeTracksRes = SpotifyPaging<SpotifySavedTrack>;
