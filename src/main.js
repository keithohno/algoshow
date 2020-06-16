import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import HomeScreen from "./components/HomeScreen";
import SandboxScreen from "./components/SandboxScreen";
import RedBlackTreeScreen from "./components/RedBlackTreeScreen";
import store from "./store/store";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/sandbox", component: SandboxScreen },
  { path: "/redblacktrees", component: RedBlackTreeScreen },
];

const router = new VueRouter({ mode: "history", routes });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
