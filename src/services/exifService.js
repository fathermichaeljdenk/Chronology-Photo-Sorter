// EXIF Data Extraction Service
import * as ExifReader from 'exifr';
import SparkMD5 from 'spark-md5';
export async function extractExifData(file) {
    try {
        const data = await ExifReader.parse(file, { pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate', 'GPSLatitude', 'GPSLongitude', 'GPSAltitude', 'Make', 'Model', 'LensModel', 'FocalLength', 'FNumber', 'ISO', 'ExposureTime', 'Orientation', 'ImageWidth', 'ImageHeight'] });
        return data;
    }
    catch (error) {
        console.warn('EXIF extraction failed:', error);
        return null;
    }
}
export async function generateFileHash(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const spark = new SparkMD5.ArrayBuffer();
            spark.append(e.target?.result);
            resolve(spark.end());
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
export function createPreviewUrl(file) {
    return URL.createObjectURL(file);
}
export function revokePreviewUrl(url) {
    URL.revokeObjectURL(url);
}
export function parseExifDate(exifData) {
    const dateFields = ['DateTimeOriginal', 'CreateDate', 'ModifyDate'];
    for (const field of dateFields) {
        if (exifData[field]) {
            try {
                // EXIF dates are typically in format "YYYY:MM:DD HH:mm:ss"
                const dateStr = exifData[field].replace(/:/g, '-', 2);
                const date = new Date(dateStr);
                if (!isNaN(date.getTime()))
                    return date;
            }
            catch {
                // Continue to next field
            }
        }
    }
    return null;
}
export function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
export function getFileSizeString(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
//# sourceMappingURL=exifService.js.map