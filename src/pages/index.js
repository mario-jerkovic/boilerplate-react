import React from 'react';
import universal from 'react-universal-component';

const routes = {
    DASHBOARD: universal(() => import('./DashboardPage'), {
        minDelay: 500,
    }),
    PROFILE: universal(() => import('./ProfilePage'), {
        minDelay: 500,
    }),
    REVIEWS: universal(() => import('./ReviewsPage'), {
        minDelay: 500,
    }),
    NOTIFICATIONS: universal(() => import('./NotificationsPage'), {
        minDelay: 500,
    }),
    NOT_FOUND: universal(() => import('./NotFoundPage'), {
        minDelay: 500,
    }),
};

export default ({ page }) => { // eslint-disable-line react/prop-types
    const Component = routes[page] || routes.NOT_FOUND;
    return (
        <div>
            <Component />
        </div>
    );
};

// import React from 'react';
// import universal from 'react-universal-component';
//
// const routes = {
//     DASHBOARD: 'DashboardPage',
//     PROFILE: 'ProfilePage',
//     REVIEWS: 'ReviewsPage',
//     NOTIFICATIONS: 'NotificationsPage',
// };
//
// const UniversalComponent = universal(({ Component }) => import(`./${Component}/index.js`), {
//     minDelay: 500,
//     error: () => <div>Not Found</div>,
// });
//
// export default ({ page }) => { // eslint-disable-line react/prop-types
//     const Component = routes[page];
//
//     return (
//         <div>
//             <UniversalComponent Component={Component} />
//         </div>
//     );
// };
