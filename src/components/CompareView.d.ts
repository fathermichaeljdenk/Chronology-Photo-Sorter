import { Photo, Comparison } from '@/types';
interface CompareViewProps {
    comparison: Comparison;
    photos: Photo[];
    onResult: (winner: 'A' | 'B' | 'equal') => void;
    progress: number;
    total: number;
}
declare const CompareView: React.FC<CompareViewProps>;
export default CompareView;
//# sourceMappingURL=CompareView.d.ts.map