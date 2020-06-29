import React, { Component } from 'react'

export default class RestSearch extends Component {
    constructor(){
        super();
        this.state={
            searchQuery: null
        }
    }
    searchFn(value){

        console.log(value);
        
        fetch('http://localhost:3000/restaurant/?q='+value).then((response) => {
            response.json().then((result) => {
                console.log(result)
                this.setState({
                    list: result,
                    count: result.length
                });
                                
            })
        })
    }
    render() {
        let styles = {
            width: "250px",
            borderRadius: "8px",
            outline: "none"

        }
        return (
            <div>
                <input type="search" style={styles} onChange={(event)=>this.searchFn(event.target.value)} placeholder="Search member..."/>
            </div>
        )
    }
}
