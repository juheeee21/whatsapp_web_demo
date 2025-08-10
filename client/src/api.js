import axios from "axios";
import { io } from "socket.io-client";

// Set these URLs to your backend deployment!
export const API_BASE = "https://your-backend-url.com/api";
export const socket = io("https://your-backend-url.com");

export async function fetchConversations() {
  return axios.get(`${API_BASE}/conversations`).then(r => r.data);
}
export async function fetchMessages(wa_id) {
  return axios.get(`${API_BASE}/messages/${wa_id}`).then(r => r.data);
}
export async function sendMessage(wa_id, name, content) {
  return axios.post(`${API_BASE}/messages`, { wa_id, name, content }).then(r => r.data);
}
