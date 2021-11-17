// @ts-ignore
import {
  WebSocketClient,
  WebSocketServer
} from "https://deno.land/x/websocket@v0.1.3/mod.ts";

const wss = new WebSocketServer(8080);
wss.on("connection", function(ws: WebSocketClient) {
  console.log('its connected')
  ws.on("message", function(message: string) {
    console.log(message);
    ws.send(message);
  });
});
