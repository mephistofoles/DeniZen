import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';

let wss: WebSocketServer;
const clients = new Set<WebSocket>();

export function setupWebSocketServer(server: Server) {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('WebSocket client connected. Total:', clients.size);

    ws.on('close', () => {
      clients.delete(ws);
      console.log('WebSocket client disconnected. Total:', clients.size);
    });
  });
}

export function broadcast(message: unknown) {
  const payload = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}
