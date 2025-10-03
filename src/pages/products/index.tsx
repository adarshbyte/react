import React from 'react';
import ProductList from "./ProductList";
import Cart from "./Cart";

const Products = () => {
  const [toggleCartView,setToggleCartView]=React.useState(false);
  const handleToggleCartView = ()=>{
    setToggleCartView(prev=>!prev);
  }
  return (
    <div>
      <button type="button" onClick={handleToggleCartView}>View cart</button>
      <ProductList />
      {toggleCartView && <Cart toggleCartView = {toggleCartView} handleToggleCartView={handleToggleCartView}/>}
    </div>
  );
};

export default Products;
