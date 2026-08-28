import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Header = ({ viewMode, onModeChange, photoCount, comparisonCount, canCompare, canViewTimeline, canViewSorted }) => {
    const navItems = [
        { mode: 'import', label: 'Import', icon: '📥', disabled: false },
        { mode: 'compare', label: 'Compare', icon: '⚖️', disabled: !canCompare },
        { mode: 'timeline', label: 'Timeline', icon: '📅', disabled: !canViewTimeline },
        { mode: 'sorted', label: 'Sorted', icon: '✅', disabled: !canViewSorted }
    ];
    return (_jsx("header", { className: "bg-white shadow-sm sticky top-0 z-40", children: _jsx("div", { className: "max-w-6xl mx-auto px-4", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Photo Chronology" }), _jsx("nav", { className: "flex items-center gap-1", role: "navigation", "aria-label": "Main navigation", children: navItems.map(item => (_jsx("button", { onClick: () => !item.disabled && onModeChange(item.mode), disabled: item.disabled, className: `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === item.mode
                                ? 'bg-blue-100 text-blue-700'
                                : item.disabled
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`, "aria-current": viewMode === item.mode ? 'page' : undefined, children: _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { "aria-hidden": "true", children: item.icon }), item.label] }) }, item.mode))) }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [_jsxs("span", { children: [photoCount, " photos"] }), comparisonCount > 0 && _jsxs("span", { children: ["\u00B7 ", comparisonCount, " comparisons"] })] })] }) }) }));
};
export default Header;
//# sourceMappingURL=Header.js.map