import universal from 'react-universal-component';

export default universal(() => import('./Profile.js'), {
    minDelay: 500,
});
