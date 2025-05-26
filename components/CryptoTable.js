// Modified CryptoTable.js
function CryptoTable({ isHistorical = false, data, language, onRowClick }) {
    try {
        const tableData = data || cryptoData.tableData;
        const historicalHeaders = [
            getTranslation(language, 'token'),
            getTranslation(language, 'highestPrice'),
            getTranslation(language, 'lowestPrice'),
            getTranslation(language, 'changes'),
            getTranslation(language, 'openPrice'),
            getTranslation(language, 'closePrice'),
            getTranslation(language, 'marketCap'),
            getTranslation(language, 'volumeCol')
        ];
        const realtimeHeaders = [
            getTranslation(language, 'token'),
            getTranslation(language, 'realTimeMarket_symbol'),
            getTranslation(language, 'realTimeMarket_price'),
            getTranslation(language, 'realTimeMarket_24hChange'),
            getTranslation(language, 'realTimeMarket_marketCap'),
            getTranslation(language, 'realTimeMarket_volumeCol')
        ];

        return (
            <table className="w-full" data-name="crypto-table" data-file="components/CryptoTable.js">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4"></th>
                        {(isHistorical ? historicalHeaders : realtimeHeaders).map((header, index) => (
                            <th key={index} className="text-left py-3 px-4 text-gray-500 font-medium text-sm">
                                {header}
                            </th>
                        ))}
                        {!isHistorical && <th className="text-left py-3 px-4"></th>}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((crypto, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50" onClick={() => onRowClick && onRowClick(crypto)} style={{ cursor: 'pointer' }}>
                            <td className="py-4 px-4">
                                <i className={`fas fa-star ${crypto.favorite ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center">
                                    <i className={`${crypto.icon || ''} ${crypto.color || ''} text-xl mr-3`}></i>
                                    <span className="font-medium">{crypto.name}</span>
                                </div>
                            </td>
                            {!isHistorical && (
                                <td className="py-4 px-4 text-gray-600">{crypto.symbol}</td>
                            )}
                            <td className="py-4 px-4 font-medium">{crypto.price}</td>
                            {isHistorical && (
                                <td className="py-4 px-4 font-medium">{crypto.price}</td>
                            )}
                             <td className={`py-4 px-4 ${crypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {crypto.change > 0 ? '▲' : '▼'} {Math.abs(crypto.change)}%
                            </td>
                            {isHistorical && (
                                <>
                                    <td className="py-4 px-4">{crypto.openPrice || crypto.marketCap}</td>
                                    <td className="py-4 px-4">{crypto.closePrice || crypto.marketCap}</td>
                                </>
                            )}
                            <td className="py-4 px-4 text-gray-600">{crypto.marketCap}</td>
                            <td className="py-4 px-4 text-gray-600">{crypto.volume}</td>
                            {!isHistorical && (
                                <td className="py-4 px-4">
                                    <div className="flex gap-2">
                                        <button className="text-blue-500 text-sm">{getTranslation(language, 'viewDetails')}</button>
                                        <span className="text-gray-300">|</span>
                                        <button className="text-blue-500 text-sm">{getTranslation(language, 'tradeNow')}</button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } catch (error) {
        console.error('CryptoTable component error:', error);
        reportError(error);
        return null;
    }
}