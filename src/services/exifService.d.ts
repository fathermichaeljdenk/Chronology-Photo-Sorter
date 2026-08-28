export declare function extractExifData(file: File): Promise<any>;
export declare function generateFileHash(file: File): Promise<string>;
export declare function createPreviewUrl(file: File): string;
export declare function revokePreviewUrl(url: string): void;
export declare function parseExifDate(exifData: any): Date | null;
export declare function formatDate(date: Date): string;
export declare function getFileSizeString(bytes: number): string;
//# sourceMappingURL=exifService.d.ts.map