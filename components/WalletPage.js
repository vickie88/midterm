function WalletPage({ language }) {
    try {
        // —— 分页与数据状态 ——
        const [currentPage, setCurrentPage] = React.useState(1);
        const [assets, setAssets] = React.useState(
            TOTAL_ASSETS.slice(0, ITEMS_PER_PAGE)
        );
        // —— 顶部现金余额 & 单位状态 ——
        const [cashBalance, setCashBalance] = React.useState(3700.96);
        const [currencyUnit, setCurrencyUnit] = React.useState('USD');

        const loadMore = () => {
            const nextAssets = TOTAL_ASSETS.slice(
                0,
                (currentPage + 1) * ITEMS_PER_PAGE
            );
            setAssets(nextAssets);
            setCurrentPage(currentPage + 1);
        };

        return (
            <div className="wallet-container" data-name="wallet-page">
                {/* ——— 顶部余额卡 ——— */}
                <div className="balance-card" data-name="balance-card">
                    <div className="balance-title">
                        {getTranslation(language, 'totalBalance')}
                    </div>
                    <div className="balance-cash-wrapper">
                        <div className="balance-cash-amount">
                            {cashBalance.toFixed(2)}
                        </div>
                        <select
                            className="balance-currency-select"
                            value={currencyUnit}
                            onChange={e => setCurrencyUnit(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="HKD">HKD</option>
                            {/* 如需更多币种可继续添加 */}
                        </select>
                    </div>
                    <button
                        className="btn-primary mt-4"
                        data-name="deposit-button"
                    >
                        {getTranslation(language, 'deposit')}
                    </button>
                </div>

                {/* ——— 资产列表 ——— */}
                <div className="card" data-name="assets-card">
                    <h2 className="text-xl font-bold mb-4">
                        {getTranslation(language, 'assetBalances')}
                    </h2>
                    <table className="assets-table" data-name="assets-table">
                        <thead>
                            <tr>
                                <th>{getTranslation(language, 'asset')}</th>
                                <th>{getTranslation(language, 'symbol')}</th>
                                <th>{getTranslation(language, 'market24h')}</th>
                                {/* 更新翻译 key */}
                                <th>{getTranslation(language, 'onOrdersQuantity')}</th>
                                <th>{getTranslation(language, 'onOrdersValue')}</th>
                                <th>{getTranslation(language, 'availableQuantity')}</th>
                                <th>{getTranslation(language, 'availableValue')}</th>
                                {/* 已移除 Total Balance / totalCount 列 */}
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset, index) => (
                                <AssetRow key={index} asset={asset} />
                            ))}
                        </tbody>
                    </table>
                    {/* Load More 按钮逻辑不变 */}
                    {assets.length < TOTAL_ASSETS.length && (
                        <button
                            className="mt-4 text-center w-full text-blue-600"
                            onClick={loadMore}
                            data-name="load-more"
                        >
                            {getTranslation(language, 'loadMore')}
                        </button>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('WalletPage component error:', error);
        reportError(error);
        return null;
    }
}