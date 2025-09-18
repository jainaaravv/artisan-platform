"use client";

import { useState } from "react";

export default function TranslationPage() {
  const [transcript, setTranscript] = useState("");
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!transcript.trim()) return;

    setLoading(true);

    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: transcript,
        targetLanguages: ["en", "hi"], // example target languages
      }),
    });

    const data = await response.json();

    setTranslations(data.translations || {});
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Translate Transcript</h1>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Type or paste transcript text here..."
        className="w-full p-2 border rounded mb-4"
        rows={5}
      />

      <button
        onClick={handleTranslate}
        disabled={loading || !transcript.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Translating…" : "Translate"}
      </button>

      <div>
        <h2 className="font-semibold mb-2">Translations:</h2>
        {Object.entries(translations).map(([lang, text]) => (
          <div key={lang} className="mb-2">
            <strong>{lang.toUpperCase()}:</strong> {text}
          </div>
        ))}
      </div>
    </div>
  );
}
