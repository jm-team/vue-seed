const fs = require('fs')
const path = require('path')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')

const config = require('./config').dev
const port = process.env.PORT || config.port
const proxyTable = config.proxyTable

const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) => express.static(resolve(path))

const app = express()

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options,
      changeOrigin: true
    }
  }
  console.dir(context)
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use('/', serve('./dist', true))

app.get('*', (req, res) => {

  res.setHeader('Content-Type', 'text/html')

  res.sendFile(resolve('./dist/index.html'))

})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})