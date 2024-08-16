import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LayoutView from "../views/LayoutView.vue";
import TableView from "../views/TableView.vue";
import BookView from "../views/BookView.vue";
import TypeView from "../views/TypeView.vue";
import AuditView from "../views/AuditView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LayoutView",
    component: LayoutView,
    children: [
      {
        path: "book",
        name: "BookView",
        component: BookView,
      },
      {
        path: "table",
        name: "TableView",
        component: TableView,
      },

      {
        path: "type",
        name: "TypeView",
        component: TypeView,
      },
      {
        path: "audit",
        name: "AuditView",
        component: AuditView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
