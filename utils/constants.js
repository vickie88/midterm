const ITEMS_PER_PAGE = 3;
const TOTAL_ASSETS = [{
        icon: 'fab fa-bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        change: 2.05,
        // 更新字段名
        onOrdersQuantity: 1.2345, // onOrdersCount -> onOrdersQuantity
        onOrdersValue: 500.12, // onOrdersAmount -> onOrdersValue
        availableQuantity: 0.5678, // availableCount -> availableQuantity
        availableValue: 250.06 // availableAmount -> availableValue
    },
    {
        icon: 'fab fa-ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        change: -2.05,
        // 更新字段名
        onOrdersQuantity: 2.3456,
        onOrdersValue: 400.08,
        availableQuantity: 1.2345,
        availableValue: 210.07
    },
    {
        icon: 'fas fa-circle',
        name: 'Binance',
        symbol: 'BNB',
        change: 2.05,
        // 更新字段名
        onOrdersQuantity: 3.4567,
        onOrdersValue: 300.03,
        availableQuantity: 2.3456,
        availableValue: 180.05
    },
    // --- 添加更多数据，让 Load More 可以显示 ---
    {
        icon: 'fas fa-circle',
        name: 'Cardano',
        symbol: 'ADA',
        change: 1.25,
        // 更新字段名
        onOrdersQuantity: 10.123,
        onOrdersValue: 15.50,
        availableQuantity: 50.456,
        availableValue: 75.20
    },
    {
        icon: 'fas fa-circle',
        name: 'Solana',
        symbol: 'SOL',
        change: -1.15,
        // 更新字段名
        onOrdersQuantity: 5.678,
        onOrdersValue: 800.00,
        availableQuantity: 2.123,
        availableValue: 300.50
    },
    {
        icon: 'fas fa-circle',
        name: 'Polkadot',
        symbol: 'DOT',
        change: 3.45,
        // 更新字段名
        onOrdersQuantity: 20.987,
        onOrdersValue: 180.75,
        availableQuantity: 100.123,
        availableValue: 900.80
    }
    // --- 你可以按需继续添加 ---
];

// ... FONT_SIZES 等其他常量 ...

const FONT_SIZES = {
    small: { base: '14px', heading: '24px' },
    medium: { base: '16px', heading: '28px' },
    large: { base: '18px', heading: '32px' }
};

const cryptoData = {
    popular: [
        { name: 'Bitcoin', symbol: 'BTC', price: 68000, change: 2.1 },
        { name: 'Ethereum', symbol: 'ETH', price: 3500, change: 1.5 },
        { name: 'Binance Coin', symbol: 'BNB', price: 400, change: 0.8 }
    ],
    gainers: [
        { name: 'Solana', symbol: 'SOL', price: 150, change: 12.5 },
        { name: 'Polkadot', symbol: 'DOT', price: 35, change: 8.2 }
    ],
    volume: [
        { name: 'Bitcoin', symbol: 'BTC', price: 68000, change: 2.1 },
        { name: 'Ethereum', symbol: 'ETH', price: 3500, change: 1.5 }
    ],
    tableData: [
        { name: 'Bitcoin', symbol: 'BTC', price: 68000, change: 2.1, volume: 1000000 },
        { name: 'Ethereum', symbol: 'ETH', price: 3500, change: 1.5, volume: 800000 }
    ]
};