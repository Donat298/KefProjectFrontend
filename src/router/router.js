//This is router file for example
import MyMain from "@/pages/MyMain";
import {createRouter, createWebHistory} from "vue-router";
import Wheel from "@/pages/Games/WhEel.vue";
import BalanceManag from "@/pages/Games/BalanceManag.vue";
import Mines from "@/pages/Games/MiNes.vue";
import login from "@/pages/auth/LoginView";
import register from "@/pages/auth/RegisterView";
import ChAt from "@/pages/Chats/ChAt.vue";
import store from "@/store/index.js";

import UserPage from "@/pages/UserPage";
import UserPage2 from "@/pages/UserPage2";

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
        path: '/BalanceManag',
        name: 'BalanceManag',
        component:  BalanceManag,
        
    },
    {
        path: '/mines',
        name: 'Mines',
        component:  Mines,
        
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChAt,
     
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



