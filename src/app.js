import express from 'express';
import http, { Server } from 'http';
import errorHandler from './middleware/ErrorHandler.js';
import registerRoutes from './modules/modules.js';
import AuthMiddleware from './middleware/AuthMiddleware.js';

export class App {
  /** @type {express.Express} */
  express;
  /** @type {Server} */
  httpServer;

  async init() {
    this.express = express();
    this.httpServer = http.createServer(this.express);

    this.middleware();

    this.routes();

    this.express.use(errorHandler);
  }

  async middleware() {
    this.express.use(express.json({ limit: '100mb' }));
    this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
    this.express.use(AuthMiddleware);
    this.express.use('/static', express.static('uploads'));
  }

  async routes() {
    this.express.use('/', registerRoutes());
  }
}
