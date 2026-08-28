// Sorted View Component
import { Photo } from '@/types';

interface SortedViewProps {
  sortedPhotos: Photo[];
  onReset: () => void;
}

const SortedView: React.FC<SortedViewProps> = ({ sortedPhotos, onReset }) => {
  if (sortedPhotos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Sorted Results</h3>
        <p className="text-gray-500">Complete comparisons to see sorted results</p>
      </div>
    );
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sorted Chronology</h2>
          <p className="text-gray-500">{sortedPhotos.length} photos ordered by capture time</p>
        </div>
        <button
          onClick={onReset}
          className="btn btn-secondary"
        >
          Start New Sort
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Photos</p>
          <p className="text-2xl font-bold text-gray-900">{sortedPhotos.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Date Range</p>
          <p className="text-lg font-semibold text-gray-900">
            {sortedPhotos[0]?.date.toLocaleDateString()} – {sortedPhotos[sortedPhotos.length - 1]?.date.toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Earliest</p>
          <p className="text-lg font-semibold text-gray-900">{sortedPhotos[0]?.file.name.substring(0, 20)}...</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Latest</p>
          <p className="text-lg font-semibold text-gray-900">{sortedPhotos[sortedPhotos.length - 1]?.file.name.substring(0, 20)}...</p>
        </div>
      </div>

      {/* Sorted Grid */}
      <div className="photo-grid" role="list" aria-label="Sorted photos in chronological order">
        {sortedPhotos.map((photo, index) => (
          <article key={photo.id} className="photo-card" role="listitem">
            {/* Position Badge */}
            <div className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
              {index + 1}
            </div>
            
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={photo.preview}
                alt={`Photo ${index + 1}: ${photo.file.name}`}
                className="photo-image w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-blue-600">#{index + 1}</span>
                <span className="text-xs text-gray-500">{formatFileSize(photo.file.size)}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 truncate" title={photo.file.name}>
                {photo.file.name}
              </p>
              <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                <span>{photo.date.toLocaleDateString()}</span>
                <span>{photo.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {photo.exifData && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {photo.exifData.focalLength && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {photo.exifData.focalLength}mm
                    </span>
                  )}
                  {photo.exifData.fNumber && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      f/{photo.exifData.fNumber}
                    </span>
                  )}
                  {photo.exifData.iso && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      ISO {photo.exifData.iso}
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Export Options */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Results</h3>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download JSON
          </button>
          <button className="btn btn-secondary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Export CSV
          </button>
          <button className="btn btn-secondary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Share Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortedView;