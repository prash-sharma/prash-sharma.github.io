import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class RestList extends Component {
    constructor(){
        super();
        this.state = {
            list: null,
            count: null
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/restaurant').then((response) => {
            response.json().then((result) => {
                this.setState({
                    list: result,
                    count: result.length
                });
                                
            })
        })
    }

    render() {
        console.log(this.state.list);
        return (    
            <div>                
                <h1>Restaurant List ({this.state.count})</h1>
                
                { this.state.list? 
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Rating</th>
                                    <th>Email</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.list.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.email}</td>
                                        <td><Link to={"/update/"+item.id} className="navlinks">Edit</Link></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </div>:<p>Please wait..</p>
                }
            </div>
        )
    }
}
