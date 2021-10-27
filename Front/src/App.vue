<template>
  <Board />
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import Board from "./components/Board.vue";

export default defineComponent({
  name: "App",
  components: {
    Board
  },
  inject: ["webSocket"],
  setup() {
    // @todo: Check typeScript
    // const ws: WebSocket  = inject("webSocket");
    // ws.onopen((event: Event) => {
    //   console.log("ws connected!");
    //   ws.send("something");
    // });
    // ws.onmessage((event: MessageEvent) => {
    //   console.log(event);
    // });
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
