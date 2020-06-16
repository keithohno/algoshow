import Vue from "vue";
import Vuex from "vuex";
import sandbox from "./sandbox";
import redblacktrees from "./redblacktrees";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sandbox,
    redblacktrees,
  },
});
