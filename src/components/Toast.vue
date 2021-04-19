<template>
  <div class="toast" :class="`bg-${background}`">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    background: {
      type: String,
      default: "000"
    },
    message: {
      type: String,
      default: "Yo !"
    }
  }
  // TODO: Add a close and a delay for display, CSS
});
</script>

<style scoped>
.toast {
  background: #000;
  box-shadow: 0 0 0 0 0.5;
  color: white;
  position: fixed;
  padding: 5px 10px;
  right: 15px;
  bottom: 15px;
}
</style>
