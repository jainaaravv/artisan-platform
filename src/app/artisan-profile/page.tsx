"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import TranscriptEditor from "../../components/TranscriptEditor";
import TranslationTabs from "../../components/TranslationTabs";
import TitleBlurb from "../../components/TitleBlurb";
import ImageUpload from "../../components/ImageUpload";
import CategoryPriceForm from "../../components/CategoryPriceForm";
import QRCodeGenerator from "../../components/QRCodeGenerator";
import WhatsAppShareButton from "../../components/WhatsAppShareButton";
import VoiceTranslator from "../../components/VoiceTranslator";

type Translations = { [key: string]: string };

export default function ArtisanProfilePage() {
  const [transcript, setTranscript] = useState<string>("");
  const [translations, setTranslations] = useState<Translations>({
    English: "",
    Hindi: "",
  });
  const [title, setTitle] = useState<string>("");
  const [blurb, setBlurb] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // INSERT a new artisan profile row (no upsert, no conflict)
    const { error: artisanError } = await supabase
      .from("artisan-profiles")
      .insert([{
        name,
        language,
      }]);
    if (artisanError) {
      alert("Error publishing profile: " + artisanError.message);
      setIsLoading(false);
      return;
    }
    // INSERT a new product row
    const { error: productError } = await supabase
      .from("products")
      .insert([{
        transcript,
        translations,
        title,
        category,
        price: price ? parseFloat(price) : null,
        artisan_name: name,
        artisan_language: language,
        images,
        blurb,
      }]);
    if (productError) {
      alert("Error publishing product: " + productError.message);
      setIsLoading(false);
      return;
    }
    setPublished(true);
    setIsLoading(false);
  };

  const profileUrl = `https://yourdomain.com/artisan-profile/${encodeURIComponent(name)}`;
  const shareMessage = `Check out this artisan product by ${name}: ${profileUrl}`;

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #78350f 0%, #1c1917 50%, #78350f 100%)",
    position: "relative",
    overflow: "hidden",
  };
  const cardStyle: React.CSSProperties = {
    background: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(20px)",
    borderRadius: "1.5rem",
    padding: "2rem",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
    marginBottom: "2rem",
  };
  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#fef3c7",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    fontFamily: "serif",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "1rem",
    background: "rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    borderRadius: "0.75rem",
    color: "#fef3c7",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
  };
  const buttonStyle: React.CSSProperties = {
    position: "relative",
    padding: "1rem 3rem",
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "white",
    fontSize: "1.25rem",
    fontWeight: 600,
    border: "none",
    borderRadius: "2rem",
    cursor: isLoading ? "not-allowed" : "pointer",
    boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    opacity: isLoading ? 0.7 : 1,
  };

  return (
    <div style={containerStyle}>
      <div style={{ padding: "2rem", maxWidth: "64rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: "bold", marginBottom: "1rem", color: "#fef3c7", fontFamily: "serif", letterSpacing: "0.05em" }}>
          🌿 Create Artisan Profile
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#fbbf24", opacity: 0.9, fontWeight: 300, marginBottom: "2rem" }}>
          Share your craft with the world through AI-powered storytelling
        </p>

        {/* Personal Info */}
        <section style={cardStyle}>
          <h2 style={sectionHeaderStyle}>👤 Personal Information</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", color: "#fbbf24", fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: 500 }}>Artisan Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "#fbbf24", fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: 500 }}>Preferred Language</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select a language</option>
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="marathi">मराठी (Marathi)</option>
                <option value="tamil">தமிழ் (Tamil)</option>
                <option value="telugu">తెలుగు (Telugu)</option>
                <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="bengali">বাংলা (Bengali)</option>
              </select>
            </div>
          </div>
        </section>
        
        <section style={cardStyle}>
          <h2 style={sectionHeaderStyle}>🎙️ Your Story & Voice</h2>
          <TranscriptEditor transcript={transcript} setTranscript={setTranscript} />
        </section>

        {/* Voice Translator Section BELOW TranscriptEditor */}
        <section style={cardStyle}>
          <h2 style={sectionHeaderStyle}>
            <span style={{ fontSize: "2rem", marginRight: "0.75rem" }}>🎤</span>
            Speak & Translate (Indian Languages to English)
          </h2>
          <VoiceTranslator />
        </section>

        <section style={cardStyle}>
          <h2 style={sectionHeaderStyle}>🌍 AI-Powered Translations</h2>
          <TranslationTabs translations={translations} setTranslations={setTranslations} />
        </section>
        <section style={cardStyle}>
          <h2 style={sectionHeaderStyle}>✨ Product Details</h2>
          <TitleBlurb transcript={transcript} title={title} setTitle={setTitle} blurb={blurb} setBlurb={setBlurb} />
          <CategoryPriceForm category={category} setCategory={setCategory} price={price} setPrice={setPrice} />
        </section>
        <section style={cardStyle}>
          <h2 style={sectionHeaderStyle}>📸 Showcase Your Craft</h2>
          <ImageUpload images={images} setImages={setImages} />
        </section>
        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={buttonStyle}
            onMouseOver={e => {
              const target = e.target as HTMLButtonElement;
              if (!isLoading) {
                target.style.transform = "translateY(-2px) scale(1.05)";
                target.style.boxShadow = "0 15px 40px rgba(245, 158, 11, 0.4)";
              }
            }}
            onMouseOut={e => {
              const target = e.target as HTMLButtonElement;
              if (!isLoading) {
                target.style.transform = "translateY(0) scale(1)";
                target.style.boxShadow = "0 10px 30px rgba(245, 158, 11, 0.3)";
              }
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Publishing...
              </>
            ) : (
              <>
                <span style={{ fontSize: "1.5rem" }}>🚀</span> Publish Your Craft
              </>
            )}
          </button>
        </div>
        {published && (
          <section
            style={{
              marginTop: "4rem",
              background: "linear-gradient(135deg, rgba(6, 78, 59, 0.5), rgba(6, 95, 70, 0.5))",
              borderRadius: "1.5rem",
              padding: "2rem",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              animation: "fadeIn 0.8s ease-out",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
              <h2 style={{
                fontSize: "2rem", fontWeight: "bold", color: "#d1fae5", marginBottom: "1rem", fontFamily: "serif"
              }}>
                Congratulations!
              </h2>
              <p style={{ fontSize: "1.25rem", color: "#a7f3d0" }}>
                Your artisan profile has been successfully published
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
              <div style={{
                background: "rgba(0, 0, 0, 0.4)", borderRadius: "1rem", padding: "1.5rem",
                border: "1px solid rgba(16, 185, 129, 0.2)", textAlign: "center",
              }}>
                <h3 style={{
                  fontSize: "1.25rem", fontWeight: 600, color: "#d1fae5",
                  marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>📱</span> QR Code
                </h3>
                <QRCodeGenerator url={profileUrl} />
                <p style={{
                  color: "#a7f3d0", fontSize: "0.875rem", marginTop: "1rem"
                }}>Scan to view your profile</p>
              </div>
              <div style={{
                background: "rgba(0, 0, 0, 0.4)", borderRadius: "1rem", padding: "1.5rem",
                border: "1px solid rgba(16, 185, 129, 0.2)", textAlign: "center",
              }}>
                <h3 style={{
                  fontSize: "1.25rem", fontWeight: 600, color: "#d1fae5", marginBottom: "1rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>📤</span> Share Your Story
                </h3>
                <WhatsAppShareButton message={shareMessage} />
                <p style={{
                  color: "#a7f3d0", fontSize: "0.875rem", marginTop: "1rem"
                }}>Share with friends and customers</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}