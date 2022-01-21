import React from 'react';
import App from '@/Layouts/App';

export default function Dashboard() {
    return (
       <div>
           Dashboard
       </div>
    );
}

Dashboard.layout = page => <App children={page} />
