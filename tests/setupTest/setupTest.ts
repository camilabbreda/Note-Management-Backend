import app from '../../src/server';
import { Server } from 'http';

let server: Server | undefined;

beforeAll(async () => {
  server = app.listen(0);
});

afterAll(() => {
  if (server) {
    server.close();
  }
});

export default app;
