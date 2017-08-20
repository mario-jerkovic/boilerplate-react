import universal from 'react-universal-component';

export default [
    {
        path: '/',
        exact: true,
        component: universal(() => import('./views/pages/DashboardPage'), {
            minDelay: 500,
        }),
    },
    {
        path: '/user/profile',
        component: universal(() => import('./views/pages/ProfilePage'), {
            minDelay: 500,
        }),
    },
    {
        path: '/user/reviews',
        component: universal(() => import('./views/pages/ReviewsPage'), {
            minDelay: 500,
        }),
    },
    {
        path: '/user/notifications',
        component: universal(() => import('./views/pages/NotificationsPage'), {
            minDelay: 500,
        }),
    },
];
