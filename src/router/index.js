import Vue from 'vue'
import VueRouter from 'vue-router'
import category from '../views/category.vue'

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
    path: '/category2',
    name: 'category2',
    component: category2
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
