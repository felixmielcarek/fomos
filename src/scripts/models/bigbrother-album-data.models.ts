export class BigBrotherAlbumDataModel {
    readonly id: string;
    readonly totalTracks: number;
    savedTracks: string[];

    constructor(id: string, totalTracks: number) {
        this.id = id;
        this.totalTracks = totalTracks;
        this.savedTracks = [];
    }
}
