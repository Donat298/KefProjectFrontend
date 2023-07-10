import MyMain from "@/pages/MyMain";

import {createRouter, createWebHistory} from "vue-router";
import Games from "@/pages/GaMes";
import UserPage from "@/pages/UserPage";
import UserPage2 from "@/pages/UserPage2";
import ImageS from "@/pages/ImageS";
import login from "@/pages/auth/LoginView";
import register from "@/pages/auth/RegisterView";









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
        component: Games
    },

    {
        path: '/SignUptest1',
        name: 'SignUptest1',
        component: UserPage
    },
    {
        path: '/SignUptest2',
        name: 'SignUptest2',
        component: UserPage2
    },
    
    {
        path: '/image',
        name: 'image',
        component: ImageS
    },
    
]



const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;