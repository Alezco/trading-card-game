// @ts-ignore
import {
  WebSocketClient,
  WebSocketServer
} from "https://deno.land/x/websocket@v0.1.3/mod.ts";

const wss = new WebSocketServer(8080);
wss.on("connection", (ws: WebSocketClient) => {
  console.log('its connected')
  ws.on("message", (message: string) => {
    console.log(message);
    ws.send(message);
  });
});
