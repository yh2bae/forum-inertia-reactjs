import React from 'react';
import App from '@/Layouts/App';

export default function Home() {
    return (
        <div>
            Home
        </div>
    );
}

Home.layout = page => <App children={page} />
