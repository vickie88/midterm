function Header({ language, onLanguageChange }) {
    try {
        return (
            <header className="flex items-center justify-between p-4 bg-white" data-name="header">
                <div className="relative" data-name="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={getTranslation(language, 'search')}
                        data-name="search-input"
                    />
                    <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
                <div className="flex items-center" data-name="header-right">
                    <div className="mr-4 relative" data-name="notifications">
                        <i className="fas fa-bell"></i>
                        <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
                    </div>
                    <select 
                        className="mr-4 bg-transparent" 
                        value={language}
                        onChange={(e) => onLanguageChange(e.target.value)}
                        data-name="language-select"
                    >
                        <option value="en">English</option>
                        <option value="zh">简体中文</option>
                    </select>
                    <div className="w-8 h-8 bg-blue-600 rounded-full" data-name="user-avatar"></div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
