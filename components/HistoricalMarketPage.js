// 移除文件顶部的所有 import 语句，包括 React, DatePicker, CryptoTable, CandlestickChart, getTranslation
// 这些模块和函数假设在项目的全局环境中可用，或者通过其他方式在全局范围内引入

function HistoricalMarketPage({ language }) {
    try {
        const [startDate, setStartDate] = React.useState('2025-01-01');
        const [endDate, setEndDate] = React.useState('2025-01-01');
        const [timeInterval, setTimeInterval] = React.useState('1min');
        const [searchValue, setSearchValue] = React.useState('');
        // 新增状态：记录选中的币种，初始为 null (不显示图表)
        const [selectedCrypto, setSelectedCrypto] = React.useState(null);

        const handleSearch = () => {
            // 这里写你的搜索历史数据逻辑
            alert('搜索历史内容: ' + searchValue);
        };

        // 新增函数：处理表格行点击，更新 selectedCrypto 状态
        const handleRowClick = (crypto) => {
            setSelectedCrypto(crypto);
            // 可以平滑滚动到图表区域，如果需要
            // document.querySelector('[data-name="bitcoin-chart"]').scrollIntoView({ behavior: 'smooth' });
        };

        return (
            <div className="market-container" data-name="historical-market-page" data-file="components/HistoricalMarketPage.js">
                {/* 搜索和过滤区域 */}
                <div className="search-hero" data-name="search-hero">
                    <h1>{getTranslation(language, 'historicalMarket_searchTitle')}</h1>
                    <p>{getTranslation(language, 'historicalMarket_searchDesc')}</p>
                    <div className="relative w-full" style={{ maxWidth: 420 }}>
                        <input
                            type="text"
                            className="hero-search-input pr-12"
                            placeholder={getTranslation(language, 'historicalMarket_searchPlaceholder')}
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
                                transform: 'translateY(-50%)', // 修正这里
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

                <div className="filter-controls" data-name="filter-controls">
                    {/* DatePicker 组件的国际化需要根据具体实现方式调整 */}
                    {/* 假设 DatePicker 组件内部已经处理了国际化，或者通过 prop 传递 */}
                    <DatePicker label={getTranslation(language, 'historicalMarket_startTime')} value={startDate} onChange={setStartDate} /> {/* 确保 value={startDate} */}
                    <DatePicker label={getTranslation(language, 'historicalMarket_endTime')} value={endDate} onChange={setEndDate} />   {/* 确保 value={endDate} */}
                    <select
                        className="filter-select"
                        value={timeInterval}
                        onChange={(e) => setTimeInterval(e.target.value)}
                    >
                        <option value="5s">{getTranslation(language, 'historicalMarket_5s')}</option>
                        <option value="10s">{getTranslation(language, 'historicalMarket_10s')}</option>
                        <option value="30s">{getTranslation(language, 'historicalMarket_30s')}</option>
                        <option value="45s">{getTranslation(language, 'historicalMarket_45s')}</option>
                        <option value="1min">{getTranslation(language, 'historicalMarket_1min')}</option>
                        <option value="4h">{getTranslation(language, 'historicalMarket_4h')}</option>
                        <option value="1d">{getTranslation(language, 'historicalMarket_1d')}</option>
                    </select>
                </div>

                {/* 表格区域 */}
                <div className="price-table" data-name="historical-price-table">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{getTranslation(language, 'historicalMarket_priceTableTitle')}</h2>
                        <select className="filter-select">
                            <option>{getTranslation(language, 'historicalMarket_marketCap')}</option>
                            <option>{getTranslation(language, 'historicalMarket_highestPrice')}</option>
                            <option>{getTranslation(language, 'historicalMarket_lowestPrice')}</option>
                            <option>{getTranslation(language, 'historicalMarket_changes')}</option>
                            <option>{getTranslation(language, 'historicalMarket_openPrice')}</option>
                            <option>{getTranslation(language, 'historicalMarket_closePrice')}</option>
                            <option>{getTranslation(language, 'historicalMarket_volumeCol')}</option>
                        </select>
                    </div>
                    {/* 传递 handleRowClick 函数给 CryptoTable */}
                    <CryptoTable isHistorical={true} data={cryptoData.tableData} language={language} onRowClick={handleRowClick} />
                    <button className="btn-primary mt-4 mx-auto block">{getTranslation(language, 'historicalMarket_loadMore')}</button>
                </div>

                {/* 当 selectedCrypto 有值时才渲染图表和详细信息区域 */}
                {selectedCrypto && (
                    <div className="chart-container" data-name="bitcoin-chart">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                {/* 显示选中币种的图标和名称 */}
                                <i className={`${selectedCrypto.icon || ''} ${selectedCrypto.color || ''} text-2xl mr-3`}></i>
                                <div>
                                    <h3 className="text-lg font-bold">{selectedCrypto.name}</h3>
                                    <p className="text-gray-500">{selectedCrypto.symbol}</p>
                                </div>
                            </div>
                            {/* 这里显示选中币种的当前变化，如果数据中有的话 */}
                            {selectedCrypto.change && (
                                <div className={`font-medium ${selectedCrypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {selectedCrypto.change > 0 ? '▲' : '▼'} {Math.abs(selectedCrypto.change)}%
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <h4 className="font-bold mb-2">{getTranslation(language, 'historicalMarket_timePeriod')}</h4>
                                <p className="text-gray-600">{startDate} - {endDate}</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">{getTranslation(language, 'historicalMarket_timeInterval')}</h4>
                                <p className="text-gray-600">{getTranslation(language, `historicalMarket_${timeInterval}`)}</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">{getTranslation(language, 'historicalMarket_avgMarketCap')}</h4>
                                {/* 这里显示选中币种的市值，如果数据中有的话 */}
                                <p className="text-gray-600">{selectedCrypto.marketCap || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">{getTranslation(language, 'historicalMarket_volume')}</h4>
                                {/* 这里显示选中币种的成交量，如果数据中有的话 */}
                                <p className="text-gray-600">{selectedCrypto.volume || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-medium mb-2">{getTranslation(language, 'historicalMarket_chartTitle', { token: selectedCrypto.name })}</h4>{/* 图表标题显示币种名称 */}
                            {/* 将 selectedCrypto 数据传递给 CandlestickChart 组件 */}
                            {/* 注意：CandlestickChart 组件需要根据传递的数据来渲染对应的图表 */}
                            <CandlestickChart cryptoData={selectedCrypto} timeInterval={timeInterval} startDate={startDate} endDate={endDate} />
                        </div>
                    </div>
                )}


            </div>
        );
    } catch (error) {
        console.error('HistoricalMarketPage component error:', error);
        reportError(error);
        return null;
    }
}