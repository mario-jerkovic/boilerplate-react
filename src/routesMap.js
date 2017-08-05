export default {
    DASHBOARD: {
        path: '/',
        thunk: async (dispatch, getState) => {
            console.info('DASHBOARD thunk', dispatch, getState()); // eslint-disable-line no-console
        },
    },
    PROFILE: {
        path: '/profile',
        thunk: async (dispatch, getState) => {
            console.info('PROFILE user thunk', dispatch, getState()); // eslint-disable-line no-console
        },
    },
    REVIEWS: {
        path: '/reviews',
        thunk: async (dispatch, getState) => {
            console.info('REVIEWS thunk', dispatch, getState()); // eslint-disable-line no-console
        },
    },
    NOTIFICATIONS: {
        path: '/notifications',
        thunk: async (dispatch, getState) => {
            console.info('NOTIFICATIONS thunk', dispatch, getState()); // eslint-disable-line no-console
        },
    },
};
