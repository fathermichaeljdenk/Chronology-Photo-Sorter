// Header Component
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

const Header: React.FC<HeaderProps> = ({
  viewMode,
  onModeChange,
  photoCount,
  comparisonCount,
  canCompare,
  canViewTimeline,
  canViewSorted
}) => {
  const navItems = [
    { mode: 'import' as ViewMode, label: 'Import', icon: '📥', disabled: false },
    { mode: 'compare' as ViewMode, label: 'Compare', icon: '⚖️', disabled: !canCompare },
    { mode: 'timeline' as ViewMode, label: 'Timeline', icon: '📅', disabled: !canViewTimeline },
    { mode: 'sorted' as ViewMode, label: 'Sorted', icon: '✅', disabled: !canViewSorted }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900">Photo Chronology</h1>
          
          <nav className="flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map(item => (
              <button
                key={item.mode}
                onClick={() => !item.disabled && onModeChange(item.mode)}
                disabled={item.disabled}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === item.mode
                    ? 'bg-blue-100 text-blue-700'
                    : item.disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-current={viewMode === item.mode ? 'page' : undefined}
              >
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{photoCount} photos</span>
            {comparisonCount > 0 && <span>· {comparisonCount} comparisons</span>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;