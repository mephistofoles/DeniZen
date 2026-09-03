import 'dotenv/config';
import './db';
import http from 'http';
import { app } from './app';
import { setupWebSocketServer } from './ws';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
setupWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
