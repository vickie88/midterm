function SecurityModal({ type, onClose, onConfirm, language }) {
    const [currentValue, setCurrentValue] = React.useState('');
    const [newValue, setNewValue] = React.useState('');
    const [confirmValue, setConfirmValue] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newValue !== confirmValue) {
            alert(getTranslation(language, 'valuesNotMatch'));
            return;
        }
        onConfirm(currentValue, newValue);
    };

    return (
        <div className="modal-overlay">
            <div className="security-modal">
                <div className="modal-header">
                    <h3>{getTranslation(language, type === 'password' ? 'Change Password' : 'Change PIN')}</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{getTranslation(language, 'Current ' + (type === 'password' ? 'Password' : 'PIN'))}</label>
                        <input 
                            type={type === 'password' ? 'password' : 'text'} 
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{getTranslation(language, 'New ' + (type === 'password' ? 'Password' : 'PIN'))}</label>
                        <input 
                            type={type === 'password' ? 'password' : 'text'} 
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{getTranslation(language, 'Confirm ' + (type === 'password' ? 'Password' : 'PIN'))}</label>
                        <input 
                            type={type === 'password' ? 'password' : 'text'} 
                            value={confirmValue}
                            onChange={(e) => setConfirmValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            {getTranslation(language, 'Cancel')}
                        </button>
                        <button type="submit" className="btn-primary">
                            {getTranslation(language, 'Confirm')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
