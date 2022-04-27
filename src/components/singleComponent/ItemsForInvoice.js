import React from 'react'
import { withRouter } from 'react-router-dom'

class ItemsForInvoice extends React.Component {


    render() {
        return (
            <tr>
                <td >{this.props.item}</td>
                <td >{parseInt(this.props.quantity)}</td>
                <td>{this.props.price}</td>
                <td >{this.props.discount === ".00" ? "0.00" : this.props.discount}</td>
            </tr>
        )
    }
}

export default withRouter(ItemsForInvoice)