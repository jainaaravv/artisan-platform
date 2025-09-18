import React from "react";

interface Props {
  transcript: string;
  setTranscript: (text: string) => void;
}

const TranscriptEditor: React.FC<Props> = ({ transcript, setTranscript }) => {
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.borderColor = '#c9a46b';
    target.style.boxShadow = '0 0 0 3px rgba(201, 164, 107, 0.1), inset 0 2px 10px rgba(107, 66, 38, 0.05)';
    target.style.background = 'rgba(255, 248, 240, 1)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.borderColor = 'rgba(201, 164, 107, 0.4)';
    target.style.boxShadow = 'inset 0 2px 10px rgba(107, 66, 38, 0.05)';
    target.style.background = 'rgba(255, 248, 240, 0.95)';
  };

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, isPrimary: boolean = true) => {
    const target = e.target as HTMLButtonElement;
    target.style.transform = 'translateY(-2px)';
    
    if (isPrimary) {
      target.style.boxShadow = '0 8px 25px rgba(201, 164, 107, 0.4)';
      target.style.background = 'linear-gradient(135deg, #c9a46b, #b8935a)';
    } else {
      target.style.background = 'rgba(201, 164, 107, 0.15)';
      target.style.borderColor = '#c9a46b';
    }
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, isPrimary: boolean = true) => {
    const target = e.target as HTMLButtonElement;
    target.style.transform = 'translateY(0)';
    
    if (isPrimary) {
      target.style.boxShadow = '0 5px 15px rgba(201, 164, 107, 0.3)';
      target.style.background = 'linear-gradient(135deg, #d4b483, #c9a46b)';
    } else {
      target.style.background = 'rgba(107, 66, 38, 0.1)';
      target.style.borderColor = 'rgba(201, 164, 107, 0.5)';
    }
  };

  const handleClearAll = () => {
    setTranscript('');
  };

  const handleWordCount = () => {
    const words = transcript.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    alert(`Word count: ${wordCount}\nCharacter count: ${transcript.length}`);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .transcript-textarea::placeholder {
          color: #8b7355;
          opacity: 0.7;
        }
      `}</style>

      <div
        style={{
          background: 'linear-gradient(135deg, #f5ede3 0%, #e9dbc6 100%)',
          padding: '2rem',
          borderRadius: '20px',
          position: 'relative',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(201, 164, 107, 0.3)',
          fontFamily: 'Inter, sans-serif',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative' }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.8rem',
              color: '#6b4226',
              margin: '0 0 8px 0'
            }}
          >
            Transcript Editor
          </h2>
          <div
            style={{
              width: '80px',
              height: '3px',
              background: 'linear-gradient(135deg, #c9a46b, #d2b48c)',
              borderRadius: '2px',
              margin: '0 auto'
            }}
          />
        </div>

        {/* Textarea Container */}
        <div
          style={{
            position: 'relative',
            marginBottom: '1rem'
          }}
        >
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={8}
            placeholder="Start editing your transcript here..."
            className="transcript-textarea"
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '1.5rem',
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#3b2f2f',
              background: 'rgba(255, 248, 240, 0.95)',
              border: '2px solid rgba(201, 164, 107, 0.4)',
              borderRadius: '15px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 2px 10px rgba(107, 66, 38, 0.05)',
              boxSizing: 'border-box'
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          
          {/* Character Counter */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '15px',
              fontSize: '0.85rem',
              color: '#8b7355',
              background: 'rgba(245, 237, 227, 0.9)',
              padding: '0.3rem 0.8rem',
              borderRadius: '12px',
              border: '1px solid rgba(201, 164, 107, 0.2)',
              backdropFilter: 'blur(5px)',
              pointerEvents: 'none'
            }}
          >
            {transcript.length} characters
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={handleClearAll}
            style={{
              padding: '0.8rem 2rem',
              background: 'linear-gradient(135deg, #d4b483, #c9a46b)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 15px rgba(201, 164, 107, 0.3)',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => handleButtonMouseEnter(e, true)}
            onMouseLeave={(e) => handleButtonMouseLeave(e, true)}
          >
            Clear All
          </button>

          <button
            onClick={handleWordCount}
            style={{
              padding: '0.8rem 2rem',
              background: 'rgba(107, 66, 38, 0.1)',
              color: '#6b4226',
              border: '2px solid rgba(201, 164, 107, 0.5)',
              borderRadius: '25px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => handleButtonMouseEnter(e, false)}
            onMouseLeave={(e) => handleButtonMouseLeave(e, false)}
          >
            Word Count
          </button>

          <button
            onClick={handleCopyText}
            style={{
              padding: '0.8rem 2rem',
              background: 'rgba(107, 66, 38, 0.1)',
              color: '#6b4226',
              border: '2px solid rgba(201, 164, 107, 0.5)',
              borderRadius: '25px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => handleButtonMouseEnter(e, false)}
            onMouseLeave={(e) => handleButtonMouseLeave(e, false)}
          >
            Copy Text
          </button>
        </div>

        {/* Decorative Elements */}
        <div
          className="pulse-animation"
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #c9a46b, #d2b48c)',
            borderRadius: '50%',
            opacity: '0.3'
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '-5px',
            width: '25px',
            height: '25px',
            background: 'linear-gradient(135deg, #d2b48c, #c9a46b)',
            borderRadius: '50%',
            opacity: '0.2'
          }}
        />
      </div>
    </>
  );
};

export default TranscriptEditor;
