import React from 'react'
import { withRouter } from 'react-router-dom'
import ShoppingCartItemCnt from '../containers/ShoppingCartItemCnt'
import moment from 'moment'
import ModalCmp from './ModalCmp'
import { userPath } from '../constants/path'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            total: 0,
            tax: 0,
            id: "",
            showModal: false,
            items: [],
            isLoading: false,
            isWritten: false,

            // showSuccessModal: false,
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            localStorage.setItem('latitude',position.coords.latitude)
            localStorage.setItem('longitude',position.coords.longitude)
          });
    }

    backToOrders = () => {
        let path = userPath.order
        this.props.history.push(path)
    }

    deleteItem = (item) => {
        this.props.deleteItem(item)
    }

    showModalClick = () => {
        this.setState({
            showModal: true
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    closeSuccessModal = () => {
        this.setState({
            showSuccessModal: false
        })
        this.props.resetIsWrittenStore()
        this.props.resetIsWrittenSchedule()
        this.props.resetIsWrittenItem()

        let path = userPath.login
        this.props.history.push(path)
    }

    
    static getDerivedStateFromProps(nextProps, prevProps) {
        var sum = [], _items = []
        var _tax, _isWritten = false
        if(nextProps.items !== prevProps.items ) {
            _items = nextProps.items
            if(nextProps.items !== undefined) {
                var _dsc
                var x = nextProps.items.map(item => {
                    if(isNaN(item.discount)) {
                        _dsc = 0
                    } else {
                        _dsc = parseFloat(item.discount)
                    }
                    return (item.quantity)*parseFloat(item.price)*(100-_dsc)/100
                })
                if(x.length > 0) {
                     sum = x.reduce((result,number)=> result+number).toFixed(2);    
                }
                
                let _tax2 = nextProps.items.map(item => {
                    return (item.quantity)*parseFloat(item.price)*(100-_dsc)/100*parseFloat(item.tax)
                })
                if(_tax2.length > 0) {
                    _tax = _tax2.reduce((result,number)=> result+number).toFixed(2);   
                }

            }
            if(nextProps.user !== undefined) {
                if(nextProps.user.length === 0) {
                    var y
                    _items = JSON.parse(localStorage.getItem('cart'))
                    if(JSON.parse(localStorage.getItem('cart')) !== null ) {
                        y = JSON.parse(localStorage.getItem('cart')).map(item => {
                            if(isNaN(item.discount)) {
                                _dsc = 0
                            } else {
                                _dsc = parseFloat(item.discount)
                            }
                            return (item.quantity)*parseFloat(item.price)*(100-_dsc)/100
                        })
                        if(y.length > 0) {
                             sum = y.reduce((result,number)=> result+number).toFixed(2);    
                        }
                    } 
                    if(JSON.parse(localStorage.getItem('cart')) !== null ) {
                        let _tax2 = JSON.parse(localStorage.getItem('cart')).map(item => {
                            return (item.quantity)*parseFloat(item.price)*(100-_dsc)/100*parseFloat(item.tax)
                        })
                        if(_tax2.length > 0) {
                            _tax = _tax2.reduce((result,number)=> result+number).toFixed(2);   
                       }
                    } 
                }
            }
            if(nextProps.item !== undefined && prevProps.items !== undefined) {
                if(nextProps.items.length === 0 && prevProps.items.length === 0) {
                    _items = JSON.parse(localStorage.getItem('cart'))
                }
            }

            if(nextProps.isWrittenStoreSurvey && nextProps.isWrittenSchedule && nextProps.isWrittenInvoiceItem) {
                _isWritten = true
            }
        }
        return {
            items: _items,
            total: parseFloat(sum),
            tax: parseFloat(_tax),
            // id: parseInt(nextProps.id),
            id: parseInt(nextProps.id),
            showSuccessModal: _isWritten
        }
    }

    sendOdrer = () => {
        var header = []
        let newDate = new Date()
        let _date = moment(newDate).format('YYYY-MM-DD 00:00:00');
        let _datetime = moment(newDate).format('YYYY-MM-DD hh:mm:ss');
        var user = JSON.parse(localStorage.getItem('user'))
        var company = JSON.parse(localStorage.getItem('company'))
        var shop = JSON.parse(localStorage.getItem('shop'))
        header = {
            id: parseInt(this.state.id) + 1,
            user_id: user.operater,
            company_id: company.value,
            shop_id: shop.value,
            date: _date,
            kni: 1,
            storno: 0,
            preuzeto: 1,
            datetime: _datetime,
            brfak: 0,
            //add coo.
            latitude: JSON.parse(localStorage.getItem('latitude')),
            longitude: JSON.parse(localStorage.getItem('longitude')),
        }
        this.props.setInvoiceHeader(header)

        var _items
        if(this.props.items.length > 0) {
            _items = this.props.items.map((item, index) => {
                return {
                    rbr: index+1,
                    broj: parseInt(this.state.id) + 1,
                    sifra: item.article_id,
                    koli: item.quantity,
                    v_cije: item.price,
                    rabat: item.discount === undefined || isNaN(item.discount) ? 0 : item.discount
                }
            })
        } else {
            _items =  JSON.parse(localStorage.getItem('cart')).map((item, index) => {
                return {
                    rbr: index+1,
                    broj: parseInt(this.state.id) + 1,
                    sifra: item.article_id,
                    koli: item.quantity,
                    v_cije: item.price,
                    rabat: item.discount === undefined || isNaN(item.discount) ? 0 : item.discount
                }
            })
        }


        // _items.forEach(item => {
        //     this.props.setInvoiceItems(item)
        // });


        //
        // ITEMS
        //
        this.props.setInvoiceItems(_items)
        //
        //END
        //




        //
        //ANKETA
        //
        // proslijediti laravelu niz/objekat za oba slucaja i items i store survey items
        let surveyObject = JSON.parse(localStorage.getItem('survey')).map(item => {
            return {
                company_id: company.value,
                shop_id: shop.value,
                user_id: user.operater,
                date: _date,
                survey_id: item.survey_id,
                //
                latitude: JSON.parse(localStorage.getItem('latitude')),
                longitude: JSON.parse(localStorage.getItem('longitude')),
            }
        })
        this.props.storeSurvey(surveyObject)
        //
        //END
        //



        //
        //RASPORED
        //
        //write row in shadule history
        //
        //
        let sheduleItem = {
            company_id: company.value,
            company_name: company.label,
            shop_id: shop.value,
            shop_name: shop.label,
            user_id: user.operater,
            date: _date,
        }
        this.props.writeScheduleHist(sheduleItem)
        //
        //end
        //


        //restet store survey status
        //set isWriten to false
        this.props.resetStoreSurvey()
        //
        this.closeModal()
        this.props.resetShoppingCart()
        // this.resetInvoiceID()    



        this.logout()



        //remove storeSurvey items from local storage
        localStorage.removeItem('survey')
        localStorage.removeItem('latitude')
        localStorage.removeItem('longitude')
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('company')
        localStorage.removeItem('shop')
        localStorage.removeItem('cart')
        localStorage.removeItem('user')
        localStorage.removeItem('latitude')
        localStorage.removeItem('longitude')
        this.props.resetSelectedCompany()
        this.props.resetSelectedShop()

        let path = userPath.login
        this.props.history.push(path)
    }

    resetInvoiceID = () => {
        this.setState({
            id: 0,
            total: 0,
            tax: 0
        })
    }

    getId = () => {
        if(this.state.total > 0) {
            this.props.getInvoiceId()
            // this.setState({
            //     showModal: true
            // })
            this.setState({isLoading: true})
            setTimeout(() => this.setState({ showModal: true, isLoading: false}), 1500)
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Korpa je prazna!',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    deleteCart = () => {
        Swal.fire({
            title: 'Da li ste sigurni?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            // showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Da!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('cart')
                this.props.resetShoppingCart()
              Swal.fire(
                'Obrisana!',
                'Korpa je uspješno obrisana!',
                'success'
              )
              let path = "/katalogProizvoda"
              this.props.history.push(path)
            }
          })
    }

    render() {
        return(


            this.state.isLoading 
            ? 
            <div className="bckOrdersShoppCart">
                <div style={{width:'50px', height:'50px', marginLeft:'45%', paddingTop:'50%'}}>
                    <ReactLoading type="spin"  style={{'textAlign':'left'}} />
                </div>
            </div>
            : 
            <div className="bckOrdersShoppCart">
                <div  className="col-sm-12 ">
                    <div className="row">
                        <div className="col-sm-12 cartPadding" >
                            <div className="col-sm-6 cartBackImg" >
                                <img className="imgStyle" src="back.png" alt="back" onClick={()=>this.backToOrders()} />
                            </div>
                            <div className="col-sm-6 cartNextImg" style={{'width':'30%'}}>
                                <img className="imgStyle" src="arrow.png" alt="send" onClick={()=>this.getId()} />
                            </div>
                        </div>
                    </div>
                   <div className="row">

                   <table className="table table-striped col-sm-12"> 
                        <thead className="tableHeader">
                            <tr className="sortCursor">
                                <th className="thCartName">
                                    Naziv
                                </th>
                                <th className="thCart">
                                    Kol
                                </th>
                                <th className="thCart">
                                    &euro;
                                </th>
                                <th className="thCart">
                                    %
                                </th>
                                <th className="thCart">
                                &euro;-%
                                </th>
                                <th className="thCart">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items !== null  ?
                                this.state.items.map( (item, index) => {
                                    return <ShoppingCartItemCnt
                                        // key={item.article_id}
                                        key={index}
                                        counter={index+1}
                                        id={item.article_id}
                                        name={item.article_name}
                                        quantity={item.quantity}
                                        price={item.price}
                                        discount={item.discount}
                                        // tax={item.tax}
                                        deleteItem={() => this.deleteItem(item)}
                                    />
                                })
                                : <tr></tr>
                            }
                        </tbody>
                    </table>
                   </div>

                    <div className="row countCart">
                        <div className="col-sm-4 col-md-4"></div>
                        <div className="col-sm-4 col-md-4"></div>
                        <div className="form-group col-sm-3 col-md-4">
                            <label>Ukupno:</label>
                            <input type="text" className="form-control inpytCart" value={isNaN(this.state.total) ? 0 : this.state.total.toFixed(2)} readOnly/>
                            <input type="text" className="form-control inpytCart" value={isNaN(this.state.tax) ? 0 : this.state.tax.toFixed(2)} readOnly/>
                            <input type="text" className="form-control inpytCart" value={isNaN(this.state.tax) ? 0 : (this.state.total+this.state.tax).toFixed(2)} readOnly/>
                        </div>    
                    </div>
               
                    <div className="row">
                        <div className="col-sm-12 cartPadding" >
                            <div className="col-sm-6 cartBackImg">
                                <img className="imgStyle" src="back.png" alt="back" onClick={()=>this.backToOrders()} />
                            </div>
                            <div className="col-sm-6 cartNextImg" style={{'width':'30%'}}>
                                <img className="imgStyle" src="arrow.png" alt="send" onClick={()=>this.getId()} />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-danger surveyButton" 
                        style={{'position':'fixed', 'bottom':'5px', 'right':'2px', 'left': '4px'}}
                        onClick={this.deleteCart}
                    >
                        Isprazni korpu: {this.state.items !== null ? this.state.items.length : 0} Artik. 
                    </button>

                </div>

                <ModalCmp 
                        sureMessage="Da li ste sigurni?"
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        sendOdrer={this.sendOdrer}
                        items={this.props.items}
                />
            </div>
        )
    }
}

export default withRouter(ShoppingCart)