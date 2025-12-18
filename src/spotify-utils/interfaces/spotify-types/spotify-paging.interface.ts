export interface SpotifyPaging<T> {
    next: string | null;
    items: T[];
}
