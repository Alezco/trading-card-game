<template>
  <div v-for="card in hand" :key="card.id" @click="handleAction(card)">
    {{ card.id }}: {{ card.mana }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useStore } from "vuex";
import { Context } from "@/types/types";
import { mapActions } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const activePlayerId = computed(() => store.getters.getActivePlayerId);
    return {
      activePlayerId
    };
  },
  props: {
    hand: Array,
    playerId: String,
    context: Object as PropType<Context>
  },
  methods: {
    ...mapActions({
      playCard: "playCard"
    }),
    handleAction(card) {
      console.log(card.playerId, this.activePlayerId, this);

      if (card.playerId === this.activePlayerId) {
        this.playCard(card);
      }
    }
  }
});
</script>
