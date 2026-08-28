// Main App Component - Photo Chronology Sorter
import { useState, useEffect, useCallback } from 'react';
import { Photo, Comparison, ViewMode, TimelineEvent } from '@/types';
import { extractExifData, generateFileHash, createPreviewUrl, parseExifDate, revokePreviewUrl } from '@/services/exifService';
import { createComparison, recordComparisonResult, getNextComparison, buildTimeline, performTopologicalSort } from '@/services/comparisonService';
import ImportView from '@/components/ImportView';
import CompareView from '@/components/CompareView';
import TimelineView from '@/components/TimelineView';
import SortedView from '@/components/SortedView';
import Header from '@/components/Header';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('import');
  const [currentComparison, setCurrentComparison] = useState<Comparison | null>(null);
  const [sortedPhotos, setSortedPhotos] = useState<Photo[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize first comparison when photos are loaded
  useEffect(() => {
    if (photos.length >= 2 && viewMode === 'compare' && !currentComparison) {
      const next = getNextComparison(photos, comparisons, sortedPhotos.map(p => p.id));
      if (next) {
        setCurrentComparison(createComparison(next.photoA.id, next.photoB.id));
      }
    }
  }, [photos, viewMode, comparisons, sortedPhotos]);

  // Build timeline when photos change
  useEffect(() => {
    if (photos.length > 0) {
      setTimeline(buildTimeline(photos));
    }
  }, [photos]);

  const handleFilesSelected = useCallback(async (files: FileList) => {
    setIsProcessing(true);
    const newPhotos: Photo[] = [];

    for (const file of Array.from(files)) {
      try {
        const [exifData, hash, preview] = await Promise.all([
          extractExifData(file),
          generateFileHash(file),
          createPreviewUrl(file)
        ]);

        const date = parseExifDate(exifData) || new Date(file.lastModified);

        newPhotos.push({
          id: crypto.randomUUID(),
          file,
          preview,
          exifData,
          hash,
          date
        });
      } catch (error) {
        console.error('Failed to process file:', file.name, error);
      }
    }

    setPhotos(prev => [...prev, ...newPhotos]);
    setIsProcessing(false);
  }, []);

  const handleComparisonResult = useCallback((winner: 'A' | 'B' | 'equal') => {
    if (!currentComparison) return;

    const updatedComparison = recordComparisonResult(currentComparison, winner);
    setComparisons(prev => [...prev, updatedComparison]);
    
    // Get next comparison
    const next = getNextComparison(photos, [...comparisons, updatedComparison], sortedPhotos.map(p => p.id));
    if (next) {
      setCurrentComparison(createComparison(next.photoA.id, next.photoB.id));
    } else {
      // No more comparisons - perform topological sort
      const sorted = performTopologicalSort(photos, [...comparisons, updatedComparison]);
      setSortedPhotos(sorted);
      setViewMode('sorted');
      setCurrentComparison(null);
    }
  }, [currentComparison, photos, comparisons, sortedPhotos]);

  const handleModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'compare' && !currentComparison && photos.length >= 2) {
      const next = getNextComparison(photos, comparisons, sortedPhotos.map(p => p.id));
      if (next) {
        setCurrentComparison(createComparison(next.photoA.id, next.photoB.id));
      }
    }
  }, [currentComparison, photos, comparisons, sortedPhotos]);

  const handleReset = useCallback(() => {
    // Revoke preview URLs
    photos.forEach(p => revokePreviewUrl(p.preview));
    setPhotos([]);
    setComparisons([]);
    setCurrentComparison(null);
    setSortedPhotos([]);
    setTimeline([]);
    setViewMode('import');
  }, [photos]);

  const handleRemovePhoto = useCallback((photoId: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === photoId);
      if (photo) revokePreviewUrl(photo.preview);
      return prev.filter(p => p.id !== photoId);
    });
    setComparisons(prev => prev.filter(c => c.photoA !== photoId && c.photoB !== photoId));
    setSortedPhotos(prev => prev.filter(p => p.id !== photoId));
  }, []);

  // Render current view
  const renderView = () => {
    switch (viewMode) {
      case 'import':
        return <ImportView onFilesSelected={handleFilesSelected} photos={photos} onRemovePhoto={handleRemovePhoto} isProcessing={isProcessing} />;
      case 'compare':
        return currentComparison ? (
          <CompareView
            comparison={currentComparison}
            photos={photos}
            onResult={handleComparisonResult}
            progress={comparisons.length}
            total={photos.length * (photos.length - 1) / 2}
          />
        ) : (
          <div className="text-center py-12">No comparisons available</div>
        );
      case 'timeline':
        return <TimelineView timeline={timeline} photos={photos} />;
      case 'sorted':
        return <SortedView sortedPhotos={sortedPhotos} onReset={handleReset} />;
      default:
        return <ImportView onFilesSelected={handleFilesSelected} photos={photos} onRemovePhoto={handleRemovePhoto} isProcessing={isProcessing} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        viewMode={viewMode}
        onModeChange={handleModeChange}
        photoCount={photos.length}
        comparisonCount={comparisons.length}
        canCompare={photos.length >= 2}
        canViewTimeline={photos.length > 0}
        canViewSorted={sortedPhotos.length > 0}
      />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderView()}
      </main>
    </div>
  );
}

export default App;