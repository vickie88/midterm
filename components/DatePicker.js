function DatePicker({ label, value, onChange }) {
    try {
        const [isOpen, setIsOpen] = React.useState(false);
        // 使用 value prop 的初始值，如果 value 不存在则使用默认值
        const [selectedDate, setSelectedDate] = React.useState(value || '2025-01-01');

        const handleDateChange = (e) => {
            const date = e.target.value;
            setSelectedDate(date);
            onChange && onChange(date);
            // setIsOpen(false); // 选择日期后不立即关闭，以便用户确认或继续选择
        };

        // 点击按钮时打开/关闭日历
        const toggleCalendar = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="relative" data-name="date-picker" data-file="components/DatePicker.js">
                <button
                    className="filter-select flex items-center justify-between w-40"
                    onClick={toggleCalendar} // 使用单独的函数处理点击
                >
                    {/* 如果 value 存在则显示 value，否则显示 label */}
                    <span>{value || label}</span>
                    <i className="fas fa-chevron-down"></i>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-4 z-10">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange} // 使用单独的函数处理日期变化
                            className="w-full p-2 border rounded"
                        />
                         {/* 可以添加一个关闭按钮 */}
                         {/* <button onClick={() => setIsOpen(false)}>Close</button> */}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('DatePicker component error:', error);
        reportError(error);
        return null;
    }
}