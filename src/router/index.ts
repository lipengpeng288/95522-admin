import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Apimonitoring from '../views/work/ApiMonitoring.vue'
import DataMonitoring from '../views/work/dataMonitoring.vue'
import InvestAccount from '../views/feature/InvestAccount.vue'
import Universal from '../views/feature/Universal.vue'
import Login from '@/views/login/Login.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/apimonitoring',
        name: 'Apimonitoring',
        component: Apimonitoring,
    }, {
        path: '/datamonitoring',
        name: 'DataMonitoring',
        component: DataMonitoring,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }, {
        path:'/investaccount',
        name: 'InvestAccount',
        component: InvestAccount,
    }, {
        path:'/universal',
        name: 'Universal',
        component: Universal,
    }, {
        path: '/',
        redirect: '/apimonitoring'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from , next) => {
    // if (!localStorage.getItem('_atk') && to.path !== '/login') {
    //     next('/login');
    //     return
    // }
    next();
})

export default router
