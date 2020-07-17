import React from 'react';
import '../App.css'

export default function Roadmap() {
    return (
        <div className='roadmapDiv'>
            <div className='roadmap'>
                <h1>Roadmap</h1>
                <h2>This week</h2>
                <p><s>Loading indicator where required (Page load, update, create, delete)</s></p>
                <p><s>Toast notification on member create / update / delete with custom messages</s></p>
                <p><s>Sticky table header on scroll</s></p>
                <p><s>Build custom confirmation prompt</s></p>

                <h2>Previous weeks</h2>
                <p><s>Prettify Create member input fields</s></p>
                <p><s>Highlight active nav element</s></p>
                <p><s>Trigger search on the homepage and update the member list dynamically</s></p>
                
                <h2>Upcoming</h2>
                <p>Grey out the whole background when the confirmation prompt is active</p>
                <p>Lazy loading table data</p>
                <p>Fix the bug with search results not persistent after deleting a member from the search results</p>
                <p>Add notification for failed scenarios</p>
                <p>Table sorting by clicking on the header</p>
                <p>Make the edit/delete icon appear only on the target row hover</p>
                <p>Play with file server to upload images for members</p>
                <p>Embed gogle map for location selection</p>
            
            </div>
        </div>
    )
}
