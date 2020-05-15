import Ws from '@adonisjs/websocket-client';


export default function SocketConnection() {

    const ws = Ws('ws://localhost:3333', {
        path: 'ws'
    })

    function connect () {
        ws.connect();
        

        ws.on("open", (data) => {
            // messages.push(data);
            console.log('iniiiii');
        });

        return ws
    }

    function subscribe () {
        
        const result = ws.subscribe("chat")

        result.on("message", (data) => {
            // messages.push(data);
            console.log('subscribe');
        });

        

        return result
    }
}

