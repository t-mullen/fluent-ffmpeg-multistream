const net = require('net')
const fs = require('fs')
const path = require('path');

var counter = 0
class UnixStream {
  constructor (stream, onSocket) {
    const socketPath = path.resolve('/tmp/', (++counter), '.sock');
    this.url = 'unix:' + socketPath

    try {
      fs.statSync(socketPath)
      fs.unlinkSync(socketPath)
    } catch (err) {}
    const server = net.createServer(onSocket)
    stream.on('finish', () => {
      server.close()
    })
    server.listen(socketPath)
  }
}

function StreamInput (stream) {
  return new UnixStream(stream, socket => stream.pipe(socket))
}
module.exports.StreamInput = StreamInput

function StreamOutput (stream) {
  return new UnixStream(stream, socket => socket.pipe(stream))
}
module.exports.StreamOutput = StreamOutput
