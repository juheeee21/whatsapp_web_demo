# WhatsApp Web Demo

A full-stack WhatsApp Web-like chat interface using webhook data, MongoDB, Express, Socket.IO, and React.

## Features

- Real-time chat UI like WhatsApp Web
- MongoDB for message storage and status
- Webhook payload processor for initial message import
- Demo message sending (storage only)
- Responsive and mobile-friendly

## Getting Started

### Backend

1. `cd backend`
2. `cp .env.example .env` and set your MongoDB Atlas URI.
3. `npm install`
4. `npm start`

### Frontend

1. `cd client`
2. `npm install`
3. `npm start`
4. Set API URLs in `src/api.js` to your backend deployment!

### Deployment

- **Backend:** Render, Heroku, or similar.
- **Frontend:** Vercel, Netlify, or similar.

## Webhook Payload Import

POST JSON payloads to `/api/webhook` endpoint to import messages/status.

## License

MIT# whatsapp_web_demo
