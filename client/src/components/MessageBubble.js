import React from 'react';

export default function MessageBubble({ msg }) {
  const isMine = msg.name === 'You';
  const statusIcons = {
    sent: "✓",
    delivered: "✓✓",
    read: "✓✓ (blue)"
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMine ? 'row-reverse' : 'row',
      margin: '0.5em 0'
    }}>
      <div style={{
        background: isMine ? '#dcf8c6' : '#fff',
        borderRadius: 8,
        padding: '0.5em 1em',
        maxWidth: '60%',
        boxShadow: '0 1px 1px #ccc'
      }}>
        <div>{msg.content}</div>
        <div style={{ fontSize: 10, textAlign: 'right', color: '#666' }}>
          {new Date(msg.timestamp).toLocaleString()} {statusIcons[msg.status]}
        </div>
      </div>
    </div>
  );
}
