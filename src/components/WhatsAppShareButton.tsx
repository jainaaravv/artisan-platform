import React from 'react';

interface WhatsAppShareButtonProps {
  message: string;
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#25D366',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({ message }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <button style={buttonStyle}>Share on WhatsApp</button>
    </a>
  );
};

export default WhatsAppShareButton;
