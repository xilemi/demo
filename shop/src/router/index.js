import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComFooter from "@/components/ComFooter.vue"
import RegisterView from "../views/RegisterView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        footer: ComFooter
      },
      meta: {
        label: '首页'
      }
    },
    {
      path: '/list',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/ListView.vue'),
        footer: ComFooter
      },
      meta: {
        label: '列表'
      }
    },
    {
      path: '/car',
      name: 'car',
      components: {
        default: () => import('../views/CarView.vue'),
        footer: ComFooter
      },
      meta: {
        label: '购物车'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        default: () => import("@/views/MineView.vue"),
        footer: ComFooter
      },
      meta: {
        label: '我的'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        label: '注册页'
      }
    },
    {
      path: "/login",
      name: 'login',
      component: () => import("@/views/LoginView.vue"),
      meta: {
        label: "登录页"
      }
    },
    {
      path: "/Prodetail",
      name: 'Prodetail',
      component: () => import("@/views/ProDetailView.vue"),
      meta: {
        label: "详情页"
      }
    },
    {
      path: "/order",
      name: 'order',
      component: () => import("@/views/OrderView.vue"),
      meta: {
        label: "订单页"
      }
    },
    {
      path: "/addAddress",
      name: 'addAddress',
      component: () => import("@/views/AddAddress.vue"),
      meta: {
        label: "添加地址"
      }
    },
    {
      path: "/addressList",
      name: 'addressList',
      component: () => import("@/views/AddressList.vue"),
      meta: {
        label: "地址列表"
      }
    },
    {
      path: "/orderDetail",
      name: 'orderDetail',
      component: () => import("@/views/OrderDetail.vue"),
      meta: {
        label: "订单详情"
      }
    },
    {
      path: "/orderList",
      name: 'orderList',
      component: () => import("@/views/OrderListView.vue"),
      meta: {
        label: "我的订单"
      }
    },
    {
      path: "/proBrand",
      name: 'proBrand',
      component: () => import("@/views/proBrandView.vue"),
      meta: {
        label: "品牌产品"
      }
    },
  ]
})

export default router;
