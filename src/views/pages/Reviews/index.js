import universal from 'react-universal-component';

export default universal(() => import('./Reviews.js'), {
    minDelay: 500,
});
