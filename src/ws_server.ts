import url from "url";
import server from "./server";
import WebSocket from "ws";

const wss1 = new WebSocket.Server({noServer: true})

wss1.on('connection', ws => {
    ws.on('message', data => {
        console.log('received: %s', data)
    })

    ws.send(JSON.stringify(
        {
            name: 'Olcay',
            age: 23
        }
    ))
})

server.on('upgrade', (req, socket, head) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/') {
        wss1.handleUpgrade(req, socket, head, client => {
            wss1.emit('connection', client, req);
        })
    } else {
        socket.destroy();
    }
})

export default wss1
