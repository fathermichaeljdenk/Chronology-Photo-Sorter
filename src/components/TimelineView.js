import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const TimelineView = ({ timeline, photos }) => {
    if (timeline.length === 0) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No Timeline Data" }), _jsx("p", { className: "text-gray-500", children: "Import photos with EXIF data to see the timeline" })] }));
    }
    // Group timeline events by date
    const groupedEvents = timeline.reduce((acc, event) => {
        const dateKey = event.date.toDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {});
    const sortedDates = Object.keys(groupedEvents).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    return (_jsxs("div", { className: "animate-fade-in", children: [_jsx("div", { className: "flex items-center justify-between mb-8", children: _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Photo Timeline" }), _jsxs("p", { className: "text-gray-500", children: [timeline.length, " photos across ", sortedDates.length, " days"] })] }) }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-10 top-0 bottom-0 w-0.5 bg-gray-200", "aria-hidden": "true" }), sortedDates.map((dateKey, dateIndex) => {
                        const events = groupedEvents[dateKey];
                        const date = new Date(dateKey);
                        return (_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex-shrink-0 w-20 text-right pr-4 pt-1", children: _jsx("time", { className: "text-sm font-medium text-gray-700 whitespace-nowrap", children: date.toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                                year: dateIndex === 0 || dateIndex === sortedDates.length - 1 ? 'numeric' : undefined
                                            }) }) }), _jsx("div", { className: "flex-1 space-y-3", children: events.map((event) => {
                                            const photo = photos.find(p => p.id === event.photoId);
                                            return (_jsx("div", { className: "relative timeline-item pl-4", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex-shrink-0 relative z-10", children: _jsx("div", { className: "timeline-marker", "aria-hidden": "true" }) }), _jsx("article", { className: "photo-card flex-1 min-w-0", children: _jsxs("div", { className: "flex flex-col md:flex-row", children: [_jsxs("div", { className: "relative w-full md:w-32 h-32 md:h-auto aspect-[4/3] flex-shrink-0 overflow-hidden rounded-lg", children: [photo && (_jsx("img", { src: photo.preview, alt: photo.file.name, className: "w-full h-full object-cover", loading: "lazy" })), !photo && (_jsx("div", { className: "w-full h-full bg-gray-100 flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }))] }), _jsxs("div", { className: "p-4 flex-1", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("h4", { className: "font-medium text-gray-900 truncate", children: photo?.file.name || event.label }), _jsx("div", { className: "mt-1 flex flex-wrap gap-1 text-xs text-gray-500", children: photo?.exifData && (_jsxs(_Fragment, { children: [photo.exifData.focalLength && (_jsxs("span", { className: "px-2 py-0.5 bg-gray-100 rounded", children: [photo.exifData.focalLength, "mm"] })), photo.exifData.fNumber && (_jsxs("span", { className: "px-2 py-0.5 bg-gray-100 rounded", children: ["f/", photo.exifData.fNumber] })), photo.exifData.iso && (_jsxs("span", { className: "px-2 py-0.5 bg-gray-100 rounded", children: ["ISO ", photo.exifData.iso] })), photo.exifData.exposureTime && (_jsxs("span", { className: "px-2 py-0.5 bg-gray-100 rounded", children: [photo.exifData.exposureTime, "s"] }))] })) })] }), _jsx("time", { className: "flex-shrink-0 text-sm text-gray-500 whitespace-nowrap", children: photo?.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] }), event.description && (_jsx("p", { className: "mt-2 text-sm text-gray-600", children: event.description }))] })] }) })] }) }, event.id));
                                        }) })] }) }, dateKey));
                    })] })] }));
};
export default TimelineView;
//# sourceMappingURL=TimelineView.js.map