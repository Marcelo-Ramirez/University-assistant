import React from 'react';

function Message({ text, sender }) {
  const isUser = sender === 'user';
  const icon = isUser ? '👤' : '🖥️';

  return (
    <div className={`message ${sender}`}>
      <p>{icon} {text}</p>
    </div>
  );
}

export default Message;