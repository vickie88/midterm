function CryptoCard({ name, symbol, price, change, icon, color }) {
    try {
        const isPositive = change > 0;
        const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
        const changeIcon = isPositive ? '▲' : '▼';

        // 价格格式化
        const displayPrice = typeof price === 'number' ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : price;

        // 兼容无icon/color
        const iconClass = icon ? icon + ' crypto-icon' : 'fas fa-coins crypto-icon';
        const colorClass = color ? color : '';

        return (
            <div className="crypto-item flex items-center justify-between" data-name="crypto-card" data-file="components/CryptoCard.js">
                <div className="flex items-center">
                    <i className={`${iconClass} ${colorClass}`}></i>
                    <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-sm text-gray-500">{symbol}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-medium">{displayPrice}</div>
                    <div className={`text-sm ${changeColor}`}>
                        {changeIcon} {Math.abs(change)}%
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CryptoCard component error:', error);
        reportError(error);
        return null;
    }
}