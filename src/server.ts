import app from "./app"
import WebSocket from 'ws'
import {Server} from "restana"
import url from "url"
import http from "http"

app.start(9001).then(server => {
    console.log('Uygulama 9001 portundan baslatildi...')
})

const wss1 = new WebSocket.Server({noServer: true})

wss1.on('connection', ws => {
    ws.on('message', data => {
        console.log('received: %s', data)
        wss1.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    })

   /* ws.send(JSON.stringify(
        {
            name: 'Olcay',
            age: 23
        }
    ))*/
})

app.getServer().on('upgrade', (req, socket, head) => {
    const pathname = url.parse(req.url).pathname

    if (pathname === '/') {
        wss1.handleUpgrade(req, socket, head, client => {
            wss1.emit('connection', client, req)
        })
    } else {
        socket.destroy()
    }
})

const server = app.getServer()

export default server
