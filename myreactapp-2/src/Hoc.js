import React, { Component } from 'react'

const Army = (Men, shots) => {
    class NewMen extends Component {
        state = {
            gunshots: 0
        }
        handleGunshots = () => {
            this.setState({gunshots: this.state.gunshots + shots})
        }
        render(){
            return <Men 
                    {...this.props}
                    hocgunname = 'Sniper' 
                    hocgunshots = {this.state.gunshots} 
                    hochandlegunshots = {this.handleGunshots}/>
        }
    }
    return NewMen;
}

export default Army;
