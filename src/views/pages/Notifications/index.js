import universal from 'react-universal-component';

export default universal(() => import('./Notifications.js'), {
    minDelay: 500,
});
