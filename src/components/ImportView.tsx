// Import View Component
import React, { useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import { Photo } from '@/types';

interface ImportViewProps {
  onFilesSelected: (files: FileList) => void;
  photos: Photo[];
  onRemovePhoto: (id: string) => void;
  isProcessing: boolean;
}

const ImportView: React.FC<ImportViewProps> = ({
  onFilesSelected,
  photos,
  onRemovePhoto,
  isProcessing
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  }, [onFilesSelected]);

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      e.target.value = '';
    }
  }, [onFilesSelected]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Drop Zone */}
      <div
        className={`drop-zone rounded-2xl p-12 text-center ${isDragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        aria-label="Drop zone for photo files"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="sr-only"
          aria-label="Select photo files"
          disabled={isProcessing}
        />
        
        <div className="mx-auto max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Add Photos to Sort</h2>
          <p className="text-gray-600 mb-4">
            Drag & drop images here, or click to browse
          </p>
          <p className="text-sm text-gray-400">
            Supports: JPG, PNG, HEIC, RAW • EXIF data will be extracted automatically
          </p>
          {isProcessing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
              <div className="spinner w-5 h-5" aria-hidden="true"></div>
              <span>Processing photos...</span>
            </div>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="mt-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Imported Photos ({photos.length})
            </h3>
            <button
              onClick={() => photos.forEach(p => onRemovePhoto(p.id))}
              className="btn btn-secondary btn-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              disabled={isProcessing}
            >
              Clear All
            </button>
          </div>
          
          <div className="photo-grid" role="list" aria-label="Imported photos">
            {photos.map(photo => (
              <article key={photo.id} className="photo-card" role="listitem">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.preview}
                    alt={`Photo ${photo.file.name}`}
                    className="photo-image w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate" title={photo.file.name}>
                    {photo.file.name}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>{formatFileSize(photo.file.size)}</span>
                    <span>{formatDate(photo.date)}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePhoto(photo.id);
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                  aria-label={`Remove ${photo.file.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      {photos.length >= 2 && !isProcessing && (
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-gray-600 mb-4">Ready to start sorting! You have {photos.length} photos.</p>
          <button
            onClick={() => {}}
            className="btn btn-primary btn-lg"
          >
            Start Comparing →
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportView;