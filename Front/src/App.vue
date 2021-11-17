<template>
  <Board />
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import Board from "./components/Board.vue";

export default defineComponent({
  name: "App",
  components: {
    Board
  },
  setup() {
    // @todo: Create conversation with server :D
    const ws: WebSocket = new WebSocket("ws://127.0.0.1:8080");
    provide("ws", ws);
    ws.onopen = (event: Event): void => {
      console.log("ws connected!");
      console.log(event);
      ws.send("something");
    };
    ws.onmessage = (event: MessageEvent) => {
      console.log(event);
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
