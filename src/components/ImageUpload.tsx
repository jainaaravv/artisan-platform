import React, { useRef, useState, useCallback } from "react";

interface Props {
  images: string[];
  setImages: (images: string[]) => void;
}

const ImageUpload: React.FC<Props> = ({ images, setImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = useCallback((files: FileList) => {
    setUploading(true);
    const newImages: string[] = [];
   
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImages([...images, ...newImages]);
              setUploading(false);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, [images, setImages]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setImages(newImages);
  };

  return (
    <div style={styles.container}>
      <div style={styles.uploadWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>📸 Showcase Your Artisan Crafts</h2>
          <p style={styles.subtitle}>Upload beautiful images of your handmade creations to attract customers</p>
        </div>

        {/* Upload Area */}
        <div
          style={{
            ...styles.uploadZone,
            ...(isDragOver ? styles.uploadZoneDragOver : {}),
            ...(images.length > 0 ? styles.uploadZoneWithImages : {})
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={styles.hiddenInput}
            onChange={(e) => {
              if (e.target.files) {
                handleFileSelect(e.target.files);
              }
            }}
          />

          {images.length === 0 ? (
            <div style={styles.uploadContent}>
              <div style={styles.uploadIcon}>🎨</div>
              <h3 style={styles.uploadTitle}>Drop your craft images here</h3>
              <p style={styles.uploadText}>
                or <span style={styles.uploadLink}>click to browse</span> your gallery
              </p>
              <div style={styles.uploadHints}>
                <div style={styles.hint}>
                  <span style={styles.hintIcon}>📏</span>
                  High quality images (1080p+) recommended
                </div>
                <div style={styles.hint}>
                  <span style={styles.hintIcon}>🖼️</span>
                  Multiple angles showcase your craft better
                </div>
                <div style={styles.hint}>
                  <span style={styles.hintIcon}>💡</span>
                  Good lighting highlights fine details
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.addMoreSection}>
              <div style={styles.addMoreIcon}>➕</div>
              <span style={styles.addMoreText}>Add more images</span>
            </div>
          )}

          {uploading && (
            <div style={styles.uploadingOverlay}>
              <div style={styles.spinner}></div>
              <p style={styles.uploadingText}>Processing your beautiful crafts...</p>
            </div>
          )}
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div style={styles.gallerySection}>
            <div style={styles.galleryHeader}>
              <h3 style={styles.galleryTitle}>
                🖼️ Your Craft Portfolio ({images.length} {images.length === 1 ? 'image' : 'images'})
              </h3>
              <p style={styles.gallerySubtext}>Drag images to reorder • Click ✕ to remove</p>
            </div>

            <div style={styles.imageGrid}>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.imageCard,
                    ...(index === 0 ? styles.featuredImage : {})
                  }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', index.toString());
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    reorderImages(fromIndex, index);
                  }}
                >
                  {index === 0 && (
                    <div style={styles.featuredBadge}>
                      <span style={styles.featuredIcon}>⭐</span>
                      Featured
                    </div>
                  )}
                 
                  <img src={image} alt={`Craft ${index + 1}`} style={styles.image} />
                 
                  <div style={styles.imageOverlay}>
                    <button
                      style={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                    >
                      ✕
                    </button>
                   
                    <div style={styles.imageNumber}>
                      {index + 1}
                    </div>
                  </div>

                  <div style={styles.imageActions}>
                    <button style={styles.actionButton}>
                      🔍 Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Stats */}
            <div style={styles.galleryStats}>
              <div style={styles.stat}>
                <span style={styles.statIcon}>📊</span>
                <span style={styles.statLabel}>Portfolio Quality:</span>
                <span style={styles.statValue}>
                  {images.length >= 5 ? 'Excellent' :
                   images.length >= 3 ? 'Good' :
                   images.length >= 1 ? 'Fair' : 'Poor'}
                </span>
              </div>
             
              <div style={styles.stat}>
                <span style={styles.statIcon}>👁️</span>
                <span style={styles.statLabel}>Customer Appeal:</span>
                <div style={styles.appealBar}>
                  <div
                    style={{
                      ...styles.appealFill,
                      width: `${Math.min((images.length / 5) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div style={styles.tipsSection}>
              <h4 style={styles.tipsTitle}>💡 Pro Tips for Better Sales</h4>
              <div style={styles.tips}>
                <div style={styles.tip}>
                  <span style={styles.tipIcon}>🌟</span>
                  First image becomes your featured showcase - make it count!
                </div>
                <div style={styles.tip}>
                  <span style={styles.tipIcon}>📐</span>
                  Show scale by including everyday objects for size reference
                </div>
                <div style={styles.tip}>
                  <span style={styles.tipIcon}>🎭</span>
                  Capture the story - show your craft in use or being made
                </div>
                <div style={styles.tip}>
                  <span style={styles.tipIcon}>🏆</span>
                  5+ quality images increase customer confidence by 80%
                </div>
              </div>
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

  uploadWrapper: {
    maxWidth: '900px',
    margin: '0 auto',
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

  uploadZone: {
    background: 'rgba(255, 248, 240, 0.95)',
    backdropFilter: 'blur(15px)',
    border: '3px dashed rgba(201, 164, 107, 0.4)',
    borderRadius: '25px',
    padding: '3rem',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    marginBottom: '2rem',
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadZoneDragOver: {
    borderColor: '#c9a46b',
    background: 'rgba(201, 164, 107, 0.1)',
    transform: 'scale(1.02)',
    boxShadow: '0 15px 35px rgba(201, 164, 107, 0.2)',
  },

  uploadZoneWithImages: {
    minHeight: '150px',
    padding: '2rem',
  },

  hiddenInput: {
    display: 'none',
  },

  uploadContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1.5rem',
  },

  uploadIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },

  uploadTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#6b4226',
    margin: 0,
  },

  uploadText: {
    fontSize: '1.1rem',
    color: '#6b4226',
    opacity: 0.7,
  },

  uploadLink: {
    color: '#c9a46b',
    fontWeight: '600' as const,
    textDecoration: 'underline',
  },

  uploadHints: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.8rem',
    marginTop: '1rem',
  },

  hint: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#6b4226',
    opacity: 0.8,
  },

  hintIcon: {
    fontSize: '1.1rem',
  },

  addMoreSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: '#6b4226',
    fontSize: '1.1rem',
    fontWeight: '500' as const,
  },

  addMoreIcon: {
    fontSize: '2rem',
    color: '#c9a46b',
  },

  addMoreText: {
    fontFamily: "'Playfair Display', serif",
  },

  uploadingOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 248, 240, 0.95)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25px',
  },

  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(201, 164, 107, 0.3)',
    borderTop: '4px solid #c9a46b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  uploadingText: {
    marginTop: '1rem',
    color: '#6b4226',
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.1rem',
  },

  gallerySection: {
    background: 'rgba(255, 248, 240, 0.95)',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(212, 180, 131, 0.3)',
    borderRadius: '25px',
    padding: '2rem',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
  },

  galleryHeader: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },

  galleryTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.8rem',
    color: '#6b4226',
    margin: '0 0 0.5rem 0',
  },

  gallerySubtext: {
    fontSize: '0.9rem',
    color: '#6b4226',
    opacity: 0.7,
  },

  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },

  imageCard: {
    position: 'relative' as const,
    borderRadius: '15px',
    overflow: 'hidden',
    cursor: 'grab',
    transition: 'all 0.3s ease',
    border: '3px solid rgba(201, 164, 107, 0.3)',
    background: 'white',
  },

  featuredImage: {
    gridColumn: 'span 2',
    border: '3px solid #c9a46b',
    boxShadow: '0 8px 25px rgba(201, 164, 107, 0.3)',
  },

  featuredBadge: {
    position: 'absolute' as const,
    top: '10px',
    left: '10px',
    background: 'linear-gradient(135deg, #c9a46b, #d2b48c)',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: '600' as const,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },

  featuredIcon: {
    fontSize: '0.9rem',
  },

  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease',
  },

  imageOverlay: {
    position: 'absolute' as const,
    top: 0,
    right: 0,
    padding: '10px',
    display: 'flex',
    gap: '0.5rem',
  },

  removeButton: {
    background: 'rgba(255, 0, 0, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold' as const,
    transition: 'all 0.2s ease',
  },

  imageNumber: {
    background: 'rgba(107, 66, 38, 0.8)',
    color: 'white',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold' as const,
  },

  imageActions: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    padding: '1rem',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease',
  },

  actionButton: {
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.8rem',
    color: '#6b4226',
    fontWeight: '500' as const,
  },

  galleryStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'rgba(233, 219, 198, 0.5)',
    borderRadius: '15px',
  },

  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  statIcon: {
    fontSize: '1.2rem',
  },

  statLabel: {
    fontSize: '0.9rem',
    color: '#6b4226',
    fontWeight: '500' as const,
  },

  statValue: {
    fontSize: '0.9rem',
    color: '#c9a46b',
    fontWeight: '600' as const,
  },

  appealBar: {
    flex: 1,
    height: '8px',
    background: 'rgba(201, 164, 107, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginLeft: '0.5rem',
  },

  appealFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #c9a46b, #d2b48c)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },

  tipsSection: {
    background: 'rgba(245, 237, 227, 0.8)',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '1px solid rgba(201, 164, 107, 0.2)',
  },

  tipsTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem',
    color: '#6b4226',
    marginBottom: '1rem',
  },

  tips: {
    display: 'grid',
    gap: '0.8rem',
  },

  tip: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem',
    fontSize: '0.9rem',
    color: '#6b4226',
    lineHeight: 1.5,
  },

  tipIcon: {
    fontSize: '1.1rem',
    marginTop: '0.1rem',
  },
};

// Add CSS animation for spinner
const spinKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Inject the keyframes
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = spinKeyframes;
  document.head.appendChild(styleSheet);
}

export default ImageUpload;