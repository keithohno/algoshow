import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Vuex from "vuex";
import HomeScreen from "./components/HomeScreen";
import SampleScreen from "./components/SampleScreen";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/sample", component: SampleScreen },
];

const router = new VueRouter({ mode: "history", routes });

const store = new Vuex.Store({
  state: {
    point_list: [],
  },
  mutations: {
    add_point(state, prm) {
      for (let p of state.point_list) {
        if (p.x === prm.x && p.y === prm.y) {
          return;
        }
      }
      state.point_list.push({
        x: prm.x,
        y: prm.y,
        key: state.point_list.length,
      });
    },
    del_point(state, key) {
      for (let i = key + 1; i < state.point_list.length; i++) {
        state.point_list[i].key--;
      }
      state.point_list.splice(key, 1);
    },
    move_point(state, prm) {
      state.point_list[prm.key].x = prm.x;
      state.point_list[prm.key].y = prm.y;
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
