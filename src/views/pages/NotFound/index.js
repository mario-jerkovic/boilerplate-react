import universal from 'react-universal-component';

export default universal(() => import('./NotFound.js'), {
    minDelay: 500,
});
