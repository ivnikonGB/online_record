import Vue from 'vue'
import VueRouter from 'vue-router'
import category from '../views/category.vue'
import category2 from '../views/category2.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/category',
    name: 'category',
    component: category
  },
  {
    path: '/category2',
    name: 'category2',
    component: category2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
