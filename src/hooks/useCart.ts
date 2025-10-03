import React from "react";
import { CartType } from "../types/products.types";

const useCart = (initialState?: CartType) => {
  const [cartItems, setCartItems] = React.useState<CartType>(initialState || {});
  const addToCart = (id: string) => {
    setCartItems((prev) => {
      if (prev[id] === undefined) {
        prev[id] = 1;
      } else {
        prev[id] += 1;
      }
      return {...prev};
    });
  };
  const decreaseFromCart = (id: string) => {
    setCartItems((prev) => {
      if (prev[id] && prev[id] > 0) {
        prev[id] -= 1;
      }
      return {...prev};
    });
  };
  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      if (prev[id]) {
        delete prev[id];
      }
      return {...prev};
    });
  };
  React.useEffect(() => {
    console.log(cartItems,"saving cart items")
    if(Object.keys(cartItems).length===0){
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  React.useEffect(() => {
    let presetCart = localStorage.getItem("cart");
    if (presetCart) {
      console.log('pre loading carts')
      setCartItems(JSON.parse(presetCart) || {});
    }
  }, []);
  return { cartItems, addToCart, decreaseFromCart, removeFromCart };
};
export default useCart;
