import React from 'react'
import { withRouter } from 'react-router-dom'

class ShoppingCartItem extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            quantity: this.props.quantity,
            discount: this.props.discount,
        }
    }


    changeQuantity = (input) => {
        let article = {
            id: this.props.id,
            name: this.props.name,
            quantity: parseInt(input.target.value),
            price: this.props.price,
            discount: this.props.discount
        }
        this.props.editQuantity(article)    
        this.setState({
            quantity: parseInt(input.target.value),
        })
    }

    changePrice = () => {}

    changeDiscount = (input) => {
        if(input.target.value >= 0 ) {
            if(input.target.value < 100) {
                let article = {
                    id: this.props.id,
                    name: this.props.name,
                    quantity: parseInt(this.state.quantity),
                    // price: _price,
                    price: this.props.price,
                    discount: parseFloat(input.target.value).toFixed(2),
                    tax: this.props.tax
                }
                this.props.editQuantity(article)    
                this.setState({
                    discount: parseFloat(input.target.value),

                })
            }
        } else {
            alert("Unesite ispravan popust!")
            this.setState({
                discount: 0
            })
        }
    }
    
    render() {
        return(
            <tr>
                <td className="tableBody cartItemName" >{this.props.name}</td>
                <td className="tableBody cartItem" >                   
                    <input className="cartField inputWidth" type="number" min="0" max="9999" value={this.state.quantity || 0} onChange={this.changeQuantity} style={{'padding':'0px'}}/>
                </td>
                <td className="tableBody cartItem">
                    <input className="cartField inputWidth" type="number" min="0" max="9999" value={this.props.price || 0} onChange={this.changePrice}  style={{'padding':'0px'}}/>
                </td>
                <td className="tableBody cartItem">
                    <input className="cartField inputWidth" 
                        type="number" step="0.01" value={isNaN(this.state.discount) ? 0 : this.state.discount } 
                        onChange={this.changeDiscount}  
                        style={{'padding':'0px'}}
                        />
                </td>
                <td className="tableBody cartItem">
                    <input className="cartField inputWidth" 
                        type="number" min="0"
                        // value={ this.state.discount === undefined || isNaN(this.state.discount) ? this.props.price : (this.props.price / (1 + this.state.discount/100)).toFixed(2)} 
                        value={ this.state.discount === undefined || isNaN(this.state.discount) ? this.props.price : (this.props.price * ( (100 - this.state.discount)/100) ).toFixed(2)} 
                        readOnly 
                        style={{'padding':'0px'}}
                    />
                </td>
                <td className="tableBody cartDelImg inputWidth" >
                    <span className="input-group-text whiteSpan"> 
                        <img className="imgStyle " src="delete.png" alt="user" onClick={this.props.deleteItem}  style={{'marginLeft':'-10px'}}></img>
                    </span>
                </td>
            </tr>
        )
    }
}

export default withRouter(ShoppingCartItem)