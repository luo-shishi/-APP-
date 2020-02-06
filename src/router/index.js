import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/Goods'
import comments from '@/components/comments/Comments'
import seller from '@/components/seller/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/comments',
      component: comments
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path:'/',
      redirect:'/goods'
    },

  ],
  linkActiveClass:'active'
})
