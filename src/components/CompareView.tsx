// Compare View Component
import { Photo, Comparison } from '@/types';

interface CompareViewProps {
  comparison: Comparison;
  photos: Photo[];
  onResult: (winner: 'A' | 'B' | 'equal') => void;
  progress: number;
  total: number;
}

const CompareView: React.FC<CompareViewProps> = ({
  comparison,
  photos,
  onResult,
  progress,
  total
}) => {
  const photoA = photos.find(p => p.id === comparison.photoA);
  const photoB = photos.find(p => p.id === comparison.photoB);

  if (!photoA || !photoB) {
    return <div className="text-center py-12 text-gray-500">Loading comparison...</div>;
  }

  const progressPercent = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Comparison {progress + 1} of ~{total}</span>
          <span className="text-gray-600">{progressPercent}% complete</span>
        </div>
        <div className="progress-bar" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Sorting progress">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Which photo was taken earlier?
        </h2>
        <p className="text-gray-500">Click on a photo to select, or use keyboard shortcuts</p>
      </div>

      {/* Photo Comparison */}
      <div className="comparison-container">
        {/* Photo A */}
        <article className="photo-card" role="button" tabIndex={0} aria-label={`Photo A: ${photoA.file.name}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={photoA.preview}
              alt={`Photo A: ${photoA.file.name}`}
              className="photo-image-lg w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
              <span className="text-white font-medium text-lg">A</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 truncate" title={photoA.file.name}>
              {photoA.file.name}
            </h3>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{photoA.exifData?.make || 'Unknown'} {photoA.exifData?.model || ''}</span>
              <span>{photoA.date.toLocaleDateString()}</span>
            </div>
            {photoA.exifData && (
              <div className="mt-2 flex flex-wrap gap-1">
                {photoA.exifData.focalLength && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {photoA.exifData.focalLength}mm
                  </span>
                )}
                {photoA.exifData.fNumber && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    f/{photoA.exifData.fNumber}
                  </span>
                )}
                {photoA.exifData.iso && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    ISO {photoA.exifData.iso}
                  </span>
                )}
              </div>
            )}
          </div>
        </article>

        {/* VS Divider */}
        <div className="flex flex-col items-center justify-center px-4">
          <span className="text-3xl font-bold text-gray-300">vs</span>
          <div className="w-1 h-16 bg-gray-200 rounded-full mt-2" aria-hidden="true"></div>
        </div>

        {/* Photo B */}
        <article className="photo-card" role="button" tabIndex={0} aria-label={`Photo B: ${photoB.file.name}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={photoB.preview}
              alt={`Photo B: ${photoB.file.name}`}
              className="photo-image-lg w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
              <span className="text-white font-medium text-lg">B</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 truncate" title={photoB.file.name}>
              {photoB.file.name}
            </h3>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{photoB.exifData?.make || 'Unknown'} {photoB.exifData?.model || ''}</span>
              <span>{photoB.date.toLocaleDateString()}</span>
            </div>
            {photoB.exifData && (
              <div className="mt-2 flex flex-wrap gap-1">
                {photoB.exifData.focalLength && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {photoB.exifData.focalLength}mm
                  </span>
                )}
                {photoB.exifData.fNumber && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    f/{photoB.exifData.fNumber}
                  </span>
                )}
                {photoB.exifData.iso && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    ISO {photoB.exifData.iso}
                  </span>
                )}
              </div>
            )}
          </div>
        </article>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => onResult('A')}
          className="btn btn-primary btn-lg w-48"
          aria-label="Photo A was taken earlier"
        >
          A is Earlier
        </button>
        <button
          onClick={() => onResult('equal')}
          className="btn btn-secondary btn-lg w-48"
          aria-label="Photos were taken at the same time"
        >
          Same Time
        </button>
        <button
          onClick={() => onResult('B')}
          className="btn btn-primary btn-lg w-48"
          aria-label="Photo B was taken earlier"
        >
          B is Earlier
        </button>
      </div>

      {/* Keyboard Hint */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <kbd className="px-2 py-1 bg-gray-100 rounded">A</kbd> or <kbd className="px-2 py-1 bg-gray-100 rounded">←</kbd> = A earlier &nbsp;|&nbsp;
        <kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd> = Same time &nbsp;|&nbsp;
        <kbd className="px-2 py-1 bg-gray-100 rounded">B</kbd> or <kbd className="px-2 py-1 bg-gray-100 rounded">→</kbd> = B earlier
      </div>
    </div>
  );
};

export default CompareView;