import React, { useState } from "react";

interface Props {
  translations: { [key: string]: string };
  setTranslations: (translations: { [key: string]: string }) => void;
}

const TranslationTabs: React.FC<Props> = ({ translations, setTranslations }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Initialize activeTab with first translation key if available
  React.useEffect(() => {
    if (!activeTab && Object.keys(translations).length > 0) {
      setActiveTab(Object.keys(translations)[0]);
    }
  }, [translations, activeTab]);

  const handleAddTranslation = () => {
    if (newKey.trim() && newValue.trim()) {
      setTranslations({
        ...translations,
        [newKey.trim()]: newValue.trim()
      });
      setNewKey('');
      setNewValue('');
      setActiveTab(newKey.trim());
    }
  };

  const handleEditTranslation = (key: string) => {
    setEditingKey(key);
    setEditValue(translations[key]);
  };

  const handleSaveEdit = () => {
    if (editingKey && editValue.trim()) {
      setTranslations({
        ...translations,
        [editingKey]: editValue.trim()
      });
      setEditingKey(null);
      setEditValue('');
    }
  };

  const handleDeleteTranslation = (key: string) => {
    const newTranslations = { ...translations };
    delete newTranslations[key];
    setTranslations(newTranslations);
   
    // Set new active tab if current one was deleted
    const remainingKeys = Object.keys(newTranslations);
    if (key === activeTab && remainingKeys.length > 0) {
      setActiveTab(remainingKeys[0]);
    } else if (remainingKeys.length === 0) {
      setActiveTab('');
    }
  };

  const translationKeys = Object.keys(translations);

  // Inline Styles
  const containerStyle: React.CSSProperties = {
    background: '#fdf8f3',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#3e2f1c',
    padding: '2rem',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    color: '#7c4a2f',
    marginBottom: '0.5rem',
    fontWeight: '700',
  };

  const headerSubtitleStyle: React.CSSProperties = {
    color: '#5a3c24',
    fontSize: '1.1rem',
  };

  const tabNavigationStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const tabListStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    flex: 1,
  };

  const getTabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    position: 'relative',
    padding: '0.8rem 1.5rem',
    background: isActive ? '#a56a45' : 'rgba(255, 255, 255, 0.85)',
    border: `2px solid ${isActive ? '#a56a45' : '#e8d5c4'}`,
    borderRadius: '30px',
    color: isActive ? '#fff' : '#5a3c24',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    boxShadow: isActive ? '0 4px 12px rgba(165, 106, 69, 0.3)' : 'none',
  });

  const deleteTabBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0.2rem',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'background 0.2s',
  };

  const addTabBtnStyle: React.CSSProperties = {
    padding: '0.8rem 1.5rem',
    background: '#7c4a2f',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    fontSize: '1rem',
  };

  const tabContentStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(6px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const formH3Style: React.CSSProperties = {
    color: '#7c4a2f',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#5a3c24',
    fontWeight: '500',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.8rem 1rem',
    border: '2px solid #e8d5c4',
    borderRadius: '8px',
    fontFamily: 'inherit',
    fontSize: '1rem',
    color: '#3e2f1c',
    background: '#fefefe',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '80px',
  };

  const formActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  };

  const btnPrimaryStyle: React.CSSProperties = {
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    background: '#a56a45',
    color: '#fff',
  };

  const btnSecondaryStyle: React.CSSProperties = {
    padding: '0.8rem 1.5rem',
    border: '2px solid #e8d5c4',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    background: 'transparent',
    color: '#5a3c24',
  };

  const editorHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const editBtnStyle: React.CSSProperties = {
    padding: '0.6rem 1.2rem',
    background: '#7c4a2f',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
  };

  const translationDisplayStyle: React.CSSProperties = {
    display: 'grid',
    gap: '2rem',
  };

  const sectionStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.5rem',
  };

  const sectionLabelStyle: React.CSSProperties = {
    color: '#5a3c24',
    fontWeight: '600',
    fontSize: '1.1rem',
  };

  const valueDisplayStyle: React.CSSProperties = {
    padding: '1rem',
    background: '#f8f1e9',
    borderRadius: '8px',
    border: '1px solid #e8d5c4',
    fontFamily: "'Courier New', monospace",
    wordBreak: 'break-word',
  };

  const keyValueStyle: React.CSSProperties = {
    ...valueDisplayStyle,
    color: '#7c4a2f',
    fontWeight: '600',
  };

  const editFormStyle: React.CSSProperties = {
    display: 'grid',
    gap: '1rem',
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '3rem 1rem',
  };

  const emptyIconStyle: React.CSSProperties = {
    fontSize: '4rem',
    marginBottom: '1rem',
    opacity: 0.7,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={headerTitleStyle}>Translation Management</h2>
        <p style={headerSubtitleStyle}>Manage your application translations with ease</p>
      </div>

      {/* Tab Navigation */}
      <div style={tabNavigationStyle}>
        <div style={tabListStyle}>
          {translationKeys.map((key) => (
            <button
              key={key}
              style={getTabButtonStyle(activeTab === key)}
              onClick={() => setActiveTab(key)}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.currentTarget.style.background = '#f8f1e9';
                  e.currentTarget.style.borderColor = '#a56a45';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(165, 106, 69, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
                  e.currentTarget.style.borderColor = '#e8d5c4';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {key}
              <button
                style={deleteTabBtnStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTranslation(key);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
                title="Delete translation"
              >
                ×
              </button>
            </button>
          ))}
        </div>
       
        <button
          style={addTabBtnStyle}
          onClick={() => setActiveTab('new')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5a3c24';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 74, 47, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#7c4a2f';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="Add new translation"
        >
          + Add Translation
        </button>
      </div>

      {/* Content Area */}
      <div style={tabContentStyle}>
        {activeTab === 'new' ? (
          <div>
            <h3 style={formH3Style}>Add New Translation</h3>
            <div style={formGroupStyle}>
              <label htmlFor="newKey" style={labelStyle}>Translation Key</label>
              <input
                id="newKey"
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="e.g., welcome_message, button_save"
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#a56a45';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165, 106, 69, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e8d5c4';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="newValue" style={labelStyle}>Translation Value</label>
              <textarea
                id="newValue"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter the translated text"
                style={textareaStyle}
                rows={3}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#a56a45';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165, 106, 69, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e8d5c4';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={formActionsStyle}>
              <button
                style={{
                  ...btnPrimaryStyle,
                  opacity: (!newKey.trim() || !newValue.trim()) ? 0.6 : 1,
                  cursor: (!newKey.trim() || !newValue.trim()) ? 'not-allowed' : 'pointer',
                }}
                onClick={handleAddTranslation}
                disabled={!newKey.trim() || !newValue.trim()}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = '#7c4a2f';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(165, 106, 69, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = '#a56a45';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Add Translation
              </button>
              <button
                style={btnSecondaryStyle}
                onClick={() => setActiveTab(translationKeys[0] || '')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f1e9';
                  e.currentTarget.style.borderColor = '#a56a45';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#e8d5c4';
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : activeTab ? (
          <div>
            <div style={editorHeaderStyle}>
              <h3 style={formH3Style}>
                Editing: <span style={{ color: '#a56a45', fontWeight: '600' }}>{activeTab}</span>
              </h3>
              <button
                style={editBtnStyle}
                onClick={() => handleEditTranslation(activeTab)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#5a3c24';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#7c4a2f';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Edit Value
              </button>
            </div>
           
            <div style={translationDisplayStyle}>
              <div style={sectionStyle}>
                <label style={sectionLabelStyle}>Key:</label>
                <div style={keyValueStyle}>{activeTab}</div>
              </div>
             
              <div style={sectionStyle}>
                <label style={sectionLabelStyle}>Value:</label>
                {editingKey === activeTab ? (
                  <div style={editFormStyle}>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={textareaStyle}
                      rows={3}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#a56a45';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165, 106, 69, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e8d5c4';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    <div style={formActionsStyle}>
                      <button
                        style={btnPrimaryStyle}
                        onClick={handleSaveEdit}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#7c4a2f';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(165, 106, 69, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#a56a45';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Save
                      </button>
                      <button
                        style={btnSecondaryStyle}
                        onClick={() => setEditingKey(null)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f8f1e9';
                          e.currentTarget.style.borderColor = '#a56a45';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = '#e8d5c4';
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={valueDisplayStyle}>{translations[activeTab]}</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>📝</div>
            <h3 style={{ ...formH3Style, marginBottom: '0.5rem' }}>No Translations Yet</h3>
            <p style={{ color: '#5a3c24', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Start by adding your first translation key and value.
            </p>
            <button
              style={btnPrimaryStyle}
              onClick={() => setActiveTab('new')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7c4a2f';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(165, 106, 69, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#a56a45';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Add First Translation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationTabs;