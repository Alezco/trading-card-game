<template>
  <div>
    <h1>Trading Card game</h1>
    <div v-if="gameState === GameState.PLAYING">
      <h4>Round: {{ round }}</h4>
      <button @click="nextRound()">Fin du tour</button>
      <div class="player-container">
        <Player
          v-for="player in players"
          :key="player.id"
          :player="player"
          :context="context"
        />
      </div>
      <div v-if="error">Error {{ error }}</div>
      <div class="winner-block" v-if="winner">
        Le Vainqueur est : <br />
        {{ winner.name }}
      </div>
    </div>
    <div v-else>
      <!-- START Login Component -->
      <label for="playerName">Pseudo</label>
      <input 
        v-model="playerName" 
        id="playerName"
        name="playerName" 
        type="text"
      >
      <button @click="connect()">Se connecter</button>
      <!-- END Login Component -->
    </div>
  </div>
</template>

<script lang="ts">
import Player from "./Player.vue";
import { defineComponent, computed, inject, ref } from "vue";
import { useStore } from "vuex";
import { createPlayer } from "../models/Player"
import { GameState } from "../utils/context"

export default defineComponent({
  components: {
    Player
  },
  setup() {
    const store = useStore();

    const round = computed(() => store.getters.getRound);
    const players = computed(() => store.getters.getPlayers);
    const error = computed(() => store.getters.getError);
    const winner = computed(() => store.getters.getWinner);

    const ws: WebSocket = inject("ws");
    const gameState = ref(GameState.INIT);
    const playerName = ref('')

    // TODO:
    //   - Envoyé au Back Mes Infos Player
    //   - Récupérer les Infos du Player adverse (au tour, au jeux.. etc. la totale quoi)
    //   - Hydrater le store

    const connect = () => {
      if(!ws?.readyState) return
      const player = createPlayer(playerName.value)
      ws.send(JSON.stringify({
        round: round.value,
        players: {
          [player.id]: player
        },
      }));
      gameState.value = GameState.WAITING;
      // TODO: Demander au seveur si un adversaire est déjà connecter
      //  - Si on a un autre adversaire on passe gameState = GameState.PLAYING
      // Coté Back enregister la connexion d'un player
      //  - renvoyer les players à chaque connexion
    }

    return {
      round,
      playerName,
      players,
      nextRound: () => store.dispatch("endRound"),
      connect,
      error,
      winner,
      gameState,
    };
  }
});
</script>

<style scoped>
.player-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.winner-block {
  align-items: center;
  background: green;
  border-radius: 5px;
  color: white;
  display: flex;
  font-size: 36px;
  font-weight: 800;
  height: 50vh;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 50vw;
}
</style>
