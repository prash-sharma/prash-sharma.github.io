import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import Confirmation from './Confirmation'
import delIcon from '../images/deleteIcon.png'
import editIcon from '../images/edit.png'
import Loader from './Loader'
import Gravatar from './Gravatar'

export default function Member(props) {
    const operationStyle = {
        width: '30px',
        height: '30px',
        marginLeft: '10px',
        marginRight: '10px',
    }

    const [operation, setOperation] = useState(false)
    const [triggerDel, setTriggerDel] = useState(false)
    const [memberName, setMemberName] = useState('')
    const [memberEmail, setMemeberEmail] = useState('')
    const [memberId, setMemberId] = useState('')
    const [memberExpertise, setMemberExpertise] = useState('')
    const [memberFrom, setMemberFrom] = useState('')
    const [memberImage, setMemberImage] = useState('')
    const [loader, setLoader] = useState(false)
    const [bGScroll, setBgScroll] = useState(false)

    useEffect(() => {
        setMemberId(props.member.id)
        setMemberName(props.member.name)
        setMemeberEmail(props.member.email)
        setMemberImage(props.member.fileUrl)
        setMemberExpertise(props.member.expertise)
        setMemberFrom(props.member.from)
    }, [props])

    function deleteMember(id, image) {
        console.log('This will remove member')
        setLoader(true)
        const db = firebase.firestore()
        db.collection('members').doc(id).delete()

        if (image) {
            const file = firebase.storage()
            file.refFromURL(image).delete()
        }
        setTriggerDel(false)
        setLoader(false)
    }

    return (
        <>
            {loader && <Loader />}

            <Confirmation
                returnConfirmation={triggerDel}
                bgScroll={bGScroll}
                onConfirm={() => {
                    deleteMember(memberId, memberImage)
                    setTriggerDel(false)
                    setBgScroll(false)
                }}
                onCancel={() => {
                    setTriggerDel(false)
                    setBgScroll(false)
                }}
            >
                Lacks firepower, let's kick <b>{memberName}</b> out!!
            </Confirmation>

            <div
                className="memberDiv"
                onMouseEnter={(e) => {
                    setOperation(true)
                    e.preventDefault()
                }}
                onMouseLeave={() => {
                    setOperation(false)
                }}
            >
                <div className={'memberDetails'}>
                    <div>
                        <h3>Name:</h3> <p>{memberName}</p>
                        <h3>Email:</h3> <p>{memberEmail}</p>
                        <h3>Expertise:</h3> <p>{memberExpertise}</p>
                        <h3>From:</h3>
                        <p>{memberFrom}</p>
                    </div>
                    <div>
                        <Gravatar email={memberEmail} />
                        {/* <img
                            src={`${memberImage}`}
                            alt={`${memberName}`}
                            width={200}
                            height={200}
                        /> */}
                    </div>
                </div>
                <div className="operationDiv">
                    {operation && (
                        <>
                            <Link to={`/update/${memberId}`}>
                                <img
                                    src={editIcon}
                                    alt={'editIcon'}
                                    style={operationStyle}
                                />
                            </Link>

                            <Link
                                to={``}
                                onClick={() => {
                                    setTriggerDel(true)
                                    setBgScroll(true)
                                }}
                            >
                                <img
                                    src={delIcon}
                                    alt={'delIcon'}
                                    style={operationStyle}
                                />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
