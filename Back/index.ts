// @ts-ignore
import {
  WebSocketClient,
  WebSocketServer
} from "https://deno.land/x/websocket@v0.1.3/mod.ts";

const wss = new WebSocketServer(8080);

wss.on("connection", (ws: WebSocketClient) => {
  console.log('its connected')
  ws.on("message", (message: String) => {
    // Structure of data should be { event: 'xx';, data: '{...}' }
    ws.send(message) // Send to other client
  });
});


// TODO:
//   - Ecouter les event player et renvoyé la data aux bonnes personnes (broadcast/send)
//   - Gestion des rooms (id users, broadcast etc...)
