import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import View Component
import React, { useRef, useCallback } from 'react';
const ImportView = ({ onFilesSelected, photos, onRemovePhoto, isProcessing }) => {
    const fileInputRef = useRef(null);
    const [isDragActive, setIsDragActive] = React.useState(false);
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesSelected(e.dataTransfer.files);
        }
    }, [onFilesSelected]);
    const handleFileSelect = useCallback((e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelected(e.target.files);
            e.target.value = '';
        }
    }, [onFilesSelected]);
    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);
    const formatFileSize = (bytes) => {
        if (bytes < 1024)
            return `${bytes} B`;
        if (bytes < 1024 * 1024)
            return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (_jsxs("div", { className: "animate-fade-in", children: [_jsxs("div", { className: `drop-zone rounded-2xl p-12 text-center ${isDragActive ? 'active' : ''}`, onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: handleClick, role: "button", tabIndex: 0, onKeyDown: (e) => e.key === 'Enter' && handleClick(), "aria-label": "Drop zone for photo files", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, onChange: handleFileSelect, className: "sr-only", "aria-label": "Select photo files", disabled: isProcessing }), _jsxs("div", { className: "mx-auto max-w-md", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }) }) }), _jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-2", children: "Add Photos to Sort" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Drag & drop images here, or click to browse" }), _jsx("p", { className: "text-sm text-gray-400", children: "Supports: JPG, PNG, HEIC, RAW \u2022 EXIF data will be extracted automatically" }), isProcessing && (_jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-blue-600", children: [_jsx("div", { className: "spinner w-5 h-5", "aria-hidden": "true" }), _jsx("span", { children: "Processing photos..." })] }))] })] }), photos.length > 0 && (_jsxs("div", { className: "mt-8 animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-gray-900", children: ["Imported Photos (", photos.length, ")"] }), _jsx("button", { onClick: () => photos.forEach(p => onRemovePhoto(p.id)), className: "btn btn-secondary btn-sm text-red-600 hover:bg-red-50 hover:text-red-700", disabled: isProcessing, children: "Clear All" })] }), _jsx("div", { className: "photo-grid", role: "list", "aria-label": "Imported photos", children: photos.map(photo => (_jsxs("article", { className: "photo-card", role: "listitem", children: [_jsx("div", { className: "relative aspect-[4/3] overflow-hidden", children: _jsx("img", { src: photo.preview, alt: `Photo ${photo.file.name}`, className: "photo-image w-full h-full object-cover", loading: "lazy" }) }), _jsxs("div", { className: "p-3", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 truncate", title: photo.file.name, children: photo.file.name }), _jsxs("div", { className: "flex items-center justify-between mt-1 text-xs text-gray-500", children: [_jsx("span", { children: formatFileSize(photo.file.size) }), _jsx("span", { children: formatDate(photo.date) })] })] }), _jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        onRemovePhoto(photo.id);
                                    }, className: "absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors", "aria-label": `Remove ${photo.file.name}`, children: _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }, photo.id))) })] })), photos.length >= 2 && !isProcessing && (_jsxs("div", { className: "mt-8 text-center animate-fade-in", children: [_jsxs("p", { className: "text-gray-600 mb-4", children: ["Ready to start sorting! You have ", photos.length, " photos."] }), _jsx("button", { onClick: () => { }, className: "btn btn-primary btn-lg", children: "Start Comparing \u2192" })] }))] }));
};
export default ImportView;
//# sourceMappingURL=ImportView.js.map