//This is router file

import MyMain from "@/pages/MyMain";

import {createRouter, createWebHistory} from "vue-router";
import Wheel from "@/pages/Games/WhEel.vue";
import Wheel2 from "@/pages/Games/WhEel2.vue";
import BalanceManag from "@/pages/Games/BalanceManag.vue";
import UserPage from "@/pages/UserPage";
import UserPage2 from "@/pages/UserPage2";
import ImageS from "@/pages/ImageS";
import login from "@/pages/auth/LoginView";
import register from "@/pages/auth/RegisterView";
import ChAt from "@/pages/Chats/ChAt.vue";
import store from "@/store/index.js";







const routes = [
    {
        path: '/',
        name: 'home',
        component: MyMain
    },
    {
        path: '/auth/login',
        name: 'login',
        component: login
    },
    {
        path: '/auth/register',
        name: 'register',
        component: register
    },
    {
        path: '/wheel',
        name: 'Wheel',
        component: Wheel,
        
    },
    {
        path: '/wheel2',
        name: 'Wheel2',
        component: Wheel2,
        
    },
   
    {
        path: '/BalanceManag',
        name: 'BalanceManag',
        component:  BalanceManag,
        
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChAt,
        meta: { requiresAuth: true }
      },

    {
        path: '/SignUptest1',
        name: 'SignUptest1',
        component: UserPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/SignUptest2',
        name: 'SignUptest2',
        component: UserPage2,
        meta: { requiresAuth: true }
    },
    
    {
        path: '/image',
        name: 'image',
        component: ImageS
    },
    
]




const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/auth/login');
    } else {
      next();
    }
  });


export default router;



