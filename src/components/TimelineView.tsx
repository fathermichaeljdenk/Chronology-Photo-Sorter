// Timeline View Component
import { TimelineEvent, Photo } from '@/types';

interface TimelineViewProps {
  timeline: TimelineEvent[];
  photos: Photo[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ timeline, photos }) => {
  if (timeline.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Timeline Data</h3>
        <p className="text-gray-500">Import photos with EXIF data to see the timeline</p>
      </div>
    );
  }

  // Group timeline events by date
  const groupedEvents = timeline.reduce((acc, event) => {
    const dateKey = event.date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);

  const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photo Timeline</h2>
          <p className="text-gray-500">{timeline.length} photos across {sortedDates.length} days</p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>

        {sortedDates.map((dateKey, dateIndex) => {
          const events = groupedEvents[dateKey];
          const date = new Date(dateKey);
          
          return (
            <div key={dateKey} className="mb-8">
              {/* Date Header */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 text-right pr-4 pt-1">
                  <time className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric',
                      year: dateIndex === 0 || dateIndex === sortedDates.length - 1 ? 'numeric' : undefined
                    })}
                  </time>
                </div>
                
                {/* Events for this date */}
                <div className="flex-1 space-y-3">
                  {events.map((event) => {
                    const photo = photos.find(p => p.id === event.photoId);
                    
                    return (
                      <div 
                        key={event.id} 
                        className="relative timeline-item pl-4"
                      >
                        <div className="flex items-start gap-4">
                          {/* Timeline Marker */}
                          <div className="flex-shrink-0 relative z-10">
                            <div className="timeline-marker" aria-hidden="true"></div>
                          </div>
                          
                          {/* Photo Card */}
                          <article className="photo-card flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-32 h-32 md:h-auto aspect-[4/3] flex-shrink-0 overflow-hidden rounded-lg">
                                {photo && (
                                  <img
                                    src={photo.preview}
                                    alt={photo.file.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                )}
                                {!photo && (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              
                              <div className="p-4 flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <h4 className="font-medium text-gray-900 truncate">
                                      {photo?.file.name || event.label}
                                    </h4>
                                    <div className="mt-1 flex flex-wrap gap-1 text-xs text-gray-500">
                                      {photo?.exifData && (
                                        <>
                                          {photo.exifData.focalLength && (
                                            <span className="px-2 py-0.5 bg-gray-100 rounded">{photo.exifData.focalLength}mm</span>
                                          )}
                                          {photo.exifData.fNumber && (
                                            <span className="px-2 py-0.5 bg-gray-100 rounded">f/{photo.exifData.fNumber}</span>
                                          )}
                                          {photo.exifData.iso && (
                                            <span className="px-2 py-0.5 bg-gray-100 rounded">ISO {photo.exifData.iso}</span>
                                          )}
                                          {photo.exifData.exposureTime && (
                                            <span className="px-2 py-0.5 bg-gray-100 rounded">{photo.exifData.exposureTime}s</span>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <time className="flex-shrink-0 text-sm text-gray-500 whitespace-nowrap">
                                    {photo?.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </time>
                                </div>
                                
                                {event.description && (
                                  <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                                )}
                              </div>
                            </div>
                          </article>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineView;