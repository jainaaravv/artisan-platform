import React, { useState } from "react";

interface Props {
  category: string;
  setCategory: (category: string) => void;
  price: string;
  setPrice: (price: string) => void;
}

const CategoryPriceForm: React.FC<Props> = ({
  category, setCategory, price, setPrice
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: "pottery", label: "🏺 Pottery & Ceramics", icon: "🏺" },
    { value: "textiles", label: "🧵 Handloom & Textiles", icon: "🧵" },
    { value: "woodcraft", label: "🪵 Wood Crafts", icon: "🪵" },
    { value: "metalwork", label: "⚒️ Metal Arts", icon: "⚒️" },
    { value: "jewelry", label: "💎 Handmade Jewelry", icon: "💎" },
    { value: "leather", label: "🎒 Leather Goods", icon: "🎒" },
    { value: "glass", label: "🔮 Glass Art", icon: "🔮" },
    { value: "paintings", label: "🎨 Traditional Paintings", icon: "🎨" }
  ];

  const priceRanges = [
    { value: "0-500", label: "₹0 - ₹500" },
    { value: "500-1500", label: "₹500 - ₹1,500" },
    { value: "1500-3000", label: "₹1,500 - ₹3,000" },
    { value: "3000-7500", label: "₹3,000 - ₹7,500" },
    { value: "7500+", label: "₹7,500+" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>🌿 Discover Artisan Crafts</h2>
          <p style={styles.subtitle}>Find authentic handmade treasures by category and budget</p>
        </div>

        {/* Category Selection */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <span style={styles.labelIcon}>🎯</span>
            Craft Category
          </label>
          <div style={styles.customSelect}>
            <div
              style={{
                ...styles.selectButton,
                ...(isOpen ? styles.selectButtonOpen : {})
              }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span style={styles.selectedValue}>
                {category ?
                  categories.find(cat => cat.value === category)?.label || "Select a craft category"
                  : "Select a craft category"
                }
              </span>
              <span style={{
                ...styles.chevron,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>
           
            {isOpen && (
              <div style={styles.dropdown}>
                {categories.map((cat) => (
                  <div
                    key={cat.value}
                    style={{
                      ...styles.option,
                      ...(category === cat.value ? styles.optionSelected : {})
                    }}
                    onClick={() => {
                      setCategory(cat.value);
                      setIsOpen(false);
                    }}
                  >
                    <span style={styles.optionIcon}>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Price Range Selection */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            <span style={styles.labelIcon}>💰</span>
            Price Range
          </label>
          <div style={styles.priceGrid}>
            {priceRanges.map((range) => (
              <div
                key={range.value}
                style={{
                  ...styles.priceCard,
                  ...(price === range.value ? styles.priceCardSelected : {})
                }}
                onClick={() => setPrice(range.value)}
              >
                <div style={styles.priceLabel}>{range.label}</div>
                <div style={styles.priceCheckmark}>
                  {price === range.value && "✓"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search/Filter Button */}
        <div style={styles.actionSection}>
          <button
            style={{
              ...styles.searchButton,
              ...((!category || !price) ? styles.searchButtonDisabled : {})
            }}
            disabled={!category || !price}
          >
            <span style={styles.buttonIcon}>🔍</span>
            <span>Discover Artisan Works</span>
          </button>
         
          {(category || price) && (
            <button
              style={styles.clearButton}
              onClick={() => {
                setCategory("");
                setPrice("");
                setIsOpen(false);
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Selected Filters Display */}
        {(category || price) && (
          <div style={styles.filtersDisplay}>
            <div style={styles.filtersTitle}>Active Filters:</div>
            <div style={styles.filterTags}>
              {category && (
                <span style={styles.filterTag}>
                  {categories.find(cat => cat.value === category)?.icon}
                  {categories.find(cat => cat.value === category)?.label.split(' ').slice(1).join(' ')}
                </span>
              )}
              {price && (
                <span style={styles.filterTag}>
                  💰 {priceRanges.find(p => p.value === price)?.label}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #fff8f0 0%, #f5ede3 50%, #e9dbc6 100%)',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
  },
 
  formWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'rgba(255, 248, 240, 0.95)',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(212, 180, 131, 0.3)',
    borderRadius: '30px',
    padding: '3rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    position: 'relative' as const,
  },

  header: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },

  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    fontWeight: '700' as const,
    color: '#6b4226',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #6b4226, #a0522d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subtitle: {
    fontSize: '1.2rem',
    color: '#6b4226',
    opacity: 0.8,
    fontWeight: '300' as const,
  },

  inputGroup: {
    marginBottom: '2.5rem',
  },

  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
    fontWeight: '600' as const,
    color: '#6b4226',
    marginBottom: '1rem',
    fontFamily: "'Playfair Display', serif",
  },

  labelIcon: {
    marginRight: '0.5rem',
    fontSize: '1.2rem',
  },

  customSelect: {
    position: 'relative' as const,
  },

  selectButton: {
    width: '100%',
    padding: '1.2rem 1.5rem',
    background: 'linear-gradient(135deg, #fff8f0, #f5ede3)',
    border: '2px solid rgba(201, 164, 107, 0.3)',
    borderRadius: '15px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    color: '#6b4226',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  },

  selectButtonOpen: {
    borderColor: '#c9a46b',
    boxShadow: '0 8px 25px rgba(201, 164, 107, 0.2)',
  },

  selectedValue: {
    flex: 1,
  },

  chevron: {
    transition: 'transform 0.3s ease',
    fontSize: '0.8rem',
    opacity: 0.7,
  },

  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(255, 248, 240, 0.98)',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(201, 164, 107, 0.3)',
    borderRadius: '15px',
    marginTop: '0.5rem',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    maxHeight: '300px',
    overflowY: 'auto' as const,
  },

  option: {
    padding: '1rem 1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid rgba(201, 164, 107, 0.1)',
  },

  optionSelected: {
    background: 'linear-gradient(135deg, #c9a46b, #d2b48c)',
    color: 'white',
  },

  optionIcon: {
    marginRight: '0.75rem',
    fontSize: '1.1rem',
  },

  priceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },

  priceCard: {
    padding: '1.2rem',
    background: 'linear-gradient(135deg, #fff8f0, #f5ede3)',
    border: '2px solid rgba(201, 164, 107, 0.3)',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  },

  priceCardSelected: {
    background: 'linear-gradient(135deg, #c9a46b, #d2b48c)',
    color: 'white',
    borderColor: '#b8935a',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(201, 164, 107, 0.3)',
  },

  priceLabel: {
    fontWeight: '600' as const,
    fontSize: '1rem',
  },

  priceCheckmark: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as const,
  },

  actionSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '2rem',
  },

  searchButton: {
    padding: '1.2rem 3rem',
    background: 'linear-gradient(135deg, #c9a46b, #d2b48c)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 8px 25px rgba(201, 164, 107, 0.3)',
  },

  searchButtonDisabled: {
    background: 'rgba(201, 164, 107, 0.3)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },

  buttonIcon: {
    fontSize: '1.1rem',
  },

  clearButton: {
    padding: '0.8rem 2rem',
    background: 'transparent',
    color: '#6b4226',
    border: '2px solid rgba(107, 66, 38, 0.3)',
    borderRadius: '25px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  filtersDisplay: {
    background: 'rgba(233, 219, 198, 0.5)',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '1px solid rgba(201, 164, 107, 0.2)',
  },

  filtersTitle: {
    fontSize: '0.9rem',
    fontWeight: '600' as const,
    color: '#6b4226',
    marginBottom: '0.75rem',
    fontFamily: "'Playfair Display', serif",
  },

  filterTags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
  },

  filterTag: {
    background: 'linear-gradient(135deg, #c9a46b, #d2b48c)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500' as const,
  },
};

export default CategoryPriceForm;