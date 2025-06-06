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

        // 生成根据时间段和间隔的真实K线数据
        const generateRealisticCandlestickData = (crypto, startDate, endDate, timeInterval) => {
            const basePrice = parseFloat(crypto.price?.replace(/[$,]/g, '')) || 2640;
            
            // 根据时间间隔计算数据点数量
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffMs = end.getTime() - start.getTime();
            
            let intervalMs, dataPoints;
            switch(timeInterval) {
                case '1min':
                    intervalMs = 60 * 1000; // 1分钟
                    dataPoints = Math.min(Math.floor(diffMs / intervalMs), 100); // 最多100个点
                    break;
                
                case '1d':
                    intervalMs = 24 * 60 * 60 * 1000; // 1天
                    dataPoints = Math.min(Math.floor(diffMs / intervalMs), 30);
                    break;
                default:
                    intervalMs = 60 * 1000;
                    dataPoints = 50;
            }
            
            // 如果是同一天，使用小时间隔
            if (startDate === endDate) {
                dataPoints = 24; // 24小时
                intervalMs = 60 * 60 * 1000; // 1小时间隔
            }
            
            const data = [];
            
            for (let i = 0; i < dataPoints; i++) {
                const timestamp = new Date(start.getTime() + i * intervalMs);
                
                // 模拟真实的价格波动
                const randomFactor = (Math.random() - 0.5) * 0.02; // ±2%波动
                const open = i === 0 ? basePrice : data[i-1]?.close || basePrice;
                const volatility = basePrice * 0.001; // 0.1%波动范围
                
                const close = open + (open * randomFactor);
                const high = Math.max(open, close) + Math.random() * volatility;
                const low = Math.min(open, close) - Math.random() * volatility;
                
                data.push({
                    time: timestamp,
                    open: parseFloat(open.toFixed(2)),
                    high: parseFloat(high.toFixed(2)),
                    low: parseFloat(low.toFixed(2)),
                    close: parseFloat(close.toFixed(2)),
                    volume: Math.random() * 1000000 + 500000
                });
            }
            
            return data;
        };

        // 生成时间轴标签
        const generateTimeLabels = (candleData, timeInterval) => {
            const labels = [];
            const totalPoints = candleData.length;
            const maxLabels = 8; // 最多显示8个时间标签
            const step = Math.max(1, Math.floor(totalPoints / maxLabels));
            
            for (let i = 0; i < totalPoints; i += step) {
                const candle = candleData[i];
                let timeFormat;
                
                switch(timeInterval) {
                    case '1min':
                        timeFormat = {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        };
                        break;
                    case '1d':
                        timeFormat = {
                            month: 'short',
                            day: 'numeric'
                        };
                        break;
                    default:
                        timeFormat = {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        };
                }
                
                labels.push({
                    index: i,
                    position: (i / (totalPoints - 1)) * 100,
                    label: candle.time.toLocaleString('en-US', timeFormat)
                });
            }
            
            return labels;
        };

        // 新的K线图组件 - 简洁样式
        const CleanCandlestickChart = ({ cryptoData, timeInterval, startDate, endDate }) => {
            const candleData = generateRealisticCandlestickData(cryptoData, startDate, endDate, timeInterval);
            const chartHeight = 400;
            const chartWidth = 900;
            const padding = { top: 30, right: 70, bottom: 50, left: 70 };
            
            const prices = candleData.flatMap(d => [d.high, d.low]);
            const minPrice = Math.min(...prices) * 0.998;
            const maxPrice = Math.max(...prices) * 1.002;
            const priceRange = maxPrice - minPrice;
            
            // 价格刻度
            const priceScale = (price) => {
                return padding.top + ((maxPrice - price) / priceRange) * (chartHeight - padding.top - padding.bottom);
            };
            
            // 时间刻度
            const timeScale = (index) => {
                return padding.left + (index / (candleData.length - 1)) * (chartWidth - padding.left - padding.right);
            };
            
            // 生成价格标签
            const generatePriceLabels = () => {
                const labels = [];
                const step = priceRange / 5;
                for (let i = 0; i <= 5; i++) {
                    const price = maxPrice - (step * i);
                    labels.push({
                        value: price,
                        y: priceScale(price)
                    });
                }
                return labels;
            };
            
            const priceLabels = generatePriceLabels();
            const timeLabels = generateTimeLabels(candleData, timeInterval);
            
            return (
                <div style={{ 
                    width: '100%', 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '20px',
                    marginTop: '20px'
                }}>
                    <svg width={chartWidth} height={chartHeight} style={{ display: 'block', margin: '0 auto' }}>
                        {/* 水平网格线和价格标签 */}
                        {priceLabels.map((label, i) => (
                            <g key={i}>
                                <line
                                    x1={padding.left}
                                    y1={label.y}
                                    x2={chartWidth - padding.right}
                                    y2={label.y}
                                    stroke="#f3f4f6"
                                    strokeWidth="1"
                                />
                                <text
                                    x={padding.left - 10}
                                    y={label.y + 4}
                                    textAnchor="end"
                                    fontSize="11"
                                    fill="#6b7280"
                                    fontFamily="Arial, sans-serif"
                                >
                                    {label.value.toFixed(1)}
                                </text>
                            </g>
                        ))}
                        
                        {/* 垂直网格线和时间标签 */}
                        {timeLabels.map((timeLabel) => (
                            <g key={timeLabel.index}>
                                <line
                                    x1={timeScale(timeLabel.index)}
                                    y1={padding.top}
                                    x2={timeScale(timeLabel.index)}
                                    y2={chartHeight - padding.bottom}
                                    stroke="#f9fafb"
                                    strokeWidth="1"
                                />
                                <text
                                    x={timeScale(timeLabel.index)}
                                    y={chartHeight - padding.bottom + 15}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#6b7280"
                                    fontFamily="Arial, sans-serif"
                                >
                                    {timeLabel.label}
                                </text>
                            </g>
                        ))}
                        
                        {/* 主要边框 */}
                        <rect
                            x={padding.left}
                            y={padding.top}
                            width={chartWidth - padding.left - padding.right}
                            height={chartHeight - padding.top - padding.bottom}
                            fill="none"
                            stroke="#d1d5db"
                            strokeWidth="1"
                        />
                        
                        {/* K线数据 */}
                        {candleData.map((candle, i) => {
                            const x = timeScale(i);
                            const isGreen = candle.close >= candle.open;
                            const openY = priceScale(candle.open);
                            const closeY = priceScale(candle.close);
                            const highY = priceScale(candle.high);
                            const lowY = priceScale(candle.low);
                            
                            const bodyTop = Math.min(openY, closeY);
                            const bodyBottom = Math.max(openY, closeY);
                            const bodyHeight = Math.max(1, bodyBottom - bodyTop);
                            
                            const candleWidth = Math.max(3, (chartWidth - padding.left - padding.right) / candleData.length * 0.6);
                            
                            return (
                                <g key={i}>
                                    {/* 上下影线 */}
                                    <line
                                        x1={x}
                                        y1={highY}
                                        x2={x}
                                        y2={lowY}
                                        stroke={isGreen ? "#10b981" : "#ef4444"}
                                        strokeWidth="1.5"
                                    />
                                    
                                    {/* K线实体 */}
                                    <rect
                                        x={x - candleWidth / 2}
                                        y={bodyTop}
                                        width={candleWidth}
                                        height={bodyHeight || 1}
                                        fill={isGreen ? "#10b981" : "#ef4444"}
                                        stroke={isGreen ? "#10b981" : "#ef4444"}
                                        strokeWidth="1"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>
            );
        };

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

                <div className="filter-controls" data-name="filter-controls">
                    <DatePicker 
                        label={getTranslation(language, 'historicalMarket_startTime')}
                        value={startDate}
                        onChange={setStartDate}
                    />
                    <DatePicker 
                        label={getTranslation(language, 'historicalMarket_endTime')}
                        value={endDate}
                        onChange={setEndDate}
                    />
                    <select 
                        className="filter-select"
                        value={timeInterval}
                        onChange={(e) => setTimeInterval(e.target.value)}
                    >
                        <option value="1min">{getTranslation(language, 'historicalMarket_1min')}</option>
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
                    <CryptoTable 
                        isHistorical={true}
                        data={cryptoData.tableData}
                        language={language}
                        onRowClick={handleRowClick}
                    />
                    <button className="btn-primary mt-4 mx-auto block">{getTranslation(language, 'historicalMarket_loadMore')}</button>
                </div>

                {/* 当 selectedCrypto 有值时才渲染图表和详细信息区域 */}
                {selectedCrypto && (
                    <div className="chart-container" data-name="bitcoin-chart">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <i className={`${selectedCrypto.icon || ''} ${selectedCrypto.color || ''} text-2xl mr-3`}></i>
                                <div>
                                    <h3 className="text-lg font-bold">{selectedCrypto.name}</h3>
                                    <p className="text-gray-500">{selectedCrypto.symbol}</p>
                                </div>
                            </div>
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
                                <p className="text-gray-600">{getTranslation(language, `historicalMarket_${timeInterval}`) || timeInterval}</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">{getTranslation(language, 'historicalMarket_avgMarketCap')}</h4>
                                <p className="text-gray-600">{selectedCrypto.marketCap || '$149,832,567,891'}</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">{getTranslation(language, 'historicalMarket_volume')}</h4>
                                <p className="text-gray-600">{selectedCrypto.volume || '$28,934,756,123'}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-medium mb-2">Candlestick Chart</h4>
                            {/* 使用新的干净K线图组件 */}
                            <CleanCandlestickChart 
                                cryptoData={selectedCrypto}
                                timeInterval={timeInterval}
                                startDate={startDate}
                                endDate={endDate}
                            />
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
