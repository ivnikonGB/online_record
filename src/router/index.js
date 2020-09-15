import Vue from 'vue'
import VueRouter from 'vue-router'
import category from '../views/category.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "home",
    component: () => 
      import("../views/Home.vue")
  },
  {
    path: '/category',
    name: 'category',
    component: category
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: "/details/:id",
    name: "details",
    component: () =>
      import("../views/MasterDetails.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
