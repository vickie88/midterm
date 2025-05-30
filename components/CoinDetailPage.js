function CoinDetailPage({ coinData, language, onBack }) {
    try {
        const [selectedTimeframe, setSelectedTimeframe] = React.useState('1 Day');
        const [activeTab, setActiveTab] = React.useState('Buy');
        const [buyAmount, setBuyAmount] = React.useState('0.423256508');
        const [costAmount, setCostAmount] = React.useState('7795.51320083');
        const [tradeModel, setTradeModel] = React.useState('Mean Reversion');
        const [movingAvgPeriod, setMovingAvgPeriod] = React.useState('20');
        const [devMultiplier, setDevMultiplier] = React.useState('1.5');
        const [bollingerPeriod, setBollingerPeriod] = React.useState('20');
        const [takeProfitLoss, setTakeProfitLoss] = React.useState('3%');

        // 国际化翻译函数
        const t = (key) => getTranslation(language || 'en', key);

        const timeframes = [
            { key: '1 Day', label: t('coinDetail_timeframe_1Day') },
            { key: '7 Days', label: t('coinDetail_timeframe_7Days') },
            { key: '1 month', label: t('coinDetail_timeframe_1Month') },
            { key: '3 month', label: t('coinDetail_timeframe_3Month') },
            { key: '1 year', label: t('coinDetail_timeframe_1Year') }
        ];

        const tradeModels = [
            { key: 'Mean Reversion', label: t('coinDetail_tradeModel_meanReversion') },
            { key: 'Trend Following', label: t('coinDetail_tradeModel_trendFollowing') },
            { key: 'Arbitrage', label: t('coinDetail_tradeModel_arbitrage') }
        ];

        // 生成真实折线图数据
        const generateLineChartData = () => {
            const basePrice = 9600;
            // const timeLabels = ['11:00 PM', '2:00 AM', '5:00 AM', '8:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'];

            return Array.from({ length: 60 }, (_, i) => {
                let price;
                // 模拟图片中的价格走势
                if (i < 10) price = basePrice + 300 + Math.random() * 100; // 高位开始
                else if (i < 20) price = basePrice + 200 - (i - 10) * 20 + Math.random() * 50; // 下降
                else if (i < 30) price = basePrice + 50 + Math.random() * 100; // 低位震荡
                else if (i < 40) price = basePrice + 100 + (i - 30) * 10 + Math.random() * 50; // 回升
                else if (i < 50) price = basePrice + 200 - (i - 40) * 5 + Math.random() * 30; // 小幅下调
                else price = basePrice + 150 + Math.random() * 50; // 末尾稳定

                return {
                    price: Math.max(9400, Math.min(9900, price)),
                    // time: timeLabels[Math.floor(i / 10)] || timeLabels[timeLabels.length - 1], // time property not used in polyline points
                    x: i // x property not used in polyline points calculation, index `i` is used directly
                };
            });
        };

        // 获取当前时间
        const getCurrentTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes} (UTC+0)`;
        };

        if (!coinData) {
            return (
                <div className="coin-detail-container">
                    <p>{t('coinDetail_loadingData')}</p>
                </div>
            );
        }

        const chartData = generateLineChartData();
        const timeLabels = ['11:00 PM', '2:00 AM', '5:00 AM', '8:00 AM', '11:00 AM', '2:00 PM', '5:00 PM'];
        const priceLabels = [9900, 9800, 9700, 9600, 9500, 9400];

        return (
            <div className="coin-detail-container" data-name="coin-detail-page">
                {/* 简化的顶部区域，只保留返回按钮 */}
                <div className="coin-detail-header-simple">
                    <button className="back-button" onClick={onBack}>←</button>
                </div>

                {/* 主要内容区域 */}
                <div className="coin-detail-content-spaced">
                    {/* 左侧主要区域 */}
                    <div className="main-content-left">
                        {/* 币种信息头部 */}
                        <div className="coin-info-header">
                            <div className="coin-basic-info">
                                <div className="coin-icon-name">
                                    <i className={`${coinData.icon || 'fab fa-bitcoin'} coin-icon`}></i>
                                    <div>
                                        <h1 className="coin-name">{coinData.name}</h1>
                                        <span className="coin-symbol">{coinData.symbol}</span>
                                    </div>
                                </div>
                                <div className="currency-selector">
                                    <span>{t('coinDetail_currency')}</span>
                                    <select className="currency-select">
                                        <option>AED</option>
                                        <option>USD</option>
                                        <option>EUR</option>
                                    </select>
                                </div>
                            </div>

                            {/* 价格信息 */}
                            <div className="price-info">
                                <div className="price-display">
                                    <span className="current-price">{coinData.price} USD</span>
                                    <span className={`price-change ${coinData.change > 0 ? 'positive' : 'negative'}`}>{coinData.change > 0 ? '+' : ''}{coinData.change}%</span>
                                </div>
                                <div className="converted-price">= {coinData.price} AED</div>
                            </div>

                            {/* 时间周期选择 */}
                            <div className="timeframe-selector">
                                {timeframes.map(timeframe => (
                                    <button key={timeframe.key} className={`timeframe-btn ${selectedTimeframe === timeframe.key ? 'active' : ''}`} onClick={() => setSelectedTimeframe(timeframe.key)}>
                                        {timeframe.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 折线图表区域 */}
                        <div className="chart-section">
                            <div className="chart-container-detail">
                                <div className="chart-placeholder-detail">
                                    <div className="line-chart-container">
                                        <div style={{ display: 'flex', width: '100%' }}> {/* Wrapper for price labels and chart main */}
                                            {/* 价格标签 */}
                                            <div className="price-labels">
                                                {priceLabels.map((price, i) => (
                                                    <div key={price} className="price-label" style={{ top: `${(i / (priceLabels.length - 1)) * 100}%` }}>
                                                        {price.toLocaleString()}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* 图表主体 */}
                                            <div className="chart-main">
                                                {/* 网格线 */}
                                                <div className="chart-grid-new">
                                                    {/* 水平网格线 */}
                                                    {priceLabels.map((_, i) => (
                                                        <div key={`h-grid-${i}`} className="grid-line-h" style={{ top: `${(i / (priceLabels.length - 1)) * 100}%` }}></div>
                                                    ))}
                                                    {/* 垂直网格线 */}
                                                    {timeLabels.map((_, i) => (
                                                        <div key={`v-grid-${i}`} className="grid-line-v" style={{ left: `${(i / (timeLabels.length - 1)) * 100}%` }}></div>
                                                    ))}
                                                </div>

                                                {/* SVG折线图 */}
                                                <svg className="line-chart-svg" viewBox="0 0 600 300">
                                                    <defs>
                                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
                                                            <stop offset="100%" style={{ stopColor: '#EAB308', stopOpacity: 1 }} />
                                                        </linearGradient>
                                                    </defs>
                                                    <polyline
                                                        fill="none"
                                                        stroke="url(#lineGradient)"
                                                        strokeWidth="3"
                                                        strokeLinejoin="round"
                                                        strokeLinecap="round"
                                                        points={chartData.map((point, idx) => {
                                                            const x = (idx / (chartData.length - 1)) * 600;
                                                            const y = 300 - ((point.price - 9400) / 500) * 300;
                                                            return `${x},${y}`;
                                                        }).join(' ')}
                                                    />
                                                    {/* 数据点 */}
                                                    {chartData.filter((_, idx) => idx % 10 === 0).map((point, i) => { // `i` here is the index after filtering
                                                        const originalDataIndex = chartData.indexOf(point); // A way to get original index if needed for key or logic
                                                        const x = (originalDataIndex / (chartData.length - 1)) * 600; // Ensure x is based on overall position
                                                        const y = 300 - ((point.price - 9400) / 500) * 300;
                                                        return (
                                                            <circle key={`dot-${originalDataIndex}`} cx={x} cy={y} r="4" fill="#F59E0B" stroke="#fff" strokeWidth="2" />
                                                        );
                                                    })}
                                                </svg>

                                                {/* 当前价格指示器 */}
                                                <div className="current-price-indicator">
                                                    <div className="price-line"></div>
                                                    <div className="price-badge">9,572</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 时间轴 - Moved inside line-chart-container */}
                                        <div className="time-axis">
                                            {timeLabels.map((time, i) => (
                                                <div key={time} className="time-label" style={{ left: `${(i / (timeLabels.length - 1)) * 100}%` }}>
                                                    {time}
                                                </div>
                                            ))}
                                        </div>

                                        {/* 更新时间 - Moved inside line-chart-container */}
                                        <div className="update-time">
                                            {t('coinDetail_lastUpdated')} {getCurrentTime()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI分析按钮 */}
                        <div className="ai-analysis-section">
                            <button className="ai-analysis-btn">{t('coinDetail_aiAnalysis')}</button>
                        </div>
                    </div>

                    {/* 右侧交易面板 */}
                    <div className="trading-panel">
                        {/* 买入/卖出选项卡 */}
                        <div className="trading-tabs">
                            <button className={`tab-btn ${activeTab === 'Buy' ? 'active' : ''}`} onClick={() => setActiveTab('Buy')}>
                                {t('coinDetail_buy')}
                            </button>
                            <button className={`tab-btn ${activeTab === 'Sell' ? 'active' : ''}`} onClick={() => setActiveTab('Sell')}>
                                {t('coinDetail_sell')}
                            </button>
                        </div>

                        {/* 交易表单 */}
                        <div className="trading-form">
                            <div className="form-group">
                                <label>{t('coinDetail_buyAmount')}</label>
                                <div className="input-with-currency">
                                    <input type="text" value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)} className="amount-input" />
                                    <select className="currency-dropdown">
                                        <option>BTC</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>{t('coinDetail_costAmount')}</label>
                                <div className="input-with-currency">
                                    <input type="text" value={costAmount} onChange={(e) => setCostAmount(e.target.value)} className="amount-input" />
                                    <select className="currency-dropdown">
                                        <option>USDT</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>{t('coinDetail_tradeModel')}</label>
                                <select className="trade-model-select" value={tradeModel} onChange={(e) => setTradeModel(e.target.value)}>
                                    {tradeModels.map(model => (
                                        <option key={model.key} value={model.key}>{model.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="parameters-section">
                                <h4>{t('coinDetail_setParameters')}</h4>

                                <div className="param-group">
                                    <label>{t('coinDetail_movingAvgPeriod')}</label>
                                    <div className="param-input-group">
                                        <input type="text" value={movingAvgPeriod} onChange={(e) => setMovingAvgPeriod(e.target.value)} />
                                        <button className="default-btn">{t('coinDetail_default')}</button>
                                    </div>
                                </div>

                                <div className="param-group">
                                    <label>{t('coinDetail_stdDevMultiplier')}</label>
                                    <div className="param-input-group">
                                        <input type="text" value={devMultiplier} onChange={(e) => setDevMultiplier(e.target.value)} />
                                        <button className="default-btn">{t('coinDetail_default')}</button>
                                    </div>
                                </div>

                                <div className="param-group">
                                    <label>{t('coinDetail_bollingerPeriod')}</label>
                                    <div className="param-input-group">
                                        <input type="text" value={bollingerPeriod} onChange={(e) => setBollingerPeriod(e.target.value)} />
                                        <button className="default-btn">{t('coinDetail_default')}</button>
                                    </div>
                                </div>

                                <div className="param-group">
                                    <label>{t('coinDetail_takeProfitStopLoss')}</label>
                                    <div className="param-input-group">
                                        <input type="text" value={takeProfitLoss} onChange={(e) => setTakeProfitLoss(e.target.value)} />
                                        <button className="default-btn">{t('coinDetail_default')}</button>
                                    </div>
                                </div>
                            </div>

                            {/* 交易按钮 */}
                            <button className="buy-now-btn">{t('coinDetail_buyNow')}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CoinDetailPage component error:', error);
        // Assuming reportError is a global function or defined elsewhere
        // reportError(error); 
        return null; // Or some error display component
    }
}

// Assuming getTranslation is defined elsewhere, e.g.:
// function getTranslation(language, key) { 
//   const translations = { en: { coinDetail_loadingData: "Loading data..." /* ...other keys */ } };
//   return translations[language]?.[key] || key; 
// }