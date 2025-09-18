// src/app/products/page.tsx
"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images: string | string[];
  transcript: string;
  translations: any;
  artisan_name: string;
  artisan_language: string;
  blurb: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      let { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    async function getSession() {
      let { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
      } else {
        setUser(data?.session?.user || null);
      }
    }

    fetchProducts();
    getSession();
  }, []);

  // Get unique categories from products
  const allCategories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  function goToProfile() {
    router.push("/profile");
  }

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #78350f 0%, #1c1917 50%, #78350f 100%)",
    position: "relative",
    overflow: "hidden",
  };

  const headerStyle: React.CSSProperties = {
    background: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(20px)",
    borderRadius: "1.5rem",
    padding: "2rem",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const categoryButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "0.75rem 1.5rem",
    background: isActive 
      ? "linear-gradient(135deg, #f59e0b, #d97706)" 
      : "rgba(0, 0, 0, 0.3)",
    color: isActive ? "white" : "#fbbf24",
    border: isActive ? "none" : "1px solid rgba(245, 158, 11, 0.3)",
    borderRadius: "2rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 500,
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  });

  const productCardStyle = (isHovered: boolean): React.CSSProperties => ({
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(20px)",
    borderRadius: "1.5rem",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    boxShadow: isHovered 
      ? "0 30px 60px rgba(245, 158, 11, 0.2)" 
      : "0 20px 40px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
    overflow: "hidden",
    position: "relative" as const,
  });

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "1rem 1rem 0 0",
  };

  const priceTagStyle: React.CSSProperties = {
    position: "absolute" as const,
    top: "1rem",
    right: "1rem",
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    fontSize: "1.1rem",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
  };

  const artisanInfoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#fbbf24",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  };

  const translationStyle: React.CSSProperties = {
    background: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    borderRadius: "0.75rem",
    padding: "0.75rem",
    marginTop: "1rem",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "100vh",
          color: "#fef3c7",
          fontSize: "1.5rem",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              fontSize: "3rem", 
              marginBottom: "1rem",
              animation: "spin 2s linear infinite",
            }}>🌀</div>
            Loading beautiful crafts...
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ padding: "2rem", maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ 
              fontSize: "clamp(2rem, 4vw, 3rem)", 
              fontWeight: "bold", 
              color: "#fef3c7", 
              fontFamily: "serif",
              marginBottom: "0.5rem",
              margin: 0,
            }}>
               Artisan Marketplace
            </h1>
            <p style={{ 
              color: "#fbbf24", 
              fontSize: "1.1rem", 
              opacity: 0.9,
              margin: "0.5rem 0 0 0",
            }}>
              Discover authentic handcrafted treasures from skilled artisans
            </p>
          </div>
          {user && (
            <button
              onClick={goToProfile}
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "1rem",
                padding: "1rem",
                color: "#fbbf24",
                cursor: "pointer",
                fontSize: "1.5rem",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "rgba(245, 158, 11, 0.2)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              title="My Profile"
            >
              👤
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div style={{
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(20px)",
          borderRadius: "1.5rem",
          padding: "1.5rem",
          border: "1px solid rgba(245, 158, 11, 0.2)",
          marginBottom: "2rem",
        }}>
          <h3 style={{ 
            color: "#fef3c7", 
            marginBottom: "1rem", 
            fontSize: "1.2rem",
            fontWeight: 600,
            margin: "0 0 1rem 0",
          }}>
            🎨 Browse by Category
          </h3>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "0.75rem" 
          }}>
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={categoryButtonStyle(selectedCategory === category)}
                onMouseOver={e => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = "rgba(245, 158, 11, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseOut={e => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
          gap: "2rem" 
        }}>
          {filteredProducts.length === 0 && (
            <div style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#fbbf24",
              fontSize: "1.2rem",
              padding: "3rem",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              No products found in this category
            </div>
          )}
          
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={productCardStyle(hoveredCard === product.id)}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Product Image */}
              <div style={{ position: "relative" }}>
                {Array.isArray(product.images)
                  ? product.images.map((img: string, i: number) => (
                      <img key={i} src={img} alt={product.title} style={imageStyle} />
                    ))
                  : (
                    <img src={product.images} alt={product.title} style={imageStyle} />
                  )}
                <div style={priceTagStyle}>₹{product.price?.toLocaleString() || 'N/A'}</div>
                
                {/* Favorite Button */}
                <button style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "rgba(0, 0, 0, 0.5)",
                  border: "none",
                  borderRadius: "50%",
                  width: "2.5rem",
                  height: "2.5rem",
                  cursor: "pointer",
                  color: "#fbbf24",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  fontSize: "1.2rem",
                }}>
                  ♥
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ 
                  color: "#fef3c7", 
                  fontSize: "1.4rem", 
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  fontFamily: "serif",
                  margin: "0 0 0.5rem 0",
                }}>
                  {product.title}
                </h3>
                
                <div style={{
                  background: "linear-gradient(90deg, #f59e0b, #d97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  marginBottom: "1rem",
                }}>
                  {product.category}
                </div>

                <p style={{ 
                  color: "#fbbf24", 
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  opacity: 0.9,
                  margin: "0 0 1rem 0",
                }}>
                  {product.blurb}
                </p>

                {/* Artisan Info */}
                <div style={artisanInfoStyle}>
                  <span style={{ fontSize: "1rem" }}>👤</span>
                  <span>{product.artisan_name}</span>
                  <span style={{ color: "#fbbf24", opacity: 0.7 }}>
                    ({product.artisan_language})
                  </span>
                </div>

                {/* Star Rating */}
                <div style={{ 
                  display: "flex", 
                  gap: "0.2rem", 
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                  alignItems: "center",
                }}>
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        color: i < 4 ? "#f59e0b" : "#6b7280",
                        fontSize: "1rem",
                      }} 
                    >
                      ★
                    </span>
                  ))}
                  <span style={{ 
                    color: "#fbbf24", 
                    fontSize: "0.8rem", 
                    marginLeft: "0.5rem" 
                  }}>
                    4.8 (24 reviews)
                  </span>
                </div>

                {/* Translation Preview */}
                {product.translations && (
                  <div style={translationStyle}>
                    <div style={{ 
                      color: "#fbbf24", 
                      fontSize: "0.8rem", 
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}>
                      <span style={{ fontSize: "1rem" }}>💬</span>
                      Available in multiple languages
                    </div>
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: "0.5rem" 
                    }}>
                      {Object.keys(product.translations).map(lang => (
                        <span key={lang} style={{
                          background: "rgba(245, 158, 11, 0.2)",
                          color: "#fbbf24",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "0.5rem",
                          fontSize: "0.7rem",
                        }}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transcript Preview */}
                {product.transcript && (
                  <div style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(245, 158, 11, 0.1)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem",
                    marginTop: "1rem",
                  }}>
                    <div style={{ 
                      color: "#fbbf24", 
                      fontSize: "0.8rem", 
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}>
                      <span style={{ fontSize: "1rem" }}>🎙️</span>
                      Artisan's Story
                    </div>
                    <p style={{
                      color: "#fbbf24",
                      fontSize: "0.8rem",
                      opacity: 0.8,
                      lineHeight: 1.4,
                      margin: 0,
                    }}>
                      {product.transcript.length > 100 
                        ? `${product.transcript.substring(0, 100)}...`
                        : product.transcript
                      }
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ 
                  display: "flex", 
                  gap: "1rem", 
                  marginTop: "1.5rem" 
                }}>
                  <button style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "white",
                    border: "none",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(245, 158, 11, 0.3)";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    View Details
                  </button>
                  
                  <button style={{
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    color: "#fbbf24",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "1.2rem",
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "rgba(245, 158, 11, 0.1)";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.3)";
                  }}>
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "4rem",
          padding: "2rem",
          color: "#fbbf24",
          opacity: 0.7,
        }}>
          <p style={{ fontSize: "1.1rem", margin: 0 }}>
            ✨ Supporting artisans, preserving traditions ✨
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}