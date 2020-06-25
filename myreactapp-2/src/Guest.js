import React, { Component } from 'react';
import Army from './Hoc'

class Guest extends Component {
    
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

export default Army(Guest, 15)






// import React, { Component } from 'react';
// import { MyContext} from './Context';

// export default class Guest extends Component {
//     static contextType = MyContext;
//     render() {
//         const {name, value} = this.context.data;
//         return (
//             <div>
//                 <h3>Guest component</h3>
//                 <h4>This is coming from App: {name} and {value}</h4>
//                 <button onClick = {this.context.handleClick}>Click me</button>       
//             </div>
//         )
//     }
// }