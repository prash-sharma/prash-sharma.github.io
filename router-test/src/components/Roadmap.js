import React from 'react';
import '../App.css'

export default function Roadmap() {
    return (
        <div className='roadmap'>
            <h1>Roadmap</h1>
            <h2>This week</h2>
            <p><s>Loading indicator where required (Page load, update, create, delete)</s></p>
            <p><s>Passive notification on member create / update / delete with custom messages</s></p>
            <p><s>Sticky table header on scroll</s></p>

            <h2>Previous weeks</h2>
            <p><s>Prettify Create member input fields</s></p>
            <p><s>Highlight active nav element</s></p>
            <p><s>Trigger search on the homepage and update the member list dynamically</s></p>
            
            <h2>Upcoming</h2>
            <p>Build custom confirmation prompt</p>
            <p>Make the edit/delete icon appear only on the target row hover</p>
            <p>Play with file server to upload images for members</p>
            <p>Embed gogle map for location selection</p>
            <p>Lazy loading table data</p>
            
            
        </div>
    )
}
