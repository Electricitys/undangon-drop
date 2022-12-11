const tus = require('tus-node-server');

const server = new tus.Server({ path: '/files' });
server.datastore = new tus.FileStore({ directory: './files' });

const host = '127.0.0.1';
const port = 1080;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
});