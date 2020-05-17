import Ws from '@adonisjs/websocket-client';

const ws = Ws('ws://localhost:3333', {
    path: 'ws'
});

let chat;

function subscribeToChat(subscribeFunction) {
    chat.on("message", subscribeFunction);
}

function connect() {
    ws.connect();
    chat = ws.subscribe("chat");
}

function disconnect() {
    if(ws.connected) {
        ws.disconnect();
    }
}

function sendMessage(message, username) {   
    const data = {
        message,
        username
    }         
    chat.emit("message", data);
}

export {
    connect,
    disconnect,
    subscribeToChat,
    sendMessage
}