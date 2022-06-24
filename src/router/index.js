import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Pod from '@/views/pod/index.vue'
import Deployment from '@/views/deployment/index.vue'
import DeploymentAdd from '@/views/deployment/deployment_add/index.vue'
import Terminal from '@/views/terminal/index.vue';
import Secret from '@/views/secret/index.vue'; 

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
        path: '/pod',
        component: Pod,
        meta: {
            title: 'Pod'
        },
    },
    {
        path: '/pod/terminal',
        component: Terminal,
        meta: {
            title: 'Terminal'
        },
    },
    {
        path: '/deployment',
        component: Deployment,
        meta: {
            title: 'Deployment'
        },
    },
    {
        path: '/deployment/add',
        component: DeploymentAdd,
        meta: {
            title: 'DeploymentAdd'
        },
    },
    {
        path: '/secret',
        component: Secret,
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