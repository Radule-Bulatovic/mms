import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeQuantity_success } from "../../actions/shoppingCart.action";

const ShoppingCartItem = (props) => {
  const dispatch = useDispatch();

  const changeQuantity = (input) => {
    let article = {
      id: props.id,
      name: props.name,
      quantity: parseInt(input.target.value),
      price: props.price,
      discount: props.discount,
    };
    dispatch(changeQuantity_success(article));
  };

  const changePrice = () => {};

  const changeDiscount = (input) => {
    if (input.target.value >= 0) {
      if (input.target.value < 100) {
        let article = {
          id: props.id,
          name: props.name,
          quantity: parseInt(props.quantity),
          // price: _price,
          price: props.price,
          discount: parseFloat(input.target.value).toFixed(2),
          tax: props.tax,
        };
        dispatch(changeQuantity_success(article));
      }
    } else {
      alert("Unesite ispravan popust!");
    }
  };

  return (
    <tr>
      <td className="tableBody cartItemName">{props.name}</td>
      <td className="tableBody cartItem">
        <input
          className="cartField inputWidth"
          type="number"
          min="0"
          max="9999"
          value={props.quantity || 0}
          onChange={changeQuantity}
          style={{ padding: "0px" }}
        />
      </td>
      <td className="tableBody cartItem">
        <input
          className="cartField inputWidth"
          type="number"
          min="0"
          max="9999"
          value={props.price || 0}
          onChange={changePrice}
          style={{ padding: "0px" }}
        />
      </td>
      <td className="tableBody cartItem">
        <input
          className="cartField inputWidth"
          type="number"
          step="0.01"
          value={isNaN(props.discount) ? 0 : props.discount}
          onChange={changeDiscount}
          style={{ padding: "0px" }}
        />
      </td>
      <td className="tableBody cartItem">
        <input
          className="cartField inputWidth"
          type="number"
          min="0"
          // value={ props.discount === undefined || isNaN(props.discount) ? props.price : (props.price / (1 + props.discount/100)).toFixed(2)}
          value={
            props.discount === undefined || isNaN(props.discount)
              ? props.price
              : (props.price * ((100 - props.discount) / 100)).toFixed(2)
          }
          readOnly
          style={{ padding: "0px" }}
        />
      </td>
      <td className="tableBody cartDelImg inputWidth">
        <span className="input-group-text whiteSpan">
          <img
            className="imgStyle "
            src="delete.png"
            alt="user"
            onClick={props.deleteItem}
            style={{ marginLeft: "-10px" }}
          ></img>
        </span>
      </td>
    </tr>
  );
};

export default withRouter(ShoppingCartItem);
