import React from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

class Article extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quantity: "",
            items: [],
            discount: ''
        }
    }

    changeQuantity = (input) => {
        this.setState({
            quantity: parseInt(input.target.value)
        })
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        if(nextProps.items !== prevProps.items) {
            return {
                items : nextProps.items

            }
        }
        return null
    }


    addItemInCart = () => {
        var cmp = JSON.parse(localStorage.getItem('company'))
        var discount = (100 - (parseFloat(cmp.discount)))/100
        var item = {
            article_id: this.props.id,
            article_name: this.props.name,
            price: (parseFloat(this.props.price)*discount).toFixed(2),
            quantity: this.state.quantity,
            tax: this.props.tax === "A" ? "0.21" : "0.07" 
        }
        if(item.quantity && item.quantity > 0) {
            var allow = true

            var _items = JSON.parse(localStorage.getItem('cart'))

            // this.state.items.map(it => {
                if(_items !== null) {

                    _items.map(it => {
                        if(it.article_id === item.article_id){
                            allow = false
                            this.setState({
                                quantity: ""
                            })
                        }
                        return allow
                    })

                }

            
            if(allow) {
                this.props.addItem(item)
                this.setState({
                    quantity: ""
                })
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Proizvod se vec nalazi u korpi!',
                    showConfirmButton: false,
                    timer: 2000
                  })
                
            }
        } else {
            this.setState({
                quantity: ""
            })
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Unesite ispravnu vrijednost za količinu!',
                showConfirmButton: false,
                timer: 2000
              })
        }
    }

 
    render() {
        var cmp = JSON.parse(localStorage.getItem('company'))
        // var discount = 1 + (parseFloat(cmp.discount).toFixed(2) / 100)
        var discount = (100 - (parseFloat(cmp.discount)))/100

        return(
            <tr>
                <td className="tableBody cartItemName" > {this.props.name || ""}</td>
                <td className="tableBody cartItem">                   
                    <input className="cartField inputWidth" value={parseFloat(this.props.count).toFixed(0) || ""} readOnly/>
                </td >
                <td className="tableBody cartItem">
                    {/* <input className="cartField inputWidth" value={parseFloat(this.props.price).toFixed(2) || ""} readOnly/> */}
                    <input className="cartField inputWidth" value={(parseFloat(this.props.price)*discount).toFixed(2) || ""} readOnly/>
                </td>
                <td className="tableBody cartItem">
                    <input className="cartField inputWidth shadow inputFont" type="number" value={this.state.quantity || ""} onChange={this.changeQuantity}/>
                </td>
                <td className="tableBody cartItem cartDelImg" >
                    {/* <span className="input-group-text addToCart" onClick={() => this.test()}>  */}
                        <img className="imgCartStyle" src="add.png" alt="user" onClick={this.addItemInCart}></img>
                    {/* </span> */}
                </td>
            </tr>
        )
    }
}

export default withRouter(Article)