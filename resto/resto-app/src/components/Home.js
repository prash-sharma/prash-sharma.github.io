import React, { Component } from 'react';
import RestSearch from './RestSearch';
import RestList from './RestList'

export default class Home extends Component {
   
    render() {
        return (
            <div>
                <h2 style={{color: "skyblue"}}>Welcome to DevX..</h2> <br />
                <RestSearch /> <br /> <br />
                <RestList />
            </div>
        )
    }
}
