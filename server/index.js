const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
var worker = require('./worker')
var video = require('./video')
var db = require('./db')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.use('/api/photos', worker)
app.use('/api/videos', video)

app.use('/bw', express.static('data/source'))
app.use('/result', express.static('data/result'))


app.use('/video_source', express.static('video_data/source'))
app.use('/video_result', express.static('video_data/result'))




async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  db.connect(function(err) {
    if (err) {
      consola.error('Unable to connect to Mongo.')
      process.exit(1)
    } else {
      consola.success('Connection established')
      app.listen(port, host)
    }
  })

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
