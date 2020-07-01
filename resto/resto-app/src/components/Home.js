import React, { Component } from 'react';
import RestSearch from './RestSearch';
import RestList from './RestList';
import fire from '../images/fire.gif'

export default class Home extends Component {
    
    render() {
        let imagestyles = {
            width: "200px",
            height: "200px"
        }

        let imagedivstyle = {
            backgroundColor: "black"
        }
        return (
            <div>
                
                <div style={imagedivstyle}>
                    <h2 style={{color: "darkred"}}>Welcome to Fire..</h2>
                    <img src={fire} alt="fire" style = {imagestyles} /> 
                </div><br /><br />
                
                <RestSearch /> <br /> <br />
                <RestList />
            </div>
        )
    }
}
