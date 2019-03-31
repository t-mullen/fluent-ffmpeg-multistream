# fluent-ffmpeg-multistream

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Uses Unix domain sockets to add support for multiple stream inputs/outputs to (`fluent-ffmpeg`)[https://github.com/fluent-ffmpeg/node-fluent-ffmpeg].

```javascript
const ffmpeg = require('fluent-ffmpeg')
const { StreamInput, StreamOutput } = require('fluent-ffmpeg-multistream')

ffmpeg()
	.input(StreamInput(readableStream1).url)
	.input(StreamInput(readableStream2).url)
	.output(StreamOutput(writableStream1).url)
	.output(StreamOutput(writableStream2).url)
```

