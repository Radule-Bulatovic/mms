import React from 'react'
import { withRouter } from 'react-router-dom'
import DatePicker from "react-datepicker";
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";
import DailyReportItem from './singleComponent/DailyReportItem';
import ItemsForInvoice from './singleComponent/ItemsForInvoice';
import ReactLoading from 'react-loading'

class DailyReport extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: new Date(),
            showInvoices: false,
            invoices: [],
            items: [],
            company_name: '',
            isLoading: true,
        }
    }

    componentDidMount() {
        var storageUser = JSON.parse(localStorage.getItem('user'))
        let _date =  new Date()
        let details = {
            date: moment(_date).format('YYYY-MM-DD'),
            user: storageUser.operater,
        }
        this.props.getInvoicesForDate(details)
        this.setState({isLoading: true})
    }

    static getDerivedStateFromProps(props, state) {
        let _invoices = [] , _items = []
        let _isLoading = true
        if(props.invoices === state.invoices) {
            if(props.invoices.length > 0 && state.invoices.length > 0) {
                _isLoading = false
            }
            if(props.invoices === state.invoices) {
                _isLoading = true
            }
        }

        if(props.invoices !== state.invoices) {
            _invoices = props.invoices
            _items = []
            _isLoading = false
        } else {
            _invoices = state.invoices
        }

        if(props.items !== state.items) {
            _items = props.items
            _isLoading = false
        }
        return {
            invoices: _invoices,
            items: _items,
            isLoading: _isLoading
        }
    }

    changeDate = (date) => {
        var storageUser = JSON.parse(localStorage.getItem('user'))
        let details = {
            date: moment(date).format('YYYY-MM-DD'),
            user: storageUser.operater,
            page: 1
        }
        this.props.getInvoicesForDate(details)
        this.setState({
            selectedDate: date,
            showInvoices: true,
            isLoading: true
        })
    }

   
    showItems = (invoice_id, company_name) => {
        this.setState({
            company_name: company_name,
        })
        this.props.getItemsForInvoice(invoice_id)
    }

    render() {
        return (
            <div>
            {/* <Header /> */}
                <div className="col-sm-12 height-styleFinance bckOrders">
                {
                    this.state.isLoading
                    ?
                    <div style={{width:'50px', height:'50px', marginLeft:'45%', paddingTop:'50%'}}>
                        <ReactLoading type="spin"  style={{'textAlign':'left'}} />
                    </div>
                    :
                    <>
                    <form name="checkForm" className="setOpacity banacecheckForm">
                            <div className="box-body">
                                <div className="form-group setColor">
                                    <h6 className="vendorShopsTitle">Datum:</h6>
                                </div>
                                <div className="form-group dailyDataPicker" >
                                    <DatePicker className="form-control"
                                        placeholderText="Izaberite datum" 
                                        onChange={this.changeDate}
                                        selected={this.state.selectedDate}
                                    />
                                </div>
                            </div>

                            <table className=" table table-striped col-sm-12 dailyTbl" style={{'marginBottom':'15px'}}> 
                                <thead className="tableHeader">
                                    <tr className="sortCursor">
                                        <th className="thAnalticalItem" style={{'width':'50%'}} >
                                            Kupac
                                        </th>
                                        <th className="thAnalticalItem" style={{'width':'50%'}}>
                                            Objekat
                                        </th>
                                        {/* <th className="thAnalticalItem">
                                            Status
                                        </th> */}
                                        <th className="thAnalticalItem" style={{'width':'10%'}}>
                                            Br.Rač
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{'fontSize':'13px'}}>
                                    {
                                        this.state.invoices.length > 0 
                                        ?
                                        this.state.invoices.map( (item, index) => {
                                            return <DailyReportItem
                                                    key={index}
                                                    id={item.id}
                                                    company_name={item.company_name}
                                                    shop_name={item.shop_name}
                                                    status={item.status}
                                                    invoice_id={item.invoice_id}
                                                    showItems={() => this.showItems(item.id, item.company_name)}
                                                />
                                        }) :
                                        (
                                            <tr>
                                                <td>Nema podataka!</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ) 
                                    }
                                </tbody>
                            </table>
        
                            <h6 className="vendorShopsTitle">
                                {
                                    this.state.items.length > 0 ? this.state.company_name : ""
                                }
                            </h6> 
                            {
                                this.state.items.length > 0 ? 
                                
                                <table className=" table table-striped col-sm-12 dailyTbl"> 
                                <thead className="tableHeader">
                                    <tr className="sortCursor">
                                        <th className="thAnalticalItem" style={{'width':'70%'}} >
                                            Artikal
                                        </th>
                                        <th className="thAnalticalItem" style={{'width':'10%'}}>
                                            Kol.
                                        </th>
                                        <th className="thAnalticalItem" style={{'width':'10%'}}>
                                            Cijena
                                        </th>
                                        <th className="thAnalticalItem" style={{'width':'10%'}}>
                                            %
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{'fontSize':'13px'}}>
                                {
                                        this.state.items !== undefined ?
                                        this.state.items.map( (item, index) => {
                                            return <ItemsForInvoice
                                                    key={index}
                                                    item={item.name}
                                                    quantity={item.quantity}
                                                    price={item.price}
                                                    discount={item.discount}
                                                />
                                        }) :
                                        (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ) 
                                    }
                                </tbody>
                            </table>
                                
                                : ""
                            } 

                        </form>
                    </>

                }
                
            </div>
        </div>
        )
    }
}

export default withRouter(DailyReport)