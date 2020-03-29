import Vue from "vue";
import VueRouter from "vue-router";
import FilterList from "./components/FilterList.vue";
import HistoryList from "./components/HistoryList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: FilterList,
  },
  {
    path: "/history",
    component: HistoryList,
  },
  {
    path: "/history/:param",
    component: HistoryList,
    props: (route) => ({ param: route.params.param }),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
