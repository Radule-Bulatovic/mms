import React from 'react'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { userPath } from '../constants/path'
import ReactLoading from 'react-loading'

class VendorShops extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            shops: [],
            selectedCompany: '', 
            selectedShop: '',
            isValidCredentials: false,
            isLoading: true
        }
    }


    componentDidMount() {
        if(this.state.user !== undefined) {
            this.props.getShopsForUser(this.state.user.operater)
        } else {
            var storageCompany = JSON.parse(localStorage.getItem('user'))
            this.props.getShopsForUser(storageCompany.operater)
        }
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        var _isLoading = true
        let _user, _shops, _selectedCompany, _selectedShop, _isValidCredentials = false
        if(nextProps.user !== prevProps.user) {
            _user= nextProps.user.details
            if(nextProps.shops !== prevProps.shops) {
                if(nextProps.selectedShop !== undefined) {
                    _isValidCredentials = false
                    if(nextProps.selectedShop.length > 0) {
                        _isValidCredentials = true
                    }
                }
                //back from orders to choose shop page, hold a values for selected company and shop
                if(nextProps.selectedCompany === prevProps.selectedCompany && nextProps.selectedShop === prevProps.selectedShop) {
                    _selectedCompany = nextProps.selectedCompany
                    _selectedShop = nextProps.selectedShop
                    _isValidCredentials = true
                    if(nextProps.selectedShop.length === 0) {
                        _isValidCredentials = false
                    }
                }
                _shops = nextProps.shops.map(shop => {
                    return {
                        value: shop.shop_id,
                        label: shop.shop_name,
                        company_id: shop.company_id,
                        company_name: shop.company_name,
                        discount: shop.discount,

                    }
                })
            }
        }
        if(nextProps.selectedCompany !== prevProps.selectedCompany) {
            _selectedCompany = nextProps.selectedCompany
            _selectedShop = nextProps.selectedShop
            _isValidCredentials = true
            if(nextProps.selectedCompany.length === 0) {
                _isValidCredentials = false
            }
        }

        if(nextProps.shops.length > 0) {
            _isLoading = false
        }

        return { 
            user: _user,
            shops: _shops,
            selectedCompany: _selectedCompany,
            selectedShop: _selectedShop,
            isValidCredentials: _isValidCredentials,
            //
            isLoading: _isLoading
        }
    }


    changeCompany = (company) => {
        if(company.value !== this.props.selectedShop.value) {
            this.props.resetShoppingCart()
        }
        var _company = {
            value: company.company_id,
            label: company.company_name,
            discount: company.discount
        }
        var _shop = {
            value: company.value,
            label: company.label
        }
        localStorage.setItem('company',JSON.stringify(_company))
        localStorage.setItem('company',JSON.stringify(_company))
        localStorage.setItem('shop',JSON.stringify(_shop))
        this.props.addCompany(_company)
        this.props.addShop(_shop)
        this.setState({
            selectedCompany: company,
            selectedShop: _shop,
            isValidCredentials: true
        })
    }

    shops = () => {
        let path = userPath.shops
        this.props.history.push(path)
    }

    orders = () => {
        if(this.state.isValidCredentials || JSON.parse(localStorage.getItem('shop'))) {
            // let path = userPath.order
            let path = userPath.storeSurvey
            this.props.history.push(path)
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Morate odabrati prodavnicu!',
                showConfirmButton: false,
                timer: 1500
              })
        }

    }

    render() {
        var storageCompany = JSON.parse(localStorage.getItem('user'))
        return (
            <div>
                <div className="col-sm-12 height-style bck">
                    {
                        this.state.isLoading
                        ?
                        <div style={{width:'50px', height:'50px', marginLeft:'45%', paddingTop:'50%'}}>
                            <ReactLoading type="spin"  style={{'textAlign':'left'}} />
                        </div>
                        :
                        <>
                            <div className="form-group ">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text whiteSpan"> 
                                            {/* <i className="fa fa-user"></i> */}
                                            <img className="imgStyle" src="boy.png" alt="user"></img>
                                        </span>
                                    </div>
                                    <input className="form-control setFont setColor" 
                                        value={this.state.user !== undefined ? this.state.user.name : storageCompany.name} 
                                        disabled 
                                        style={{'backgroundColor':'white'}} 
                                        />
                                </div> 
                            </div>
                            {/* <form name="addForm" className="setOpacity" onSubmit={this.submitForm}> */}
                                <div className="box-body">
                                    <div className="form-group setColor">
                                        <h6 className="vendorShopsTitle">Pregled komercijalistinih prodavnica:</h6>
                                    </div>
                                    <div className="form-group">
                                        <Select placeholder="Izaberite prodavnicu" 
                                            // value={this.state.user !== undefined ? this.state.selectedShop : JSON.parse(localStorage.getItem('shop'))}
                                            value={JSON.parse(localStorage.getItem('shop'))}
                                            options={this.state.shops} 
                                            onChange={this.changeCompany} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <button className="btn btn-block shopsBtn form-control" onClick={this.shops} >Pregled svih prodavnica</button>
                                    </div> 
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <button className="btn btn-block loginBtn form-control" onClick={this.orders} >Nastavi narudžbinu</button>
                                    </div> 
                                </div>
                            {/* </form> */}
                            </>
                        }
                </div>
            </div>

        )
    }
}

export default withRouter(VendorShops)