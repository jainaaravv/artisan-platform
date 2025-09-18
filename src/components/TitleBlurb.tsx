import React from "react";

interface Props {
  transcript: string;
  title: string;
  setTitle: (text: string) => void;
  blurb: string;
  setBlurb: (text: string) => void;
  maxBlurbLength?: number;
}

const TitleBlurb: React.FC<Props> = ({
  transcript = "",
  title = "",
  setTitle,
  blurb = "",
  setBlurb,
  maxBlurbLength = 300,
}) => {
  const suggestBlurb = () => {
    const s = transcript?.trim();
    if (!s) return;
    const candidate = s.slice(0, maxBlurbLength);
    setBlurb(candidate + (s.length > maxBlurbLength ? "..." : ""));
  };

  const generateTitleFromTranscript = () => {
    const s = transcript?.trim();
    if (!s) return;
    const sentenceMatch = s.match(/^[^.!?]*[.!?]/);
    const base = sentenceMatch ? sentenceMatch[0] : s.split("\n")[0] || s;
    const words = base.split(/\s+/).slice(0, 6).join(" ");
    const cleaned = words.replace(/[^a-zA-Z0-9\s:,-]/g, "").trim();
    setTitle(cleaned || base.slice(0, 60));
  };

  const safeBlurb = blurb || "";
  const safeTitle = title || "";

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(135deg, #fff8f0 0%, #f5ede3 50%, #ebe2d4 100%)",
      minHeight: "100vh",
      padding: "2rem"
    }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>
      
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        background: "linear-gradient(135deg, #fff8f0 0%, #f5ede3 50%, #ebe2d4 100%)",
        border: "2px solid rgba(201, 164, 107, 0.2)",
        borderRadius: "24px",
        padding: "2.5rem",
        boxShadow: "0 12px 40px rgba(107, 66, 38, 0.08), 0 4px 15px rgba(201, 164, 107, 0.15)",
        position: "relative",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease"
      }}>
        {/* Top accent line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #c9a46b, #d2b48c, #c9a46b)",
          borderRadius: "24px 24px 0 0"
        }}></div>

        {/* Header */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.8rem",
          fontWeight: "600",
          color: "#6b4226",
          textAlign: "center",
          marginBottom: "2rem",
          position: "relative"
        }}>
          🌿 Craft Your Story 🌿
        </h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem"
        }}>
          {/* Title Section */}
          <div>
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#5c3a21",
              marginBottom: "0.75rem",
              display: "block",
              letterSpacing: "0.3px"
            }}>
              ✍️ Title
            </label>
            
            <input
              aria-label="Title"
              value={safeTitle}
              onChange={(e) => setTitle(e.target.value || "")}
              placeholder="Give your creation a beautiful name..."
              style={{
                width: "100%",
                borderRadius: "16px",
                border: "2px solid rgba(201, 164, 107, 0.3)",
                background: "linear-gradient(135deg, rgba(255, 248, 240, 0.9), rgba(245, 237, 227, 0.9))",
                padding: "1rem 1.25rem",
                fontSize: "0.95rem",
                color: "#3b2f2f",
                transition: "all 0.3s ease",
                backdropFilter: "blur(5px)",
                fontFamily: "'Inter', sans-serif",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#c9a46b";
                e.target.style.background = "rgba(255, 248, 240, 1)";
                e.target.style.boxShadow = "0 4px 15px rgba(201, 164, 107, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(201, 164, 107, 0.3)";
                e.target.style.background = "linear-gradient(135deg, rgba(255, 248, 240, 0.9), rgba(245, 237, 227, 0.9))";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "1rem",
              alignItems: "center"
            }}>
              <button
                type="button"
                onClick={generateTitleFromTranscript}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  background: "linear-gradient(135deg, #c9a46b, #d2b48c)",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(201, 164, 107, 0.3)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.3px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #b8935a, #c9a46b)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(201, 164, 107, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #c9a46b, #d2b48c)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(201, 164, 107, 0.3)";
                }}
              >
                🎨 Generate title
              </button>

              <button
                type="button"
                onClick={() => setTitle("")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  background: "rgba(255, 248, 240, 0.8)",
                  color: "#6b4226",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  border: "2px solid rgba(201, 164, 107, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.2px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(201, 164, 107, 0.1)";
                  e.currentTarget.style.borderColor = "#c9a46b";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(201, 164, 107, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 248, 240, 0.8)";
                  e.currentTarget.style.borderColor = "rgba(201, 164, 107, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                🗑️ Clear
              </button>

              <span style={{
                color: "rgba(107, 66, 38, 0.7)",
                fontSize: "0.75rem",
                fontStyle: "italic",
                fontFamily: "'Inter', sans-serif",
                marginLeft: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem"
              }}>
                💡 Keep it short & memorable
              </span>
            </div>
          </div>

          {/* Section divider */}
          <div style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(201, 164, 107, 0.3), transparent)",
            margin: "1rem 0",
            borderRadius: "1px"
          }}></div>

          {/* Blurb Section */}
          <div>
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#5c3a21",
              marginBottom: "0.75rem",
              display: "block",
              letterSpacing: "0.3px"
            }}>
              📝 Story Description
            </label>
            
            <textarea
              aria-label="Blurb"
              value={safeBlurb}
              onChange={(e) => {
                const newValue = e.target.value || "";
                if (newValue.length <= maxBlurbLength) {
                  setBlurb(newValue);
                } else {
                  setBlurb(newValue.slice(0, maxBlurbLength));
                }
              }}
              placeholder="Share the story behind your craft, the inspiration, the journey..."
              rows={5}
              style={{
                width: "100%",
                borderRadius: "16px",
                border: "2px solid rgba(201, 164, 107, 0.3)",
                background: "linear-gradient(135deg, rgba(255, 248, 240, 0.9), rgba(245, 237, 227, 0.9))",
                padding: "1rem 1.25rem",
                fontSize: "0.95rem",
                color: "#3b2f2f",
                resize: "none",
                transition: "all 0.3s ease",
                backdropFilter: "blur(5px)",
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#c9a46b";
                e.target.style.background = "rgba(255, 248, 240, 1)";
                e.target.style.boxShadow = "0 4px 15px rgba(201, 164, 107, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(201, 164, 107, 0.3)";
                e.target.style.background = "linear-gradient(135deg, rgba(255, 248, 240, 0.9), rgba(245, 237, 227, 0.9))";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "1rem",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap"
              }}>
                {transcript && (
                  <button
                    type="button"
                    onClick={suggestBlurb}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "25px",
                      background: "linear-gradient(135deg, rgba(184, 147, 90, 0.15), rgba(201, 164, 107, 0.15))",
                      color: "#8b5a3c",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      border: "2px solid rgba(184, 147, 90, 0.3)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.2px"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(184, 147, 90, 0.25), rgba(201, 164, 107, 0.25))";
                      e.currentTarget.style.borderColor = "#b8935a";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(184, 147, 90, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(184, 147, 90, 0.15), rgba(201, 164, 107, 0.15))";
                      e.currentTarget.style.borderColor = "rgba(184, 147, 90, 0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    ✨ Inspire from transcript
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => setBlurb("")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "25px",
                    background: "rgba(255, 248, 240, 0.8)",
                    color: "#6b4226",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    border: "2px solid rgba(201, 164, 107, 0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.2px"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(201, 164, 107, 0.1)";
                    e.currentTarget.style.borderColor = "#c9a46b";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(201, 164, 107, 0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(255, 248, 240, 0.8)";
                    e.currentTarget.style.borderColor = "rgba(201, 164, 107, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  🗑️ Clear
                </button>
              </div>

              <div style={{
                fontSize: "0.75rem",
                color: "rgba(107, 66, 38, 0.6)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "500"
              }}>
                <span style={{
                  color: "#8b5a3c",
                  fontWeight: "600"
                }}>{safeBlurb.length}</span>
                <span style={{
                  opacity: "0.6"
                }}>/{maxBlurbLength}</span>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.875rem",
              color: "#8b5a3c",
              marginBottom: "0.75rem",
              fontWeight: "500",
              letterSpacing: "0.3px"
            }}>
              🎭 Live Preview
            </div>
            
            <div style={{
              background: "linear-gradient(135deg, rgba(92, 58, 33, 0.05), rgba(107, 66, 38, 0.08))",
              border: "2px dashed rgba(201, 164, 107, 0.4)",
              borderRadius: "20px",
              padding: "1.5rem",
              backdropFilter: "blur(5px)",
              position: "relative",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#c9a46b";
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(92, 58, 33, 0.08), rgba(107, 66, 38, 0.12))";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(201, 164, 107, 0.4)";
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(92, 58, 33, 0.05), rgba(107, 66, 38, 0.08))";
            }}
            >
              <div style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontSize: "1rem",
                opacity: "0.6"
              }}>✨</div>
              
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#5c3a21",
                marginBottom: "0.75rem",
                lineHeight: "1.4"
              }}>
                {safeTitle || "Your masterpiece title will appear here"}
              </h3>
              
              <p style={{
                fontSize: "0.875rem",
                color: "#6b4226",
                lineHeight: "1.6",
                opacity: "0.9",
                fontFamily: "'Inter', sans-serif"
              }}>
                {safeBlurb || "Your beautiful story and craft description will be displayed here, telling the world about your artistic journey and heritage..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBlurb;