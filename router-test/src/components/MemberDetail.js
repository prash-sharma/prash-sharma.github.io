import React, {useEffect, useState} from 'react';
import kratos from '../images/kratos.png';
import scroll from '../images/scroll.png'

export default function MemberDetail({match}) {
    const [memberDetail, setMemberDetail] = useState({});

    useEffect(() => {
        async function memberDetails(){
            const res = await fetch(`http://localhost:3000/members/${match.params.id}`);
            const data = await res.json();
            setMemberDetail(data);
        }
        memberDetails();
        
    }, [match])

    let styles = {
        backgroundImage: `url(${scroll})`,
        width: `450px`,
        paddingTop: 30,
        paddingBottom: 30
    }
    
    return (
        <div className='memberDetail'>
            <img src={kratos} alt = 'membername'/>
            <div className='personalDetails' style={styles}>
                <h2>Name: {memberDetail.name}</h2>
                <h2>Role: {memberDetail.role}</h2>
                <h2>Expertise: {memberDetail.expertise}</h2>
                <h2>From: {memberDetail.from}</h2>
            </div>
            
        </div>
    )
}
