import React, { useState } from 'react'

export default function Gravatar(props) {
    const [imageUrl, setImageUrl] = useState('')

    const request = require('request')

    /* Sends a GET request for the avatar */
    if (props.email) {
        request(
            'https://www.gravatar.com/avatar/' + hash(props.email) + '?s=60',
            function (err, response) {
                if (!err) {
                    // console.log('Got image: ' + body)
                    console.log(response.url)
                    setImageUrl(response.url)
                } else {
                    console.log('Error: ' + err)
                }
            }
        )
    } else {
        request('https://www.gravatar.com/avatar/?s=60&d=retro', function (
            err,
            response
        ) {
            if (!err) {
                // console.log('Got image: ' + body)
                console.log(response.url)
                setImageUrl(response.url)
            } else {
                console.log('Error: ' + err)
            }
        })
    }

    return (
        <div>
            <img src={imageUrl} alt={'gravatar'} />
        </div>
    )
}

/* Generate a md5-hash of a email address and return its hexadecimal value */
function hash(hashEmail) {
    const crypto = require('crypto')

    if (hashEmail) {
        return crypto
            .createHash('md5')
            .update(hashEmail.toLowerCase())
            .digest('hex')
    } else {
        console.log('No email address found')
        return ''
    }
}
