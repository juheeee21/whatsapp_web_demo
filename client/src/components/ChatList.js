import React from 'react';

export default function ChatList({ conversations, onSelect, selected }) {
  return (
    <div style={{ width: '30%', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
      {Object.keys(conversations).map(wa_id => (
        <div
          key={wa_id}
          onClick={() => onSelect(wa_id)}
          style={{
            padding: '1em',
            background: wa_id === selected ? '#eee' : '#fff',
            cursor: 'pointer'
          }}
        >
          <strong>{wa_id}</strong>
          <div>{conversations[wa_id][0]?.name || ""}</div>
        </div>
      ))}
    </div>
  );
}
