import { createRouter, createWebHashHistory } from 'vue-router';
import App from '@/App.vue';
import NotFound404 from '@/modules/common/pages/NotFound404.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        // Landing
        {
            path: '/',
            name: 'landing',
            component: () => import('@/modules/common/layouts/LandingLayout.vue'),
            children: [
                {
                    path: '/',
                    name: 'HomePage',
                    component: () => import('@/modules/landing/pages/HomePage.vue'),
                },
                {
                    path: '/vpl-data-science',
                    name: 'VplDataScience',
                    component: () => import('@/modules/vpl/pages/VplDataScience.vue'),
                },
                {
                    path: '/wiki',
                    name: 'VplWiki',
                    component: () => import('@/modules/wiki/pages/VplWiki.vue'),
                },
                {
                    path: '/about-us',
                    name: 'AboutUs',
                    component: () => import('@/modules/landing/pages/AboutUs.vue'),
                },

                // Not Found
                {
                    path: '/:pathMatch(.*)*',
                    // redirect: '/',
                    component: NotFound404,
                },
            ],
        },
    ],
});

export default router;
