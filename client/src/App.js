import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { fetchConversations, socket } from './api';

function App() {
  const [conversations, setConversations] = useState({});
  const [selectedWaId, setSelectedWaId] = useState(null);

  useEffect(() => {
    fetchConversations().then(setConversations);
    const update = () => fetchConversations().then(setConversations);
    socket.on('new-message', update);
    socket.on('status-update', update);
    return () => {
      socket.off('new-message', update);
      socket.off('status-update', update);
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatList conversations={conversations} onSelect={setSelectedWaId} selected={selectedWaId} />
      {selectedWaId && <ChatWindow wa_id={selectedWaId} />}
    </div>
  );
}
export default App;
