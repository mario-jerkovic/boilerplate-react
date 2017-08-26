import universal from 'react-universal-component';

export default universal(() => import('./Login.js'), {
    minDelay: 500,
});
