export interface Photo {
    id: string;
    file: File;
    preview: string;
    exifData: ExifData | null;
    hash: string;
    date: Date;
}
export interface ExifData {
    dateTimeOriginal?: string;
    createDate?: string;
    modifyDate?: string;
    gpsLatitude?: number;
    gpsLongitude?: number;
    gpsAltitude?: number;
    make?: string;
    model?: string;
    lensModel?: string;
    focalLength?: number;
    fNumber?: number;
    iso?: number;
    exposureTime?: string;
    orientation?: number;
    width?: number;
    height?: number;
}
export interface Comparison {
    id: string;
    photoA: string;
    photoB: string;
    winner: 'A' | 'B' | 'equal';
    timestamp: Date;
}
export interface TimelineEvent {
    id: string;
    photoId: string;
    date: Date;
    type: 'photo' | 'milestone';
    label: string;
    description?: string;
}
export interface AppState {
    photos: Photo[];
    comparisons: Comparison[];
    timeline: TimelineEvent[];
    currentComparison: Comparison | null;
    sortedPhotos: Photo[];
}
export type ViewMode = 'import' | 'compare' | 'timeline' | 'sorted';
//# sourceMappingURL=index.d.ts.map