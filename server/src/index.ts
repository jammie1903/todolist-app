import * as express from 'express'
import * as http from 'http'
import { AddressInfo } from 'net'
import createWebsocket from './webSocket/webSocket'
import app from './app'

const server = http.createServer(app)
createWebsocket(server)

//start our server
server.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${(<AddressInfo>server.address()).port}`)
})
