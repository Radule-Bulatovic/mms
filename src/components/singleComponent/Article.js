import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

const Article = (props) => {
  const [quantity, setquantity] = useState("");
  const [items, setitems] = useState([]);
  const [discount, setdiscount] = useState("");

  const changeQuantity = (input) => setquantity(parseInt(input.target.value));
  // static getDerivedStateFromProps(nextProps, prevProps) {
  //     if(nextProps.items !== prevProps.items) {
  //         return {
  //             items : nextProps.items

  //         }
  //     }
  //     return null
  // }

  const addItemInCart = () => {
    var cmp = JSON.parse(localStorage.getItem("company"));
    var discount = (100 - parseFloat(cmp.discount)) / 100;
    var item = {
      article_id: props.id,
      article_name: props.name,
      price: (parseFloat(props.price) * discount).toFixed(2),
      quantity: quantity,
      tax: props.tax === "A" ? "0.21" : "0.07",
    };
    if (item.quantity && item.quantity > 0) {
      var allow = true;

      var _items = JSON.parse(localStorage.getItem("cart"));

      // state.items.map(it => {
      if (_items !== null) {
        _items.map((it) => {
          if (it.article_id === item.article_id) {
            allow = false;
            setquantity("");
          }
          return allow;
        });
      }

      if (allow) {
        props.addItem(item);
        setquantity("");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Proizvod se vec nalazi u korpi!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      setquantity("");

      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Unesite ispravnu vrijednost za količinu!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  var cmp = JSON.parse(localStorage.getItem("company"));
  // var discount = 1 + (parseFloat(cmp.discount).toFixed(2) / 100)
  var discountvar = (100 - parseFloat(cmp.discount)) / 100;

  return (
    <tr>
      <td className="tableBody cartItemName"> {props.name || ""}</td>
      <td className="tableBody cartItem">
        <input
          className="cartField inputWidth"
          value={parseFloat(props.count).toFixed(0) || ""}
          readOnly
        />
      </td>
      <td className="tableBody cartItem">
        {/* <input className="cartField inputWidth" value={parseFloat(props.price).toFixed(2) || ""} readOnly/> */}
        <input
          className="cartField inputWidth"
          value={(parseFloat(props.price) * discountvar).toFixed(2) || ""}
          readOnly
        />
      </td>
      <td className="tableBody cartItem">
        <input
          className="cartField inputWidth shadow inputFont"
          type="number"
          value={quantity || ""}
          onChange={changeQuantity}
        />
      </td>
      <td className="tableBody cartItem cartDelImg">
        {/* <span className="input-group-text addToCart" onClick={() => test()}>  */}
        <img
          className="imgCartStyle"
          src="add.png"
          alt="user"
          onClick={addItemInCart}
        ></img>
        {/* </span> */}
      </td>
    </tr>
  );
};

export default withRouter(Article);
