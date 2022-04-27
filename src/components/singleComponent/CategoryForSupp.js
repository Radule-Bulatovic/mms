import React from 'react'
import { withRouter } from 'react-router-dom'

class CaregoryForSupp extends React.Component {

    render() {
        return (
                <li className="productForCategory" onClick={this.props.getArticles}>
                    {this.props.group_name}
                </li> 
        )
    }
}

export default withRouter(CaregoryForSupp)