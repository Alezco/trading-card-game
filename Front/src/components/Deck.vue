<template>
  <div v-for="card in deck" :key="card.id">{{ card.id }}: {{ card.mana }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    deck: Array
  }
});
</script>
