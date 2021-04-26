<template>
  <h1>Trading Card game</h1>
  <h4>Round: {{ context.round }}</h4>
  <button @click="nextRound()">Fin du tour</button>
  <div class="player-container">
    <Player
      v-for="player in context.players"
      :health="player.health"
      :hand="player.hand"
      :mana="player.mana"
      :key="player.id"
      :playerId="player.id"
      :deck="player.deck"
      :context="context"
    />
  </div>
</template>

<script lang="ts">
import Player from "./Player.vue";
import { gameLoop, initBoard } from "@/handlers/GameHandler";
import { Context } from "@/types/types";
// import { defineComponent, onMounted, reactive, watch } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Player
  },
  data() {
    return {
      context: {} as Context
    };
  },
  mounted: function() {
    this.context = initBoard();
  },
  watch: {
    context(value) {
      console.log(value);
    }
  },
  methods: {
    nextRound() {
      gameLoop(this.context);
    }
  }
});
//////////////////////////////////
/// TEST with composition API ///
////////////////////////////////
// export default defineComponent({
//   components: {
//     Player
//   },
//   setup() {
//     // With reactive()
//     // let context = reactive<Context>(initBoard()); // Cause context is typed with properties that are not optionals

//     // redundant
//     // // onMounted(() => {
//     // //   context = initBoard();
//     // // });

//     // const nextRound = () => {
//     //   gameLoop(context);
//     // };

//     // watch(context, () => {
//     //   console.log(context);
//     // });

//     // return {
//     //   context,
//     //   nextRound
//     // };

//     // With ref()
//     // const context = ref<Context>(initBoard());
//     // const nextRound = () => {
//     //   gameLoop(context.value);
//     // };

//     // watch(context, () => {
//     //   console.log(context.value);
//     // });

//     // return {
//     //   context,
//     //   nextRound
//     // };
//   }
// });
</script>

<style scoped>
.player-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
