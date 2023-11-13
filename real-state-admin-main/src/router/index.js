import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

// Admin Views
import AdminDashboard from "@/views/Admin/AdminDashboard";
import HousesView from "@/views/Admin/Houses";
import UsersView from "@/views/Admin/Users";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard,
    children: [
      {
        path: "houses",
        name: "houses",
        component: HousesView,
      },
      {
        path: "users",
        name: "users",
        component: UsersView,
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
