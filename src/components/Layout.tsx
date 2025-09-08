import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Toasts from "./Toasts";
import { Provider } from "react-redux";
import store from "../store";
const Layout = () => {
  return (
    <Provider store={store}>
      <Toasts/>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/notification" style={linkStyle}>Notification Center</Link>
        <Link to="/todo" style={linkStyle}>Todos</Link>
        <Link to="/practice" style={linkStyle}>Practice</Link>
      </nav>
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </Provider>
  );
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  padding: "10px 20px",
  backgroundColor: "#f0f0f0",
  borderBottom: "1px solid #ccc",
};

const linkStyle: React.CSSProperties = {
  color: "blue",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Layout;
