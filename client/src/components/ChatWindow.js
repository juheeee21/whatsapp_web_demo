import React, { useState, useEffect } from 'react';
import { fetchMessages, socket } from '../api';
import MessageBubble from './MessageBubble';
import SendMessageInput from './SendMessageInput';

export default function ChatWindow({ wa_id }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages(wa_id).then(setMessages);
    const update = () => fetchMessages(wa_id).then(setMessages);
    socket.on('new-message', update);
    socket.on('status-update', update);
    return () => {
      socket.off('new-message', update);
      socket.off('status-update', update);
    };
  }, [wa_id]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1em' }}>
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </div>
      <SendMessageInput wa_id={wa_id} name={messages[0]?.name || ''} />
    </div>
  );
}
