function SettingsSection({ title, fields }) {
    try {
        return (
            <div className="settings-section" data-name={`settings-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                <h2 className="settings-title">{title}</h2>
                <div className="settings-grid">
                    {fields.map((field, index) => (
                        <div key={index} className="settings-field" data-name={`settings-field-${index}`}>
                            <label className="settings-label">{field.label}</label>
                            <div className="settings-value flex justify-between items-center">
                                {field.value}
                                {field.hasAction && (
                                    <button className="settings-button" data-name={`change-${field.label.toLowerCase()}`}>
                                        Changes
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('SettingsSection component error:', error);
        reportError(error);
        return null;
    }
}
