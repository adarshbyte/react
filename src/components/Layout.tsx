import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/notification" style={linkStyle}>Notification Center</Link>
        <Link to="/todo" style={linkStyle}>Todos</Link>
      </nav>
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
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
