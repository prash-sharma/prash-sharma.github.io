import React, { useState } from 'react'

export default function Gravatar(props) {
    const [imageUrl, setImageUrl] = useState('')
    const crypto = require('crypto')
    const request = require('request')

    /* Generate a md5-hash of a email address and return its hexadecimal value */

    function hash(hashEmail) {
        if (hashEmail) {
            return crypto
                .createHash('md5')
                .update(hashEmail.toLowerCase())
                .digest('hex')
        } else {
            console.log('No email address found')
        }
    }

    /* Sends a GET request for the avatar */
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

    return (
        <div>
            <img src={imageUrl} alt={'gravatar'} />
        </div>
    )
}

// /* Load the packages for hashing and HTTP requests (must be installed with npm before) */
// var crypto = require("crypto");
// var request = require("request");

// /* Generate a md5-hash of a email address and return its hexadecimal value */
// var hash = crypto.createHash('md5').update("example@hotmail.com").digest("hex");

// /* Sends a GET request for the user profile */
// request("https://www.gravatar.com/"+hash+".xml",function(err,response,body){
// 	if (!err){
// 		console.log(body);
// 	}else{
// 		console.log("Error: "+err);
// 	}
// })

// /* Sends a GET request for the avatar */
// request("https://www.gravatar.com/avatar/"+hash+".jpg",function(err,response,body){
// 	if (!err){
// 		console.log("Got image: "+body);
// 	}else{
// 		console.log("Error: "+err);
// 	}
// })
