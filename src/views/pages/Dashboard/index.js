import universal from 'react-universal-component';

export default universal(() => import('./Dashboard.js'), {
    minDelay: 500,
});
