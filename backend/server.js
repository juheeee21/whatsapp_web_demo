const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const MessageSchema = new mongoose.Schema({
  id: String,
  wa_id: String,
  name: String,
  content: String,
  timestamp: Date,
  status: String,
  meta_msg_id: String
});
const Message = mongoose.model('Message', MessageSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.post('/api/webhook', async (req, res) => {
  const { messages, statuses } = req.body;
  if (messages) {
    for (const msg of messages) {
      await Message.updateOne(
        { id: msg.id },
        { $setOnInsert: { ...msg, status: 'sent' } },
        { upsert: true }
      );
      io.emit('new-message', msg);
    }
  }
  if (statuses) {
    for (const status of statuses) {
      await Message.updateOne({ id: status.id }, { $set: { status: status.status } });
      io.emit('status-update', status);
    }
  }
  res.json({ success: true });
});

app.get('/api/conversations', async (req, res) => {
  const msgs = await Message.find().lean();
  const grouped = {};
  msgs.forEach(msg => {
    if (!grouped[msg.wa_id]) grouped[msg.wa_id] = [];
    grouped[msg.wa_id].push(msg);
  });
  res.json(grouped);
});

app.get('/api/messages/:wa_id', async (req, res) => {
  const { wa_id } = req.params;
  const msgs = await Message.find({ wa_id }).sort({ timestamp: 1 }).lean();
  res.json(msgs);
});

app.post('/api/messages', async (req, res) => {
  const { wa_id, name, content } = req.body;
  const msg = await Message.create({
    id: Math.random().toString(36).substring(2),
    wa_id,
    name,
    content,
    timestamp: new Date(),
    status: 'sent',
    meta_msg_id: ''
  });
  io.emit('new-message', msg);
  res.json(msg);
});

io.on('connection', (socket) => {
  console.log('Client connected');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
