import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class RestList extends Component {
    constructor(){
        super();
        this.state = {
            list: null,
            count: null,
            
        }
    }

    componentDidMount(){
        this.getList()
    }

    getList(){
        fetch('http://localhost:3000/restaurant/?q=').then((response) => {
            response.json().then((result) => {
                this.setState({
                    list: result,
                    count: result.length
                });
                                
            })
        })
    }

    deleteConfirm(id){
        let confirmation = (window.confirm('Are you sure you wish to delete this entry?'));
        if (confirmation){
            this.delete(id)
        } 
    }

    delete(id){
        console.log('Delete triggered');
        // confirm("Are you sure?")?{}
        fetch('http://localhost:3000/restaurant/'+id, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            
        }).then((result) => {
            result.json();
            
            this.getList();
            // add passive success notification
        })
        
    }

    render() {
        console.log(this.state.list);
        return (    
            <div>                
                <h3>Restaurant List ({this.state.count})</h3>
                
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
                                        <td>
                                            <Link to={"/update/"+item.id} className="navlinks"><FontAwesomeIcon icon={faEdit}  /></Link>
                                            <i onClick={() => this.deleteConfirm(item.id)}><FontAwesomeIcon icon={faTrash} color = "orange" background = "none"/></i>
                                        </td>
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
