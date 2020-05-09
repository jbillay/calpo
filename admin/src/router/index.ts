import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import AdminHome from "@/views/admin/Home.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import NotFound from "@/views/NotFound.vue";
import DataDictionary from "@/views/admin/DataDictionary.vue";
import DataObject from "@/views/admin/DataObject.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
    meta: {
      adminLayout: true,
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "adminHome",
    component: AdminHome,
    props: true,
    meta: {
      adminLayout: true,
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/admin/data-dictionary",
    name: "dataDictionary",
    component: DataDictionary,
    props: true,
    meta: {
      adminLayout: true,
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/admin/data-dictionary/:slug",
    name: "dataObject",
    component: DataObject,
    props: true,
    meta: {
      adminLayout: true,
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/403",
    name: "unauthorized",
    component: Unauthorized,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

export default function({ store }: any) {
  const Router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters["user/isLoggedIn"]) {
        next({
          name: "login",
          query: { redirect: to.fullPath },
        });
      } else {
        if (to.matched.some((record) => record.meta.requiresAdmin)) {
          if (!store.getters["user/isAdmin"]) {
            next({ name: "unauthorized" });
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } else {
      next();
    }
  });

  return Router;
}
