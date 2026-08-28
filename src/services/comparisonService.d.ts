import { Photo, Comparison, TimelineEvent } from '@/types';
export declare function createComparison(photoAId: string, photoBId: string): Comparison;
export declare function recordComparisonResult(comparison: Comparison, winner: 'A' | 'B' | 'equal'): Comparison;
export declare function getNextComparison(photos: Photo[], _comparisons: Comparison[], sortedIds?: string[]): {
    photoA: Photo;
    photoB: Photo;
} | null;
export declare function buildTimeline(photos: Photo[]): TimelineEvent[];
export declare function performTopologicalSort(photos: Photo[], comparisons: Comparison[]): Photo[];
//# sourceMappingURL=comparisonService.d.ts.map