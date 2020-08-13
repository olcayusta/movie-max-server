"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const server_1 = __importDefault(require("./server"));
const ws_1 = __importDefault(require("ws"));
const wss1 = new ws_1.default.Server({ noServer: true });
wss1.on('connection', ws => {
    ws.on('message', data => {
        console.log('received: %s', data);
    });
    ws.send(JSON.stringify({
        name: 'Olcay',
        age: 23
    }));
});
server_1.default.on('upgrade', (req, socket, head) => {
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
exports.default = wss1;
//# sourceMappingURL=ws_server.js.map