import * as express from 'express'
import * as path from 'path'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'

const app = express()

app.use(logger(process.env.NODE_ENV === 'production' ? 'short' : 'dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/ping', (_req, res) => {
  res.send({pong: new Date()})
})

app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')))

export default app
