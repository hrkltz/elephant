require('dotenv').config()

const express = require('express')
const morgan = require("morgan")
const { createProxyMiddleware } = require('http-proxy-middleware')

// Create Express Server
const app = express()
// Configuration
const PORT = 3000
const HOST = "localhost"
const API_SERVICE_URL = "https://api.github.com"

// Logging
app.use(morgan('dev'))

app.use('/file', createProxyMiddleware({
    target: `${API_SERVICE_URL}/repos/hrkltz/wiki/contents`,
    changeOrigin: true,
    headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
    },
    pathRewrite: {
        [`^/file`]: '',
    },
    onProxyRes: (incommingMessage, req, res) => {
        delete incommingMessage.headers['x-frame-options']
        incommingMessage.headers['cache-control'] = 'no-store'
    }
}))

// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`)
})
