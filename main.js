const fastify = require("fastify")({ logger: true });
const { Server, FileStore } = require("tus-node-server");

const tusServer = new Server({
  path: "/files",
  datastore: new FileStore({ directory: "./files" }),
});

fastify.addContentTypeParser(
  "application/offset+octet-stream",
  (request, payload, done) => done(null)
);
fastify.all("/files", (req, res) => {
  tusServer.handle(req.raw, res.raw);
});
fastify.all("/files/*", (req, res) => {
  tusServer.handle(req.raw, res.raw);
});
fastify.get("/", async (req, res) => {
  return "Drop some file please";
});

fastify.listen(3010, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
