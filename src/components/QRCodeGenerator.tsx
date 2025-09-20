'use client';

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

type QRCodeGeneratorProps = {
  url: string;
};

export default function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  const [generating, setGenerating] = useState(false);
  const [qrValue, setQrValue] = useState('');

  const generateQRCode = () => {
    setGenerating(true);
    setTimeout(() => {
      setQrValue('https://artisan-platform-9tb6.vercel.app/products');
      setGenerating(false);
    }, 500); // simulate loading delay
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h2>QR Code Generator</h2>
      <button
        onClick={generateQRCode}
        style={{ padding: '12px 0', fontWeight: 'bold', width: '100%', marginBottom: 24 }}
        disabled={generating}
      >
        {generating ? 'Generating QR Code...' : 'Generate QR Code'}
      </button>
      <div style={{ textAlign: 'center' }}>
        {qrValue && !generating && (
          <QRCodeCanvas
            value={qrValue}
            size={250}
            bgColor="#fff"
            fgColor="#000"
            level="H"
            includeMargin={true}
            style={{ borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', margin: 'auto' }}
          />
        )}
      </div>
    </div>
  );
}