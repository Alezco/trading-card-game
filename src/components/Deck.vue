<template>
  <div v-for="card in deck" :key="card.id">{{card.id}}: {{card.mana}}</div>
</template>

<script>
export default {
  props: {
    deck: Array,
  }
}
</script>
