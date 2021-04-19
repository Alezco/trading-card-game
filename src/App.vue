<template>
  <Board />
  <Toast v-show="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "./components/Board.vue";
import Toast from "./components/Toast.vue";

export default defineComponent({
  name: "App",
  components: {
    Board,
    Toast
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
