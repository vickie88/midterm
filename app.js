function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState('market');
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
        const [language, setLanguage] = React.useState('en');
        const [theme, setTheme] = React.useState('light');
        const [fontSize, setFontSize] = React.useState('small');

        const handleLanguageChange = (newLang) => {
            setLanguage(newLang);
        };

        const handleThemeChange = (newTheme) => {
            setTheme(newTheme);
            document.documentElement.className = newTheme === 'dark' ? 'dark-theme' : '';
        };

        const handleFontSizeChange = (newSize) => {
            setFontSize(newSize);
            document.body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
            document.body.classList.add(`font-size-${newSize}`);
        };

        return (
            <div className={`app ${theme === 'dark' ? 'dark-theme' : ''}`} data-name="app">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    language={language}
                />
                <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} data-name="main-content">
                    <Header
                        language={language}
                        onLanguageChange={handleLanguageChange}
                    />
                    {currentPage === 'market' && <RealTimeMarketPage language={language} />}
                    {currentPage === 'history' && <HistoricalMarketPage language={language} />}
                    {currentPage === 'wallet' && <WalletPage language={language} />}
                    {currentPage === 'settings' && (
                        <SettingsPage
                            language={language}
                            onThemeChange={handleThemeChange}
                            onFontSizeChange={handleFontSizeChange}
                            onLanguageChange={handleLanguageChange}
                        />
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);