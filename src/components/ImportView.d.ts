import React from 'react';
import { Photo } from '@/types';
interface ImportViewProps {
    onFilesSelected: (files: FileList) => void;
    photos: Photo[];
    onRemovePhoto: (id: string) => void;
    isProcessing: boolean;
}
declare const ImportView: React.FC<ImportViewProps>;
export default ImportView;
//# sourceMappingURL=ImportView.d.ts.map