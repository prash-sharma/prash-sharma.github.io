import React, { Component } from 'react';
import Army from './Hoc'

class User extends Component {
    
    render() {
        return (
            <>
                <h2>Camp: {this.props.camp}</h2>
                <h3 onMouseOver={this.props.hochandlegunshots}>
                    Gunshots {this.props.hocgunname}: {this.props.hocgunshots}
                </h3>
            </>
        )
    }
}

export default Army(User, 10)
