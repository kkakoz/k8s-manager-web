import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Pod from '@/views/pod/index.vue'
import Deployment from '@/views/deployment/index.vue'

const routes = [
    {
        path: '/',
        // component: () => import('../pages/Home.vue'),
        component: Pod,
        meta: {
            title: 'Pod'
        },
    },
    {
        path: '/deployment',
        // component: () => import('../pages/Home.vue'),
        component: Deployment,
        meta: {
            title: 'Deployment'
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;