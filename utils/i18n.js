const translations = {
    en: {
        // --- Sidebar & General ---
        realTimeMarket: 'Real-time Market',
        historicalMarket: 'Historical Market',
        tradeBacktest: 'Trade Backtest',
        wallets: 'Wallets',
        activities: 'Activities',
        settings: 'Settings',
        search: 'Search',
        loadMore: 'Load More',

        // --- Real-Time Market Page ---
        realTimeMarket_searchTitle: 'What token are you looking for?',
        realTimeMarket_searchDesc: 'Search by token name, symbol, or contract address',
        realTimeMarket_searchPlaceholder: 'Try ETH, BTC......',
        realTimeMarket_popular: 'Popular Cryptocurrencies',
        realTimeMarket_more: 'More',
        realTimeMarket_gainers: 'Top Gainers',
        realTimeMarket_volume: 'Highest Trading Volume',
        realTimeMarket_todayPrice: "Today's Cryptocurrency Prices",
        realTimeMarket_marketCap: 'Market Cap',
        realTimeMarket_price: 'Price',
        realTimeMarket_24hChange: '24H Change',
        realTimeMarket_volumeCol: 'Volume',
        realTimeMarket_symbol: 'Symbol',
        realTimeMarket_loadMore: 'Load more',
        realTimeMarket_investAdvice: 'Investment Advice',
        realTimeMarket_aiPrediction: 'AI PREDICTION',
        realTimeMarket_aiAdvice: 'AI Investment Advice for',
        realTimeMarket_btc: 'Bitcoin (BTC)',
        realTimeMarket_eth: 'Ethereum (ETH)',
        realTimeMarket_bnb: 'Binance Coin (BNB)',
        realTimeMarket_ada: 'Cardano (ADA)',

        token: 'Token',
        highestPrice: 'Highest Price',
        lowestPrice: 'Lowest Price',
        openPrice: 'Open Price',
        closePrice: 'Close Price',
        marketCap: 'Market Cap',
        volumeCol: 'Volume',
        viewDetails: 'View Details',
        tradeNow: 'Trade Now',

        // --- Historical Market Page ---
        historicalMarket_searchTitle: 'What token are you looking for?',
        historicalMarket_searchDesc: 'Search by token name, symbol, or contract address',
        historicalMarket_searchPlaceholder: 'Try ETH, BTC......',
        historicalMarket_startTime: 'Start Time',
        historicalMarket_endTime: 'End Time',
        historicalMarket_5s: '5 Seconds',
        historicalMarket_10s: '10 Seconds',
        historicalMarket_30s: '30 Seconds',
        historicalMarket_45s: '45 Seconds',
        historicalMarket_1min: '1 Minute',
        historicalMarket_priceTableTitle: 'Cryptocurrency Prices',
        historicalMarket_marketCap: 'Market Cap',
        historicalMarket_highestPrice: 'Highest Price',
        historicalMarket_lowestPrice: 'Lowest Price',
        historicalMarket_changes: 'Changes',
        historicalMarket_openPrice: 'Open Price',
        historicalMarket_closePrice: 'Close Price',
        historicalMarket_volumeCol: 'Volume',
        historicalMarket_loadMore: 'Load more',
        historicalMarket_bitcoinTitle: 'Bitcoin', // 这里可以根据实际币种动态生成，暂时写死Bitcoin
        historicalMarket_changeValue: '{value}', // 用于显示涨跌幅，{value}会被实际数值替换
        historicalMarket_timePeriod: 'Time Period',
        historicalMarket_timeInterval: 'Time Interval',
        historicalMarket_avgMarketCap: 'Average Market Cap',
        historicalMarket_volume: 'Volume',
        historicalMarket_chartTitle: 'Candlestick Chart', // 这里可以根据实际币种动态生成，暂时写死Bitcoin图表标题


        // --- Settings Page ---
        accountSettings: 'Account Settings',
        assetSettings: 'Asset Settings',
        interfacePreferences: 'Interface Preferences',
        notificationSettings: 'Notification Settings',
        securitySettings: 'Security Settings',
        username: 'Username',
        userID: 'UserID',
        email: 'Email',
        balance: 'Balance', // Note: This key might be generic, check usage
        joinDate: 'Join Date',
        assetUnit: 'Asset Unit',
        decimalPrecision: 'Decimal Precision',
        colorMode: 'Color Mode',
        fontSize: 'Font Size',
        language: 'Language',
        notificationMethod: 'Notification Method',
        priceAlert: 'Price Alert',
        orderFilledNotification: 'Order Filled Notification',
        password: 'Password',
        tradingPIN: 'Trading PIN',
        changes: 'Changes',
        logOut: 'Log Out',
        darkMode: 'Dark Mode',
        small: 'Small', // Font size options likely need medium/large too
        open: 'Open',
        redPoint: 'Red Point',

        // --- Wallet Page ---
        totalBalance: 'Total Balance', // For the top card title
        deposit: 'Deposit',
        assetBalances: 'Asset Balances', // For the table card title
        asset: 'Asset',
        symbol: 'Symbol',
        market24h: '24H MARKET',
        // Renamed table header keys
        onOrdersQuantity: 'On Orders Quantity', // Count -> Quantity
        onOrdersValue: 'On Orders Value', // Amount -> Value
        availableQuantity: 'Available Quantity', // Count -> Quantity
        availableValue: 'Available Value', // Amount -> Value
        // Removed keys: onOrders, availableBalance, totalBalanceTable, onOrdersCount, onOrdersAmount, availableCount, availableAmount



    },
    zh: {
        // --- 侧边栏 & 通用 ---
        realTimeMarket: '实时行情',
        historicalMarket: '历史行情',
        tradeBacktest: '交易回测',
        wallets: '钱包',
        activities: '活动',
        settings: '设置',
        search: '搜索',
        loadMore: '加载更多',

        // --- 实时大盘页 ---
        realTimeMarket_searchTitle: '您正在查找什么币种？',
        realTimeMarket_searchDesc: '可通过币名、符号或合约地址搜索',
        realTimeMarket_searchPlaceholder: '试试 ETH、BTC......',
        realTimeMarket_popular: '热门加密货币',
        realTimeMarket_more: '更多',
        realTimeMarket_gainers: '涨幅榜',
        realTimeMarket_volume: '成交量榜',
        realTimeMarket_todayPrice: '今日加密货币价格',
        realTimeMarket_marketCap: '市值',
        realTimeMarket_price: '价格',
        realTimeMarket_24hChange: '24小时涨跌',
        realTimeMarket_volumeCol: '成交量',
        realTimeMarket_symbol: '符号',
        realTimeMarket_loadMore: '加载更多',
        realTimeMarket_investAdvice: '投资建议',
        realTimeMarket_aiPrediction: 'AI预测',
        realTimeMarket_aiAdvice: 'AI投资建议：',
        realTimeMarket_btc: '比特币（BTC）',
        realTimeMarket_eth: '以太坊（ETH）',
        realTimeMarket_bnb: '币安币（BNB）',
        realTimeMarket_ada: '卡尔达诺（ADA）',

        token: '币种',
        highestPrice: '最高价',
        lowestPrice: '最低价',
        openPrice: '开盘价',
        closePrice: '收盘价',
        marketCap: '市值',
        volumeCol: '成交量',
        viewDetails: '查看详情',
        tradeNow: '立即交易',

        // --- 历史大盘页 ---
        historicalMarket_searchTitle: '您正在查找什么币种？',
        historicalMarket_searchDesc: '按币种名称、符号或合约地址搜索',
        historicalMarket_searchPlaceholder: '尝试 ETH, BTC......',
        historicalMarket_startTime: '开始时间',
        historicalMarket_endTime: '结束时间',
        historicalMarket_5s: '5秒',
        historicalMarket_10s: '10秒',
        historicalMarket_30s: '30秒',
        historicalMarket_45s: '45秒',
        historicalMarket_1min: '1分钟',
        historicalMarket_priceTableTitle: '加密货币价格',
        historicalMarket_marketCap: '市值',
        historicalMarket_highestPrice: '最高价',
        historicalMarket_lowestPrice: '最低价',
        historicalMarket_changes: '涨跌幅',
        historicalMarket_openPrice: '开盘价',
        historicalMarket_closePrice: '收盘价',
        historicalMarket_volumeCol: '成交量',
        historicalMarket_loadMore: '加载更多',
        historicalMarket_bitcoinTitle: '比特币', // 这里可以根据实际币种动态生成，暂时写死比特币
        historicalMarket_changeValue: '{value}', // 用于显示涨跌幅，{value}会被实际数值替换
        historicalMarket_timePeriod: '时间段',
        historicalMarket_timeInterval: '时间间隔',
        historicalMarket_avgMarketCap: '平均市值',
        historicalMarket_volume: '成交量',
        historicalMarket_chartTitle: 'K线图', // 这里可以根据实际币种动态生成，暂时写死比特币图表标题

        // --- 设置页 ---
        accountSettings: '账户设置',
        assetSettings: '资产设置',
        interfacePreferences: '界面偏好',
        notificationSettings: '通知设置',
        securitySettings: '安全设置',
        username: '用户名',
        userID: '用户ID',
        email: '邮箱',
        balance: '余额', // 注意: 这个 key 可能比较通用，检查具体用途
        joinDate: '注册日期',
        assetUnit: '资产单位',
        decimalPrecision: '小数精度',
        colorMode: '颜色模式',
        fontSize: '字体大小',
        language: '语言',
        notificationMethod: '通知方式',
        priceAlert: '价格提醒',
        orderFilledNotification: '订单成交通知',
        password: '密码',
        tradingPIN: '交易密码',
        changes: '涨跌幅',
        logOut: '退出登录',
        darkMode: '深色模式',
        small: '小', // 字体大小选项可能也需要中/大
        open: '开启',
        redPoint: '红点',

        // --- 钱包页 ---
        totalBalance: '总余额', // 用于顶部卡片标题
        deposit: '充值',
        assetBalances: '资产余额', // 用于表格卡片标题
        asset: '资产',
        symbol: '符号',
        market24h: '24小时行情',
        // 重命名表格头 key
        onOrdersQuantity: '委托中数量', // Count -> Quantity
        onOrdersValue: '委托中价值', // Amount -> Value
        availableQuantity: '可用数量', // Count -> Quantity
        availableValue: '可用价值', // Amount -> Value
        // 已移除 key: onOrders, availableBalance, totalBalanceTable, onOrdersCount, onOrdersAmount, availableCount, availableAmount


    }
};

// Helper function remains the same
function getTranslation(lang, key) {
    // Fallback logic ensures it still works even if a key is missing temporarily
    return translations[lang]?.[key] || translations['en']?.[key] || key;
}