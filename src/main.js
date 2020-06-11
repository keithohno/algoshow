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
    add_point(state, point) {
      state.point_list.push(point);
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
