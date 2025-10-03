import React from "react";
import useCart from "../../hooks/useCart";
import ReactDOM from "react-dom";
import useFetch from "../../hooks/useFetch";
import { ProductType } from "../../types/products.types";

const CartItem = (props: { item: ProductType }) => {
  const { cartItems, addToCart, decreaseFromCart, removeFromCart } = useCart();
  const { item } = props;
  return (
    <div style={{ border: "1px solid gray" }}>
      <p>{item.title}</p>
      <p>Quantity selected : {cartItems[item.id]}</p>
      <button
        type="button"
        onClick={() => {
          decreaseFromCart(item.id);
        }}
        disabled={cartItems[item.id] === 0}
      >
        -
      </button>
      <button
        type="button"
        onClick={() => {
          addToCart(item.id);
        }}
        disabled={cartItems[item.id] === item.quantity}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          removeFromCart(item.id);
        }}
      >
        del
      </button>
    </div>
  );
};

const Cart = ({
  toggleCartView,
  handleToggleCartView,
}: {
  toggleCartView: boolean;
  handleToggleCartView: () => void;
}) => {
  const { cartItems } = useCart();
  const { data: cart } = useFetch<ProductType[]>("", cartItems);
  const cartRef = React.useRef<HTMLDivElement | null>(null);

  return ReactDOM.createPortal(
    <>
      {toggleCartView && (
        <div
          onClick={handleToggleCartView}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}
      <div
        ref={cartRef}
        style={{
          width: "400px",
          height: "100vh",
          border: "10px solid gray",
          background: "lightgray",
          top: "0",
          right: toggleCartView ? "0" : "-400px",
          zIndex: 1000,
          position: "fixed",
          transition: "right 0.3s ease-in-out",
        }}
      >
        <h3>cart items</h3>
        <ul>
          {cart?.map((item) => {
            return (
              <li key={item.id}>
                <CartItem item={item} />
              </li>
            );
          })}
        </ul>
        <button
          style={{ top: "0", right: 0, position: "absolute" }}
          type="button"
          onClick={handleToggleCartView}
        >
          Close
        </button>
      </div>
    </>,
    document.body
  );
};
export default Cart;
