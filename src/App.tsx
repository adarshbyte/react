import "./App.css";
import React from "react";
const Notifications = React.lazy(() => import("./Notifications"));
import Todo from "./pages/todo";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Practice from "./pages/practice";
import Dashboard from "./pages/pulseboard/Dashboard";
import SlowImageLoader from "./pages/pulseboard/SlowImageLoader";
import Home from "./pages/home";
import TablePage from "./pages/table";
import DropDownPage from "./pages/dropdown";
const CustomComponents = React.lazy(()=>import('./pages/custom'))
const Products = React.lazy(() => import("./pages/products"));

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="notification"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Notifications />
              </React.Suspense>
            }
          />
          <Route path="todo" element={<Todo />} />
          <Route path="practice" element={<Practice />} />
          <Route path="table" element={<TablePage />} />
        </Route>
        <Route path="/pulse-board">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="image-loader" element={<SlowImageLoader />} />
        <Route path="dropdown" element={<DropDownPage />} />
        <Route
          path="products"
          element={
            <React.Suspense fallback={<div>loading...</div>}>
              <Products />
            </React.Suspense>
          }
        />
        <Route
          path="custom"
          element={
            <React.Suspense fallback={<div>loading...</div>}>
              <CustomComponents />
            </React.Suspense>
          }
        />
      </Routes>
    </div>
  );
}
