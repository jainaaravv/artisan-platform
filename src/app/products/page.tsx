"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number | null;
  images: string | string[];
  transcript: string;
  translations: Record<string, string> | null;
  artisan_name: string;
  artisan_language: string;
  blurb: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<object | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from<Product>("products")
        .select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data ?? []);
      }
      setLoading(false);
    }

    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
      } else {
        setUser(data.session?.user ?? null);
      }
    }

    fetchProducts();
    getSession();
  }, []);

  const allCategories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory);

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
    borderRadius: 24,
    padding: 24,
    border: "1px solid rgba(245, 158, 11, 0.2)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
    marginBottom: 32,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  };

  const categoryButton = (active: boolean): React.CSSProperties => ({
    padding: "0.75rem 1.5rem",
    background: active ? "linear-gradient(135deg, #f59e0b, #d97706)" : "rgba(0, 0, 0, 0.3)",
    color: active ? "#fff" : "#fbbf24",
    border: active ? "none" : "1px solid rgba(245, 158, 11, 0.3)",
    borderRadius: 9999,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  });

  const productCardStyle = (hover: boolean): React.CSSProperties => ({
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(20px)",
    borderRadius: 24,
    border: "1px solid rgba(245, 158, 11, 0.2)",
    boxShadow: hover ? "0 30px 60px rgba(245,158,11,0.2)" : "0 20px 40px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
    transform: hover ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
    overflow: "hidden",
    position: "relative",
  });

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: 250,
    objectFit: "cover",
    borderRadius: "1rem 1rem 0 0",
  };

  const priceTagStyle: React.CSSProperties = {
    position: "absolute",
    top: 8,
    right: 8,
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
  };

  const artisanInfoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#fbbf24",
    fontSize: 14,
    marginTop: 8,
  };

  const translationStyle: React.CSSProperties = {
    background: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "#fff",
          fontSize: 18,
        }}>
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ padding: 32, maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: "bold", color: "#fff", margin: 0 }}>Artisan Marketplace</h1>
            <p style={{ color: "#fbbf24", fontSize: 16, marginTop: 4 }}>Discover authentic handcrafted treasures from skilled artisans</p>
          </div>
          {user && (
            <button
              onClick={() => router.push("/profile")}
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: 9999,
                padding: 12,
                color: "#fbbf24",
                cursor: "pointer",
                fontSize: 24,
                transition: "all 0.3s ease",
              }}
            >
              👤
            </button>
          )}
        </div>

        {/* Category filters */}
        <div style={{ margin: "16px 0", padding: "16px", backdropFilter: "blur(10px)", borderRadius: 24, background: "rgba(0, 0, 0, 0.3)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={categoryButton(category === selectedCategory)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {filteredProducts.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", color: "#fbbf24", fontSize: 20, padding: 32 }}>
              No products found.
            </div>
          )}

          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={productCardStyle(hoveredCard === product.id)}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ position: "relative" }}>
                {Array.isArray(product.images) ? (
                  product.images.map((img, idx) => (
                    <img key={idx} src={img} alt={product.title} style={imageStyle} />
                  ))
                ) : (
                  <img src={product.images} alt={product.title} style={imageStyle} />
                )}
                <div style={priceTagStyle}>
                  ₹{product.price?.toLocaleString() ?? "N/A"}
                </div>
                <button title="Favorite" style={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "none",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                  color: "#fbbf24",
                  backdropFilter: "blur(10px)",
                  fontSize: 20,
                  transition: "all 0.3s ease",
                }}>
                  ♥
                </button>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 600,
                  margin: 0,
                  marginBottom: 8,
                  fontFamily: "'Playfair Display', serif",
                }}>
                  {product.title}
                </h3>
                <div style={{
                  color: "#fbbf24",
                  fontWeight: 500,
                  marginBottom: 8,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  fontSize: 14,
                }}>
                  {product.category}
                </div>
                <p style={{
                  color: "#fbbf24",
                  marginTop: 0,
                  marginBottom: 8,
                  opacity: 0.9,
                }}>
                  {product.blurb}
                </p>
                <div style={{ ...artisanInfoStyle }}>
                  <span>👤 {product.artisan_name}</span> <span style={{opacity: 0.7}}>({product.artisan_language})</span>
                </div>
                {product.translations && (
                  <div style={{...translationStyle, marginTop: 12}}>
                    <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
                      {Object.keys(product.translations).map(lang => (
                        <span key={lang} style={{
                          background: "rgba(245, 158, 11, 0.1)",
                          color: "#fbbf24",
                          padding: "2px 6px",
                          borderRadius: 12,
                          fontSize: 12,
                        }}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product.transcript && (
                  <div style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(245, 158, 11, 0.1)",
                    borderRadius: 12,
                    padding: 12,
                    marginTop: 12,
                  }}>
                    <strong style={{color: "#fbbf24", fontSize: 13}}>
                      🗣 <p>{`Artisan's Story`}</p>
                    </strong>
                    <p style={{
                      margin: 0,
                      marginTop: 4,
                      color: "#fbbf24",
                      opacity: 0.85,
                      fontSize: 13,
                      lineHeight: 1.5,
                      maxHeight: 150,
                      overflowY: "auto",
                    }}>
                      {product.transcript.length > 100 ? product.transcript.substring(0, 100) + "..." : product.transcript}
                    </p>
                  </div>
                )}
                <div style={{marginTop: 16, display: "flex", gap: 12}}>
                  <button style={{
                    flex: 1,
                    padding: "12px",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    borderRadius: 12,
                    fontWeight: 500,
                    color: "#fff",
                    fontSize: 16,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}>
                    View Details
                  </button>
                  <button style={{
                    padding: "12px",
                    borderRadius: 12,
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    fontSize: 24,
                    color: "#fbbf24",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}>
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
