import React from 'react';
import Members from './Members'
import Search from './Search';

export default function Home() {
    return (
        <div>
            <h1>Home page</h1>
            <Search />
            <Members />
        </div>
    )
}
