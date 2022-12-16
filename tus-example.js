const {Server} = require('@tus/server')
const {FileStore} = require('@tus/file-store')
const host = '127.0.0.1'
const port = 4040

new Server({
  path: '/files',
  datastore: new FileStore({directory: './files'}),
}).listen({host, port}, () => {
  console.log(
    `[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`
  )
})