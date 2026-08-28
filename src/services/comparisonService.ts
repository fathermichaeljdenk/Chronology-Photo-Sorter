// Comparison Logic Service
import { Photo, Comparison, TimelineEvent } from '@/types';

export function createComparison(photoAId: string, photoBId: string): Comparison {
  return {
    id: crypto.randomUUID(),
    photoA: photoAId,
    photoB: photoBId,
    winner: 'equal',
    timestamp: new Date()
  };
}

export function recordComparisonResult(
  comparison: Comparison,
  winner: 'A' | 'B' | 'equal'
): Comparison {
  return {
    ...comparison,
    winner,
    timestamp: new Date()
  };
}

export function getNextComparison(
  photos: Photo[],
  _comparisons: Comparison[],
  sortedIds: string[] = []
): { photoA: Photo; photoB: Photo } | null {
  // Get unsorted photos that haven't been fully compared
  const remainingPhotos = photos.filter(p => !sortedIds.includes(p.id));
  
  if (remainingPhotos.length < 2) return null;
  
  // Simple strategy: compare first two remaining photos
  // In a full implementation, this would use a sorting algorithm like merge sort
  // with pairwise comparisons
  return {
    photoA: remainingPhotos[0],
    photoB: remainingPhotos[1]
  };
}

export function buildTimeline(photos: Photo[]): TimelineEvent[] {
  return photos
    .filter(p => p.date)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((photo) => ({
      id: crypto.randomUUID(),
      photoId: photo.id,
      date: photo.date,
      type: 'photo' as const,
      label: `${photo.exifData?.make || 'Unknown'} ${photo.exifData?.model || ''}`,
      description: `${photo.exifData?.focalLength ? `${photo.exifData.focalLength}mm` : ''} ${photo.exifData?.fNumber ? `f/${photo.exifData.fNumber}` : ''} ${photo.exifData?.iso ? `ISO ${photo.exifData.iso}` : ''}`.trim()
    }));
}

export function performTopologicalSort(
  photos: Photo[],
  comparisons: Comparison[]
): Photo[] {
  // Build adjacency list from comparisons
  const graph: Map<string, Set<string>> = new Map();
  const inDegree: Map<string, number> = new Map();
  
  // Initialize
  photos.forEach(p => {
    graph.set(p.id, new Set());
    inDegree.set(p.id, 0);
  });
  
  // Add edges from comparisons
  comparisons.forEach(c => {
    if (c.winner === 'A') {
      // A comes before B
      if (!graph.get(c.photoA)!.has(c.photoB)) {
        graph.get(c.photoA)!.add(c.photoB);
        inDegree.set(c.photoB, (inDegree.get(c.photoB) || 0) + 1);
      }
    } else if (c.winner === 'B') {
      // B comes before A
      if (!graph.get(c.photoB)!.has(c.photoA)) {
        graph.get(c.photoB)!.add(c.photoA);
        inDegree.set(c.photoA, (inDegree.get(c.photoA) || 0) + 1);
      }
    }
    // 'equal' adds no ordering constraint
  });
  
  // Kahn's algorithm for topological sort
  const queue: string[] = [];
  inDegree.forEach((degree, id) => {
    if (degree === 0) queue.push(id);
  });
  
  const sorted: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    sorted.push(current);
    
    graph.get(current)?.forEach(neighbor => {
      const newDegree = (inDegree.get(neighbor) || 0) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    });
  }
  
  // Handle cycles - add remaining photos
  const remaining = photos.filter(p => !sorted.includes(p.id));
  sorted.push(...remaining.map(p => p.id));
  
  return sorted.map(id => photos.find(p => p.id === id)!).filter(Boolean);
}