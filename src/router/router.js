//This is router file for example
import MyMain from "@/pages/MyMain";
import {createRouter, createWebHistory} from "vue-router";
import Wheel from "@/pages/Games/Wheel/WhEel.vue";
import BalanceManag from "@/pages/Games/BalanceManag.vue";
import Mines from "@/pages/Games/Mines/MiNes.vue";
import login from "@/pages/auth/LoginView";
import register from "@/pages/auth/RegisterView";
import ChAt from "@/pages/Chats/ChAt.vue";
import store from "@/store/index.js";
import CollisionBalls from "@/pages/Tests/CollisionBalls.vue";
import Realwheel from "@/pages/Games/Realwheel/Realwheel.vue";
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
        path: '/realwheel',
        name: 'Wheel',
        component: Wheel,
        
    },
    {
        path: '/wheel',
        name: 'Realwheel',
        component: Realwheel,
        
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
        path: '/relax',
        name: 'CollisionBalls',
        component: CollisionBalls,

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



