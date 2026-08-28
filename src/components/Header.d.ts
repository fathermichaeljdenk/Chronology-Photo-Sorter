import { ViewMode } from '@/types';
interface HeaderProps {
    viewMode: ViewMode;
    onModeChange: (mode: ViewMode) => void;
    photoCount: number;
    comparisonCount: number;
    canCompare: boolean;
    canViewTimeline: boolean;
    canViewSorted: boolean;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
//# sourceMappingURL=Header.d.ts.map