import React from 'react'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { userPath } from '../constants/path'
import ReactLoading from 'react-loading'

class ChooseShop extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            companies: '',
            companiesForSelect: '',
            selectedCompany: [],
            shops: '',
            shopsForSelect: '',
            selectedShop: [],
            isValidCredentials: false,
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.getCompany();
        if(this.props.user !== undefined) {
            if(this.props.user.length === 0) {
                var storageCompany = JSON.parse(localStorage.getItem('company'))
                if(storageCompany !== null) {
                    this.props.getShops(storageCompany.value)
                }
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        let _isLoading
        let _user, _companies, shps, _selectedCompany, _selectedShop, _isValidCredentials
        if(nextProps.user !== prevProps.user) {
            _user= nextProps.user.details
            if(nextProps.companies !== prevProps.companies) {
                _isLoading = true
                _selectedCompany = nextProps.selectedCompany
                // _selectedShop = nextProps.selectedShop
                if(nextProps.selectedShop === prevProps.selectedShop) {
                    _selectedShop = []
                    if(nextProps.selectedShop.length === 0) {
                        _isValidCredentials = false
                    } else {
                        _isValidCredentials = true
                    }
                }
                if(nextProps.shops !== prevProps.shops) {
                    _selectedShop = []
                    _isValidCredentials = false
                }
                shps = nextProps.shops.map(shop => {
                    return {
                        value: shop.shop_id,
                        label: shop.shop_name,                        
                    }
                })
                _companies = nextProps.companies.map(comp => {
                    return {
                        value: comp.company_id,
                        label: comp.company_name,
                        discount: comp.discount
                    }
                })
            }

            if(nextProps.selectedCompany === prevProps.selectedCompany) {
                _isLoading = false

                _selectedShop = [] 
                _isValidCredentials = false
                if(nextProps.selectedShop === prevProps.selectedShop) {
                    _selectedCompany = nextProps.selectedCompany
                    _selectedShop = nextProps.selectedShop
                    if(nextProps.selectedShop !== undefined && prevProps.selectedShop !== undefined) {
                        if(nextProps.selectedShop.length === 0 && prevProps.selectedShop.length === 0) {
                            _isValidCredentials = false
                        } else {
                            _isValidCredentials = true

                        }
                    }


                    // _isValidCredentials = true
                }
                if(nextProps.selectedCompany.length === 0){
                    _isValidCredentials = false
                }
            }

            if(nextProps.shops !== prevProps.shops) {
                shps = nextProps.shops.map(shop => {
                    return {
                        value: shop.shop_id,
                        label: shop.shop_name,                        
                    }
                })
                _selectedCompany = nextProps.selectedCompany
                _selectedShop = nextProps.selectedShop
                if(nextProps.selectedCompany === prevProps.selectedCompany) {
                    _selectedShop = []
                    if(nextProps.selectedCompany.length === 0) {
                        _isValidCredentials = false
                    } else {
                        _isValidCredentials = true
                    }
                }
                if(nextProps.selectedShop === prevProps.selectedShop) {
                    _selectedShop = []
                    if(nextProps.selectedShop.length === 0) {
                        _isValidCredentials = false
                    } else {
                        _isValidCredentials = true
                    }
                }

                if(_selectedCompany.length === 0 || _selectedShop.length === 0) {
                    _isValidCredentials = false
                }
            }
            
            if(prevProps.user === undefined) {
                _isLoading = false
                var storageShop = JSON.parse(localStorage.getItem('shop'))
                if(storageShop !== null) {
                    if(storageShop.length === 0) {
                        _isValidCredentials = false
                    } else {
                        _isValidCredentials = true
                    }
                }
            }

            return { 
                companies: _companies,
                shops: nextProps.shops,
                shopsForSelect: shps,
                user: _user,
                selectedCompany: _selectedCompany,
                selectedShop: _selectedShop,
                isValidCredentials: _isValidCredentials,
                //
                isLoading: _isLoading
            }
        }
    }


    changeCompany = (company) => {
        localStorage.setItem('company',JSON.stringify(company))
        localStorage.setItem('shop', JSON.stringify(""))
        var storageCompany = JSON.parse(localStorage.getItem('company'))

        this.props.addCompany(company)
        this.props.addShop("")
        if(this.state.selectedCompany.value !== company.value) {
            this.props.resetShoppingCart()
        }

        if(this.state.user !== undefined) {
            this.props.getShops(company.value)
        } else {
            this.props.getShops(storageCompany.value)
        }
        this.setState({
            selectedCompany: company,
            selectedShop: [],
            isValidCredentials: false             
        })

    }

    changeShop = (shop) => {
        localStorage.setItem('shop',JSON.stringify(shop))
        this.props.addShop(shop)
        this.setState({
            selectedShop: shop,
            isValidCredentials: true
        })
    }


    submitForm = (e) => {
        e.preventDefault()
        if(this.state.isValidCredentials) {
            this.props.addShop(this.state.selectedShop)
            // let path = userPath.order
            let path = userPath.storeSurvey
            this.props.history.push(path)
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Morate odabrati firmu/prodavnicu!',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
   
    render() {
        var storageUser = JSON.parse(localStorage.getItem('user'))
        return (
            <div>
                {/* <Header /> */}
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
                                            <img className="imgStyle" src="boy.png" alt="user"></img>
                                        </span>
                                    </div>
                                    <input className="form-control setFont setColor" placeholder="Ime" 
                                        value={this.state.user !== undefined ? this.state.user.name : storageUser.name} 
                                        disabled style={{'backgroundColor':'white'}}/>
                                </div> 
                            </div>
                            <form name="addForm" className="setOpacity" onSubmit={this.submitForm}>
                                <div className="box-body">
                                    <div className="form-group setColor">
                                        <h6 className="vendorShopsTitle">Pregled svih prodavnica:</h6>
                                    </div>
                                    <div className="form-group">
                                        <Select placeholder="Izaberite firmu" 
                                            // value={this.state.user !== undefined ? this.state.selectedCompany : JSON.parse(localStorage.getItem('company'))}
                                            value={JSON.parse(localStorage.getItem('company'))}
                                            options={this.state.companies} 
                                            onChange={this.changeCompany} />
                                    </div>
                                    <div className="form-group">
                                        <Select placeholder="Izaberite objekat" 
                                            // value={this.state.user !== undefined ? this.state.selectedShop : JSON.parse(localStorage.getItem('shop'))}
                                            value={JSON.parse(localStorage.getItem('shop'))}
                                            options={this.state.shopsForSelect} 
                                            onChange={this.changeShop} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <button className="btn btn-block loginBtn form-control" type="submit">Nastavi narudzbinu</button>
                                    </div> 
                                </div>
                            </form>
                        </>
                    }

                </div>
            </div>

        )
    }
}

export default withRouter(ChooseShop)