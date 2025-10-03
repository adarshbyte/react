import useFetch from "../../hooks/useFetch";
import { ProductType } from "../../types/products.types";
import useCart from "../../hooks/useCart";

const ProductList = () => {
  const { data: products, error, loading } = useFetch<ProductType[]>("");
  const { addToCart } = useCart();

  return (
    <div>
      <h3>Products</h3>
      <ul
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "BUTTON" && target.dataset.id) {
            addToCart(target.dataset.id);
          }
        }}
        style={{
          width: "80vw",
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        {error && <p>Could not load</p>}
        {loading && <p>Loading products</p>}
        {products?.map((product) => (
          <li key={product.id} style={{ flex: "0 0 calc(25% - 20px)" }}>
            <img src={product.image} alt="product image" />
            <p>{product.title}</p>
            <p>INR: {product.price}</p>
            <p>Quantity left: {product.quantity}</p>
            <button
              type="button"
              id={`btn-${product.id}`}
              data-id={product.id}
              disabled={product.quantity == 0}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
