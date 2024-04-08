import 'dotenv/config';
import { App } from './app.js';

const app = new App();
let server;

function serverError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  throw error;
}

function serverListening() {
  const addressInfo = server.address();
  console.info(`Listening on ${addressInfo.address}:${process.env.APP_PORT || 8080}`);
}

app
  .init()
  .then(() => {
    app.express.set('port', process.env.APP_PORT || 8080);
    server = app.httpServer;
    server.on('error', serverError);
    server.on('listening', serverListening);

    server.listen(process.env.APP_PORT || 8080);
  })
  .catch((err) => {
    console.info('app.init error');
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
  });

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection: reason:', reason.message);
  console.error(reason.stack);
});
