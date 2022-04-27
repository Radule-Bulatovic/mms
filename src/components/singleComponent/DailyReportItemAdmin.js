import React from 'react'
import { withRouter } from 'react-router-dom'

class DailyReportItemAdmin extends React.Component {

    render() {
        

        return (
            <tr onClick={this.props.showItems}>
                <td >{this.props.company_name}</td>
                <td >{this.props.shop_name}</td>
                <td >{this.props.invoice_id}</td>
                <td> {this.props.date}</td>
                    {/* <button
                        className="btn btn-sm btn-primary"
                        onClick={(e) => {
                        e.preventDefault();
                        window.location.href='https://maps.google.com/maps?q='+this.props.latitude+','+this.props.longitude+'&hl=es&z=14&amp;output=embed';
                        }}
                    > Lokacija</button> */}
            </tr>
        )
    }
}

export default withRouter(DailyReportItemAdmin)