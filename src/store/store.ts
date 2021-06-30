import { createStore } from "vuex";
import context from "./modules/context";

export const store = createStore({
  modules: {
    context
  }
});
