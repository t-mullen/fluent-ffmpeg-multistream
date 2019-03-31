const test = require('tape')
const ffmpeg = require('fluent-ffmpeg')
const { StreamInput, StreamOutput } = require('./../')
const { Writable, Readable } = require('stream')
const fs = require('fs')

test('two outputs', function (t) {
  t.plan(2)

  const ws1 = new Writable()
  ws1._write = () => {
    ws1._write = () => {}
    t.pass('got data on ws1')
  }

  const ws2 = new Writable()
  ws2._write = () => {
    ws2._write = () => {}
    t.pass('got data on ws2')
  }

  const command = ffmpeg()
    .addInput('./test/sample.webm')
    .addOutput(StreamOutput(ws1).url)
    .addOutputOption('-f mpegts')
    .addOutput(StreamOutput(ws2).url)
    .addOutputOption('-f mpegts')
    .on('error', (err) => {})

  command.run()
})

test('two inputs, two outputs', function (t) {
  t.plan(2)

  const rs1 = fs.createReadStream('./test/sample.webm')
  const rs2 = fs.createReadStream('./test/sample.webm')

  const ws1 = new Writable()
  ws1._write = () => {
    ws1._write = () => {}
    t.pass('got data on ws1')
  }

  const ws2 = new Writable()
  ws2._write = () => {
    ws2._write = () => {}
    t.pass('got data on ws2')
  }

  const command = ffmpeg()
    .addInput(StreamInput(rs1).url)
    .addInput(StreamInput(rs2).url)
    .output(StreamOutput(ws1).url)
    .addOutputOption('-f mpegts')
    .output(StreamOutput(ws2).url)
    .addOutputOption('-f mpegts')
    .on('error', (err) => {
      console.log(err);
    })

  command.run()
})

test('cleanup', function (t) {
  t.end()
  process.exit(0)
})