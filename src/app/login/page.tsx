'use client';

import { useState } from "react";
import { Inter, Playfair_Display } from "next/font/google";

// Load Google Fonts via next/font (no CSS files)
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed to send OTP");
      await response.json();
      setStage("otp");
      setMessage("OTP sent to your email!");
    } catch (error) {
      setMessage("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Logged in successfully!");
        setTimeout(() => {
          window.location.href = "/artisan-profile";
        }, 1500);
      } else {
        setMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStage("email");
    setOtp("");
    setMessage("");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${inter.className}`}
      style={{
        background:
          "linear-gradient(to bottom right, #fff8f0, #f5ede3, #e9dbc6)",
      }}
    >
      <style jsx>{`
        .login-card {
          background: rgba(255, 248, 240, 0.95);
          border: 2px solid rgba(212, 180, 131, 0.3);
          border-radius: 25px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        .login-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #c9a46b, #d2b48c);
        }
        .login-title {
          font-weight: 700;
          background: linear-gradient(135deg, #6b4226, #a0522d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          position: relative;
        }
        .login-subtitle {
          color: #6b4226;
          text-align: center;
          opacity: 0.8;
          font-weight: 300;
        }
        .form-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid rgba(201, 164, 107, 0.3);
          border-radius: 15px;
          margin-bottom: 1rem;
        }
        .login-btn {
          width: 100%;
          padding: 1rem 2rem;
          border-radius: 15px;
          background: linear-gradient(135deg, #c9a46b, #d2b48c);
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .back-btn {
          border: 2px solid rgba(107, 66, 38, 0.3);
          background: transparent;
          color: #6b4226;
          border-radius: 12px;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
        }
        .message {
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          margin: 1rem 0;
        }
        .message.success {
          background: #dff7e5;
          color: #207a32;
        }
        .message.error {
          background: #fde2e2;
          color: #c62828;
        }
        .message.info {
          background: #f9f1e5;
          color: #6b4226;
        }
        .step-indicator {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
        }
        .step.active {
          background: linear-gradient(135deg, #c9a46b, #d2b48c);
        }
        .step.inactive {
          background: rgba(107, 66, 38, 0.3);
        }
        .step-line {
          height: 2px;
          width: 60px;
          align-self: center;
          background: rgba(107, 66, 38, 0.2);
        }
        .step-line.active {
          background: linear-gradient(90deg, #c9a46b, #d2b48c);
        }
        /* Loader animation */
        .loader {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="w-full max-w-md">
        <div className="login-card">
          {/* Steps */}
          <div className="step-indicator">
            <div className={`step ${stage === "email" ? "active" : "inactive"}`}>
              1
            </div>
            <div
              className={`step-line ${stage === "otp" ? "active" : ""}`}
            ></div>
            <div className={`step ${stage === "otp" ? "active" : "inactive"}`}>
              2
            </div>
          </div>

          {/* Title */}
          <h1 className={`login-title text-3xl mb-2 ${playfair.className}`}>
            Welcome Back
          </h1>
          <p className="login-subtitle mb-8">
            {stage === "email"
              ? "Enter your email to receive a secure login code"
              : "Enter the verification code sent to your email"}
          </p>

          {/* Messages */}
          {message && (
            <div
              className={`message ${
                message.includes("successfully") || message.includes("sent")
                  ? "success"
                  : message.includes("Error") || message.includes("Invalid")
                  ? "error"
                  : "info"
              }`}
            >
              {message}
            </div>
          )}

          {/* Stage Rendering */}
          {stage === "email" ? (
            <>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                disabled={loading}
              />
              <button
                onClick={sendOtp}
                disabled={!email || loading}
                className="login-btn"
              >
                {loading && <span className="loader"></span>}
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter 6-digit verification code"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="form-input"
                disabled={loading}
                maxLength={6}
              />
              <button
                onClick={verifyOtp}
                disabled={otp.length !== 6 || loading}
                className="login-btn"
              >
                {loading && <span className="loader"></span>}
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              <button
                onClick={handleBackToEmail}
                disabled={loading}
                className="back-btn"
              >
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

  