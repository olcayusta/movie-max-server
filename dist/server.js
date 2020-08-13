"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const ws_1 = __importDefault(require("ws"));
const url_1 = __importDefault(require("url"));
app_1.default.start(9001).then(server => {
    console.log('Uygulama 9001 portundan baslatildi...');
});
const wss1 = new ws_1.default.Server({ noServer: true });
wss1.on('connection', ws => {
    ws.on('message', data => {
        console.log('received: %s', data);
        wss1.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    });
    /* ws.send(JSON.stringify(
         {
             name: 'Olcay',
             age: 23
         }
     ))*/
});
app_1.default.getServer().on('upgrade', (req, socket, head) => {
    const pathname = url_1.default.parse(req.url).pathname;
    if (pathname === '/') {
        wss1.handleUpgrade(req, socket, head, client => {
            wss1.emit('connection', client, req);
        });
    }
    else {
        socket.destroy();
    }
});
const server = app_1.default.getServer();
exports.default = server;
//# sourceMappingURL=server.js.map