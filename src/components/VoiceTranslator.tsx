import React, { useState } from "react";
import axios from "axios";

// Fix: Add type declarations for browser SpeechRecognition APIs
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const TRANSLATE_API_URL = "https://libretranslate.de/translate";

const VoiceTranslator: React.FC = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [listening, setListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("hi"); // Default to Hindi
  const [error, setError] = useState("");

  const languages = [
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" }
  ];

  const startListening = () => {
    // Clear previous results
    setError("");
    setRecognizedText("");
    setTranslatedText("");

    // Ensure compatibility and type safety
    const SpeechRecognition =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage === "en" ? "en-US" : `${selectedLanguage}-IN`;
    recognition.continuous = false;
    recognition.interimResults = false;
   
    setListening(true);

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      setListening(false);
      setIsTranslating(true);

      try {
        const response = await axios.post(TRANSLATE_API_URL, {
          q: transcript,
          source: selectedLanguage,
          target: "en",
          format: "text",
        });
        setTranslatedText(response.data.translatedText);
      } catch (error) {
        setError("Translation failed. Please try again.");
        setTranslatedText("");
      } finally {
        setIsTranslating(false);
      }
    };

    recognition.onerror = (event: any) => {
      setListening(false);
      setError(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const clearResults = () => {
    setRecognizedText("");
    setTranslatedText("");
    setError("");
  };

  const speakText = (text: string, lang: string = "en") => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "en" ? "en-US" : `${lang}-IN`;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #78350f 0%, #1c1917 50%, #78350f 100%)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    padding: '2rem'
  };

  const patternOverlayStyle = {
    position: 'absolute' as const,
    inset: 0,
    opacity: 0.1,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4b483' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: '120px 120px'
  };

  const cardStyle = {
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    padding: '2rem',
    border: '1px solid rgba(245, 158, 11, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    background: listening
      ? 'linear-gradient(135deg, #dc2626, #b91c1c)'
      : 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600' as const,
    border: 'none',
    borderRadius: '2rem',
    cursor: 'pointer' as const,
    boxShadow: listening
      ? '0 10px 30px rgba(220, 38, 38, 0.3)'
      : '0 10px 30px rgba(245, 158, 11, 0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  const textAreaStyle = {
    width: '100%',
    minHeight: '120px',
    padding: '1.5rem',
    background: 'rgba(0, 0, 0, 0.6)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '1rem',
    color: '#fef3c7',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    resize: 'none' as const,
    outline: 'none',
    fontFamily: 'inherit'
  };

  const selectStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.6)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '1rem',
    color: '#fef3c7',
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer' as const
  };

  return (
    <div style={containerStyle}>
      <div style={patternOverlayStyle} />
     
      {/* Floating decorative elements */}
      <div style={{
        position: 'absolute',
        top: '5rem',
        left: '2.5rem',
        width: '4rem',
        height: '4rem',
        background: '#f59e0b',
        borderRadius: '50%',
        opacity: 0.2,
        animation: 'pulse 3s infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '8rem',
        right: '3rem',
        width: '3rem',
        height: '3rem',
        background: '#d97706',
        transform: 'rotate(45deg)',
        opacity: 0.15,
        animation: 'pulse 3s infinite 0.5s'
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '56rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#fef3c7',
            fontFamily: 'serif',
            letterSpacing: '0.05em'
          }}>
            🎤 Voice Translator
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#fbbf24',
            opacity: 0.9,
            fontWeight: '300'
          }}>
            Speak in your local language, get instant English translation
          </p>
          <div style={{
            width: '6rem',
            height: '0.25rem',
            background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
            margin: '1.5rem auto',
            borderRadius: '0.125rem'
          }} />
        </div>

        {/* Language Selection */}
        <div style={cardStyle}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#fef3c7',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'serif'
          }}>
            <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>🌍</span>
            Select Your Language
          </h2>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={selectStyle}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} style={{ background: '#1c1917' }}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Voice Input Section */}
        <div style={cardStyle}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#fef3c7',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'serif'
          }}>
            <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>🎙️</span>
            Voice Input
          </h2>
         
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {/* Microphone Visualization */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: listening
                ? 'radial-gradient(circle, rgba(220, 38, 38, 0.3), rgba(220, 38, 38, 0.1))'
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: listening
                ? '3px solid #dc2626'
                : '3px solid #f59e0b',
              transform: listening ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease',
              animation: listening ? 'pulse 1s infinite' : 'none'
            }}>
              <span style={{ fontSize: '3rem' }}>
                {listening ? '🔴' : '🎤'}
              </span>
            </div>

            {/* Control Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
              <button
                onClick={startListening}
                disabled={listening || isTranslating}
                style={{
                  ...buttonStyle,
                  opacity: (listening || isTranslating) ? 0.7 : 1,
                  cursor: (listening || isTranslating) ? 'not-allowed' : 'pointer'
                }}
                onMouseOver={(e) => {
                  if (!listening && !isTranslating) {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!listening && !isTranslating) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }
                }}
              >
                {listening ? (
                  <>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Listening...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.25rem' }}>🎤</span>
                    Start Speaking
                  </>
                )}
              </button>

              {(recognizedText || translatedText) && (
                <button
                  onClick={clearResults}
                  style={{
                    ...buttonStyle,
                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                    boxShadow: '0 10px 30px rgba(107, 114, 128, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>🗑️</span>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            ...cardStyle,
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
            <p style={{ color: '#fca5a5', fontSize: '1.1rem', margin: 0 }}>
              {error}
            </p>
          </div>
        )}

        {/* Results Section */}
        {(recognizedText || translatedText || isTranslating) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Recognized Text */}
            <div style={cardStyle}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#fef3c7',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🗣️</span>
                  Original Text
                </span>
                {recognizedText && (
                  <button
                    onClick={() => speakText(recognizedText, selectedLanguage)}
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '0.5rem',
                      color: '#fbbf24',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                    title="Listen to original"
                  >
                    🔊
                  </button>
                )}
              </h3>
              <textarea
                value={recognizedText || (listening ? "Listening..." : "")}
                readOnly
                placeholder="Your spoken words will appear here..."
                style={{
                  ...textAreaStyle,
                  fontStyle: listening ? 'italic' : 'normal',
                  opacity: listening ? 0.7 : 1
                }}
              />
            </div>

            {/* Translated Text */}
            <div style={cardStyle}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#fef3c7',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🇺🇸</span>
                  English Translation
                </span>
                {translatedText && (
                  <button
                    onClick={() => speakText(translatedText, "en")}
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '0.5rem',
                      color: '#fbbf24',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                    title="Listen to translation"
                  >
                    🔊
                  </button>
                )}
              </h3>
              <textarea
                value={translatedText || (isTranslating ? "Translating..." : "")}
                readOnly
                placeholder="English translation will appear here..."
                style={{
                  ...textAreaStyle,
                  fontStyle: isTranslating ? 'italic' : 'normal',
                  opacity: isTranslating ? 0.7 : 1
                }}
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        {!recognizedText && !listening && (
          <div style={{
            ...cardStyle,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#6ee7b7',
              marginBottom: '1rem'
            }}>
              💡 How to Use
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              textAlign: 'left'
            }}>
              <div>
                <p style={{ color: '#a7f3d0', fontSize: '1rem', margin: '0.5rem 0' }}>
                  <strong>1.</strong> Select your preferred language
                </p>
                <p style={{ color: '#a7f3d0', fontSize: '1rem', margin: '0.5rem 0' }}>
                  <strong>2.</strong> Click "Start Speaking" button
                </p>
              </div>
              <div>
                <p style={{ color: '#a7f3d0', fontSize: '1rem', margin: '0.5rem 0' }}>
                  <strong>3.</strong> Speak clearly into your microphone
                </p>
                <p style={{ color: '#a7f3d0', fontSize: '1rem', margin: '0.5rem 0' }}>
                  <strong>4.</strong> Get instant English translation
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
       
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
       
        /* Input focus animations */
        textarea:focus, select:focus {
          border-color: #f59e0b !important;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2) !important;
        }
       
        /* Button hover effects */
        button:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.05);
        }
       
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
       
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
       
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
          border-radius: 4px;
        }
       
        /* Responsive design */
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          h2 {
            font-size: 1.25rem !important;
          }
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceTranslator;