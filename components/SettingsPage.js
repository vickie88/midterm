function SettingsPage({ language, onThemeChange, onFontSizeChange, onLanguageChange }) {
    try {
        const [colorMode, setColorMode] = React.useState('light');
        const [fontSize, setFontSize] = React.useState('medium');
        // --- 1. 添加状态管理弹窗 ---
        const [showSecurityModal, setShowSecurityModal] = React.useState(false);
        const [securityModalType, setSecurityModalType] = React.useState(null); // 'password' or 'pin'

        const handleColorModeChange = (mode) => {
            setColorMode(mode);
            onThemeChange(mode);
        };

        const handleFontSizeChange = (size) => {
            setFontSize(size);
            onFontSizeChange(size);
        };

        // --- 2. 添加事件处理函数 ---
        const handleSecurityChange = (type) => {
            setSecurityModalType(type);
            setShowSecurityModal(true);
        };

        const handleModalClose = () => {
            setShowSecurityModal(false);
            setSecurityModalType(null);
        };

        const handleModalConfirm = (currentValue, newValue) => {
            console.log(`Attempting to change ${securityModalType}`);
            console.log('Current Value:', currentValue); // 注意：实际应用中不应打印敏感信息
            console.log('New Value:', newValue);       // 注意：实际应用中不应打印敏感信息
            // TODO: 在这里添加调用 API 修改密码或 PIN 的逻辑
            alert(`${securityModalType === 'password' ? 'Password' : 'PIN'} change request submitted (check console).`);
            handleModalClose(); // 关闭弹窗
        };

        return (
            <div className="settings-container" data-name="settings-page">
                {/* Account Settings Section - Assuming it's correct */}
                <div className="settings-section account-settings" data-name="account-settings">
                     <h2 className="settings-title">{getTranslation(language, 'accountSettings')}</h2>
                     <div className="account-info">
                         <div className="user-avatar">
                             <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="User Avatar" />
                         </div>
                         <div className="user-details">
                             <div className="info-row">
                                 <span className="label">{getTranslation(language, 'username')}</span>
                                 <span className="value">UserUser</span>
                             </div>
                             <div className="info-row">
                                 <span className="label">{getTranslation(language, 'userID')}</span>
                                 <span className="value">12345678</span>
                             </div>
                             <div className="info-row">
                                 <span className="label">{getTranslation(language, 'email')}</span>
                                 <span className="value">xxxxxxxx@gmail.com</span>
                             </div>
                             <div className="info-row">
                                 <span className="label">{getTranslation(language, 'balance')}</span>
                                 <span className="value">123,456,789.0000</span>
                             </div>
                             <div className="info-row">
                                 <span className="label">{getTranslation(language, 'joinDate')}</span>
                                 <span className="value">2020.10.20</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Asset Settings Section - Assuming it's correct */}
                 <div className="settings-section" data-name="asset-settings">
                     <h2 className="settings-title">{getTranslation(language, 'assetSettings')}</h2>
                     <div className="settings-row">
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'assetUnit')}</span>
                             <select className="setting-select" defaultValue="USD">
                                 <option value="USD">USD</option>
                                 <option value="EUR">EUR</option>
                                 <option value="GBP">GBP</option>
                             </select>
                         </div>
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'decimalPrecision')}</span>
                             <select className="setting-select" defaultValue="4">
                                 <option value="2">2</option>
                                 <option value="4">4</option>
                                 <option value="6">6</option>
                             </select>
                         </div>
                     </div>
                 </div>

                 {/* Interface Preferences Section - Assuming it's correct */}
                 <div className="settings-section" data-name="interface-preferences">
                     <h2 className="settings-title">{getTranslation(language, 'interfacePreferences')}</h2>
                     <div className="settings-row">
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'colorMode')}</span>
                             <div className="toggle-group">
                                 <button
                                     className={`toggle-btn ${colorMode === 'light' ? 'active' : ''}`}
                                     onClick={() => handleColorModeChange('light')}
                                 >
                                     Light
                                 </button>
                                 <button
                                     className={`toggle-btn ${colorMode === 'dark' ? 'active' : ''}`}
                                     onClick={() => handleColorModeChange('dark')}
                                 >
                                     Dark
                                 </button>
                             </div>
                         </div>
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'fontSize')}</span>
                             <div className="toggle-group">
                                 <button
                                     className={`toggle-btn ${fontSize === 'small' ? 'active' : ''}`}
                                     onClick={() => handleFontSizeChange('small')}
                                 >
                                     Small
                                 </button>
                                 <button
                                     className={`toggle-btn ${fontSize === 'medium' ? 'active' : ''}`}
                                     onClick={() => handleFontSizeChange('medium')}
                                 >
                                     Medium
                                 </button>
                                 <button
                                     className={`toggle-btn ${fontSize === 'large' ? 'active' : ''}`}
                                     onClick={() => handleFontSizeChange('large')}
                                 >
                                     Large
                                 </button>
                             </div>
                         </div>
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'language')}</span>
                             <select
                                 className="setting-select"
                                 value={language}
                                 onChange={(e) => onLanguageChange(e.target.value)}
                             >
                                 <option value="en">English</option>
                                 <option value="zh">简体中文</option>
                             </select>
                         </div>
                     </div>
                 </div>

                 {/* Notification Settings Section - Assuming it's correct */}
                  <div className="settings-section" data-name="notification-settings">
                     <h2 className="settings-title">{getTranslation(language, 'notificationSettings')}</h2>
                     <div className="settings-row">
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'notificationMethod')}</span>
                             <select className="setting-select" defaultValue="redPoint">
                                 <option value="redPoint">Red Point</option>
                                 <option value="popup">Popup</option>
                                 <option value="email">Email</option>
                             </select>
                         </div>
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'priceAlert')}</span>
                             <div className="toggle-switch">
                                 <input type="checkbox" id="priceAlert" defaultChecked />
                                 <label htmlFor="priceAlert"></label>
                             </div>
                         </div>
                         <div className="setting-item">
                             <span className="label">{getTranslation(language, 'orderFilledNotification')}</span>
                             <div className="toggle-switch">
                                 <input type="checkbox" id="orderFilled" defaultChecked />
                                 <label htmlFor="orderFilled"></label>
                             </div>
                         </div>
                     </div>
                 </div>

                {/* Security Settings Section - Modified */}
                <div className="settings-section" data-name="security-settings">
                    <h2 className="settings-title">{getTranslation(language, 'securitySettings')}</h2>
                    <div className="settings-row">
                        <div className="setting-item">
                            <span className="label">{getTranslation(language, 'password')}</span>
                            <div className="security-value">
                                <span>••••••••••</span>
                                {/* --- 3. 修改密码按钮 --- */}
                                <button
                                    className="change-btn"
                                    onClick={() => handleSecurityChange('password')}
                                >
                                    {getTranslation(language, 'changes')}
                                </button>
                            </div>
                        </div>
                        <div className="setting-item">
                            <span className="label">{getTranslation(language, 'tradingPIN')}</span>
                            <div className="security-value">
                                <span>••••••</span>
                                {/* --- 3. 修改 PIN 按钮 --- */}
                                <button
                                    className="change-btn"
                                    onClick={() => handleSecurityChange('pin')}
                                >
                                    {getTranslation(language, 'changes')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Button - Assuming it's correct */}
                <button className="btn-primary mt-4" data-name="logout-button">
                    {getTranslation(language, 'logOut')}
                </button>

                {/* --- 4. 条件渲染弹窗 --- */}
                {showSecurityModal && (
                    <SecurityModal
                        type={securityModalType}
                        onClose={handleModalClose}
                        onConfirm={handleModalConfirm}
                        language={language}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('SettingsPage component error:', error);
        // Assuming reportError is defined elsewhere
        // reportError(error);
        return null;
    }
}

