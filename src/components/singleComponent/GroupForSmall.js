import React from 'react'
import { withRouter } from 'react-router-dom'

class GroupForSmall extends React.Component {
    render() {
        return (
            <li> 
               <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"
                    onClick={() => this.props.getArticles(this.props.group_id)}
                    > 
                    {this.props.group_name}
                </a>
                
                
                
                </li>
        )
    }
}

export default withRouter(GroupForSmall)