import React, { useState } from 'react';
import { sendMessage } from '../api';

export default function SendMessageInput({ wa_id, name }) {
  const [text, setText] = useState('');
  const handleSend = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      await sendMessage(wa_id, 'You', text);
      setText('');
    }
  };
  return (
    <form onSubmit={handleSend} style={{ display: 'flex', padding: '1em', borderTop: '1px solid #ddd' }}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ flex: 1, padding: '0.5em' }}
        placeholder="Type a message"
      />
      <button type="submit" style={{ marginLeft: 8 }}>Send</button>
    </form>
  );
}
