function Sidebar({ collapsed, currentPage, setCurrentPage, language }) {
    try {
        const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

        const menuItems = [
            { icon: 'fa-chart-line', text: 'realTimeMarket', path: 'market' },
            { icon: 'fa-clock-rotate-left', text: 'historicalMarket', path: 'history' },
            { icon: 'fa-chart-simple', text: 'tradeBacktest', path: 'backtest' },
            { icon: 'fa-wallet', text: 'wallets', path: 'wallet' },
            { icon: 'fa-list', text: 'activities', path: 'activities' },
            { icon: 'fa-gear', text: 'settings', path: 'settings' }
        ];

        const toggleSidebar = () => {
            setIsCollapsed(!isCollapsed);
        };

        const handleMenuClick = (path) => {
            setCurrentPage(path);
        };

        return (
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} data-name="sidebar">
                <div className="sidebar-header" data-name="sidebar-header">
                    <div className="sidebar-logo" data-name="sidebar-logo">LOGO</div>
                    <button 
                        className="sidebar-toggle-btn" 
                        onClick={toggleSidebar}
                        data-name="sidebar-toggle"
                    >
                        <i className={`fas ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
                    </button>
                </div>
                <nav>
                    <ul className="sidebar-menu" data-name="sidebar-menu">
                        {menuItems.map((item, index) => (
                            <li 
                                key={index} 
                                onClick={() => handleMenuClick(item.path)}
                                className={`sidebar-item ${currentPage === item.path ? 'active' : ''}`}
                                data-name={`sidebar-item-${index}`}
                            >
                                <i className={`fas ${item.icon}`}></i>
                                <span>{getTranslation(language, item.text)}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
        return null;
    }
}
