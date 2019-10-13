import React from 'react';

export default function Home({ history }) {

    (() => {
        localStorage.clear();

        history.push('/login');
    })();

    return <span>Você será redirecionado...</span>;
}