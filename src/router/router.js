

import MyMain from "@/pages/MyMain";

import {createRouter, createWebHistory} from "vue-router";
import Games from "@/pages/GaMes";
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
        path: '/games',
        name: 'Games',
        component: Games,
        
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
//Vue project using router and vuex store
//The task is that if a user enters the chat component and he is not authorized, then he Immediately would be thrown into the login component.
//Here is vuex index.js

