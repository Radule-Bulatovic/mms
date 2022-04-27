import React from 'react'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import moment from 'moment'
import Pagination from 'react-js-pagination'
import AnalyticCardItem from './singleComponent/AnalyticCardItem'

class Finance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            analyticCard: [],
            companies: '',
            selectedCompany: [],
            selectedKonto: "",
            balanceDetails: [],
            balanceOutDetails: [],
            showBalanceDetails: false,
            showACdetails: false,
            //data for pagination
            current_page: 1,
            per_page: '',
            total: '',
        }
    }

    componentDidMount() {
        this.props.getCompany()
    }
    
    static getDerivedStateFromProps(props, state) {
        let _companies, _selectedCompany, _balanceDetails, _balanceOutDetails, _analyticCard,
            _current_page = "", _per_page= "", _total= ""
        // console.log('props = ', props);
        // console.log('state = ', state);
        if(props.companies !== state.companies) {
            _selectedCompany = state.selectedCompany
            _companies = props.companies.map(comp => {
                return {
                    value: comp.company_id,
                    label: comp.company_name,
                }
            })
        }
        if(props.balanceDetails !== state.balanceDetails) {
            // console.log('props 1 = ', props);
            // console.log('state 1 = ', state);
            _balanceDetails = props.balanceDetails
            _balanceOutDetails = props.balanceOutDetails
        }
        if(props.balanceOutDetails !== state.balanceOutDetails) {
            // console.log('props 2 = ', props);
            // console.log('state 2 = ', state);
            _balanceOutDetails = props.balanceOutDetails
            _balanceDetails = props.balanceDetails
            _current_page = props.balanceOutDetails.current_page
            _per_page = props.balanceOutDetails.per_page
            _total = props.balanceOutDetails.total
        }
        if(props.analyticCard !== state.analyticCard) {
            _analyticCard = props.analyticCard.data
            _balanceDetails = props.balanceDetails
            _balanceOutDetails = props.balanceOutDetails
            _current_page = props.analyticCard.current_page
            _per_page = props.analyticCard.per_page
            _total = props.analyticCard.total
        }
        return { 
            companies: _companies,
            selectedCompany: _selectedCompany,
            balanceDetails: _balanceDetails,
            balanceOutDetails: _balanceOutDetails,
            analyticCard: _analyticCard,
            current_page: _current_page,
            per_page: _per_page,
            total: _total
            
        }
    }

    changeCompany = (company) => {
        if(this.state.selectedKonto.length > 0 || this.state.selectedKonto !== undefined) {
            this.setState({
                selectedCompany: company,
                selectedKonto: "",
                showBalanceDetails: false,
                balanceDetails: [],
                balanceOutDetails: [],
                showACdetails: false
            })
        } else {
            this.setState({
                selectedCompany: company
            })
        }
    }
    
    changeKonto = (konto) => {
        if(this.state.selectedCompany.value !== undefined && this.state.selectedCompany.value.length > 1) {
            this.setState({
                selectedKonto: konto,
                showBalanceDetails: true,
                showACdetails: false
            })
            let details = {
                supplier_id: this.state.selectedCompany.value,
                konto: konto.value
            }

            let newDate = new Date()
            let _date = moment(newDate).format('YYYY-MM-DD 00:00:00');
            let details_out = {
                supplier_id: this.state.selectedCompany.value,
                konto: konto.value,
                date: _date
            }
            this.props.getBalance(details)
            this.props.getBalance_out(details_out)
        } else {
            alert("Morate izabrati firmu!")
        }
    }

    analyticCard_click = () => {
        this.setState({ showACdetails: !this.state.showACdetails})
        let details = {
            supplier_id: this.state.selectedCompany.value,
            konto: this.state.selectedKonto.value
        }
        this.props.getAnalyticCard(details)
    }

    setActivePage = (current_page) => {
        let details = {
            supplier_id: this.state.selectedCompany.value,
            konto: this.state.selectedKonto.value,
            page: current_page
        }
        this.props.getAnalyticCard(details)
    }


    render(){
        const options = [
            { value: '2020', label: '2020 - Kupci' },
            { value: '2021', label: '2021 - Kupci u maloprodaji' },
            { value: '4330', label: '4330 - Dobavljači' },
            { value: '4340', label: '4340 - Ino dobavljači' },
          ]

        return(
            <div>
                {/* <Header /> */}
                <div className="col-sm-12 height-styleFinance bck">
                    <form name="checkForm" className="setOpacity banacecheckForm" onSubmit={this.submitForm}>
                        <div className="box-body">
                            <div className="form-group setColor">
                                <h6 className="vendorShopsTitle">Analitička kartica:</h6>
                            </div>
                            <div className="form-group">
                                <Select placeholder="Izaberite firmu" 
                                    value={this.state.selectedCompany}
                                    options={this.state.companies} 
                                    onChange={this.changeCompany} 
                                    />
                            </div>
                            <div className="form-group">
                                <Select placeholder="Izaberite konto" 
                                    value={this.state.selectedKonto}
                                    options={options} 
                                    onChange={this.changeKonto}
                                    />
                            </div>
                        </div>
                    </form>


                    {
                        this.state.showBalanceDetails ?

                            <form name="detailsForm">
                            <div className="form-group bananceDetailsForm" >
                                <label className="setColor">Saldo van valute</label>
                                <input type="text" 
                                    className="form-control balanceField balanceOutOf" 
                                    readOnly style={{'background':'white', 'fontWeight':'bold'}}
                                    value={this.state.balanceOutDetails !== undefined ? parseFloat(this.state.balanceOutDetails.duguje - this.state.balanceOutDetails.potrazuje).toLocaleString()  : ""}
                                    />
                            </div>
                            <div className="form-group bananceDetailsForm" >
                                <label className="setColor">Saldo</label>
                                <input type="text" 
                                    className="form-control balanceField" 
                                    readOnly style={{'background':'white','fontWeight':'bold'}}
                                    value={this.state.balanceDetails !== undefined ? parseFloat(this.state.balanceDetails.duguje - this.state.balanceDetails.potrazuje).toLocaleString()  : ""}
                                    />
                            </div>
                            <div className="form-group bananceDetailsForm" >
                                <label className="setColor">Duguje</label>
                                <input type="text" 
                                    className="form-control balanceField" 
                                    readOnly style={{'background':'white'}}
                                    value={this.state.balanceDetails !== undefined ? parseFloat(this.state.balanceDetails.duguje).toLocaleString() : ""}
                                    />
                            </div>
                            <div className="form-group bananceDetailsForm" >
                                <label className="setColor">Potražuje</label>
                                <input type="test" 
                                    className="form-control balanceField" 
                                    readOnly style={{'background':'white'}}
                                    value={this.state.balanceDetails !== undefined ? parseFloat(this.state.balanceDetails.potrazuje).toLocaleString() : ""}
                                    />
                            </div>
                            <div className="bananceDetails setColor acTitle">
                                <h6 className="vendorShopsTitle"
                                    onClick={this.analyticCard_click}>
                                    Detaljna analitička kartica >> 
                                </h6>
                            </div>
                        </form>

                        : ""
                    }


                    {
                        this.state.showACdetails ? 

                        <table className=" table table-striped col-sm-12"> 
                        <thead className="tableHeader">
                            <tr className="sortCursor">
                                <th className="thAnalticalItem" >
                                    Datum
                                </th>
                                <th className="thAnalticalItem rightAlign">
                                    Duguje
                                </th>
                                <th className="thAnalticalItem rightAlign">
                                    Potražuje
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {    
                            this.state.analyticCard !== undefined ?
                               this.state.analyticCard.map((ac, index) => {
                                   return <AnalyticCardItem 
                                            key={index}
                                            date={ac.date}
                                            dug={ac.dug}
                                            pot={ac.pot}
                                        />
                               })
                            : <tr></tr>
                           }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="pagination-sm">
                                    <Pagination 
                                        activePage={this.state.current_page} 
                                        itemsCountPerPage={this.state.per_page} 
                                        totalItemsCount={this.state.total} 
                                        pageRangeDisplayed={5}
                                        onChange={this.setActivePage}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                        : ""
                    }

                        

                </div>
            </div>
        )
    }
}

export default withRouter(Finance)