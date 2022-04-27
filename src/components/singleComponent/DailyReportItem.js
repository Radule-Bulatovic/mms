import React from 'react'
import { withRouter } from 'react-router-dom'

class DailyReportItem extends React.Component {


    render() {
        return (
            <tr onClick={this.props.showItems}>
                {/* <td className="tableBody cartItem">{this.props.id}</td> */}
                <td >{this.props.company_name}</td>
                <td >{this.props.shop_name}</td>
                {/* <td>{this.props.status}</td> */}
                <td >{this.props.invoice_id}</td>
            </tr>
        )
    }
}

export default withRouter(DailyReportItem)