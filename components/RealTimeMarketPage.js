function RealTimeMarketPage({ language }) {
    try {
        const [selectedCoin, setSelectedCoin] = React.useState('BTC');
        const [searchValue, setSearchValue] = React.useState('');
        // 直接用全局 cryptoData
        const data = window.cryptoData || cryptoData;

        const handleSearch = () => {
            // 这里写你的搜索逻辑
            alert('搜索内容: ' + searchValue);
        };

        return (
            <div className="market-container" data-name="realtime-market-page" data-file="components/RealTimeMarketPage.js">
                <div className="search-hero" data-name="search-hero">
                    <h1>{getTranslation(language, 'realTimeMarket_searchTitle')}</h1>
                    <p>{getTranslation(language, 'realTimeMarket_searchDesc')}</p>
                    <div className="relative w-full" style={{ maxWidth: 420 }}>
                        <input
                            type="text"
                            className="hero-search-input pr-12"
                            placeholder={getTranslation(language, 'realTimeMarket_searchPlaceholder')}
                            data-name="hero-search-input"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                        />
                        <button
                            className="search-icon-btn"
                            type="button"
                            onClick={handleSearch}
                            tabIndex={-1}
                            style={{
                                position: 'absolute',
                                right: 16,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                height: 32,
                                width: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <i className="fas fa-search text-gray-400 text-lg"></i>
                        </button>
                    </div>
                </div>

                <div className="crypto-grid" data-name="crypto-grid">
                    <div className="crypto-card" data-name="popular-crypto">
                        <h3>{getTranslation(language, 'realTimeMarket_popular')}</h3>
                        <div className="crypto-list">
                            {data.popular.map((crypto, index) => (
                                <CryptoCard key={index} {...crypto} />
                            ))}
                        </div>
                        <button className="btn-primary mt-4 w-full">
                            {getTranslation(language, 'realTimeMarket_more')}
                        </button>
                    </div>

                    <div className="crypto-card" data-name="top-gainers">
                        <h3>{getTranslation(language, 'realTimeMarket_gainers')}</h3>
                        <div className="crypto-list">
                            {data.gainers.map((crypto, index) => (
                                <CryptoCard key={index} {...crypto} />
                            ))}
                        </div>
                        <button className="btn-primary mt-4 w-full">
                            {getTranslation(language, 'realTimeMarket_more')}
                        </button>
                    </div>

                    <div className="crypto-card" data-name="highest-volume">
                        <h3>{getTranslation(language, 'realTimeMarket_volume')}</h3>
                        <div className="crypto-list">
                            {data.volume.map((crypto, index) => (
                                <CryptoCard key={index} {...crypto} />
                            ))}
                        </div>
                        <button className="btn-primary mt-4 w-full">
                            {getTranslation(language, 'realTimeMarket_more')}
                        </button>
                    </div>
                </div>

                <div className="price-table" data-name="price-table">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            {getTranslation(language, 'realTimeMarket_todayPrice')}
                        </h2>
                        <select className="filter-select">
                            <option>{getTranslation(language, 'realTimeMarket_marketCap')}</option>
                            <option>{getTranslation(language, 'realTimeMarket_price')}</option>
                            <option>{getTranslation(language, 'realTimeMarket_24hChange')}</option>
                            <option>{getTranslation(language, 'realTimeMarket_volumeCol')}</option>
                            <option>{getTranslation(language, 'realTimeMarket_symbol')}</option>
                        </select>
                    </div>
                    <CryptoTable data={data.tableData} language={language} />
                    <button className="btn-primary mt-4 mx-auto block">
                        {getTranslation(language, 'realTimeMarket_loadMore')}
                    </button>
                </div>

                <div className="chart-container" data-name="investment-advice">
                    {/* 第一行：标题和下拉菜单两端对齐 */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 style={{ marginBottom: 0 }}>{getTranslation(language, 'realTimeMarket_investAdvice')}</h3>
                        <select
                            className="filter-select"
                            value={selectedCoin}
                            onChange={e => setSelectedCoin(e.target.value)}
                            style={{ minWidth: 180 }}
                        >
                            <option value="BTC">{getTranslation(language, 'realTimeMarket_btc')}</option>
                            <option value="ETH">{getTranslation(language, 'realTimeMarket_eth')}</option>
                            <option value="BNB">{getTranslation(language, 'realTimeMarket_bnb')}</option>
                            <option value="ADA">{getTranslation(language, 'realTimeMarket_ada')}</option>
                        </select>
                    </div>
                    {/* 第二行：AI按钮单独一行，左对齐 */}
                    <div style={{ marginBottom: 32 }}>
                        <button className="btn-primary" style={{ minWidth: 180 }}>
                            {getTranslation(language, 'realTimeMarket_aiPrediction')}
                        </button>
                    </div>
                    {/* 第三行：灰色框更高 */}
                    <div className="chart-placeholder" style={{ minHeight: 240 }}>
                        <p>
                            {getTranslation(language, 'realTimeMarket_aiAdvice')} {selectedCoin}
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RealTimeMarketPage component error:', error);
        reportError(error);
        return null;
    }
}