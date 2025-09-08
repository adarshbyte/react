import './App.css'
import React from 'react';
const Notifications = React.lazy(()=>import('./Notifications'));
import Todo from './pages/todo';
import Layout from './components/Layout';
import { Routes,Route, Navigate } from 'react-router-dom';
import Practice from './pages/practice';
import Dashboard from './pages/pulseboard/Dashboard';
import SlowImageLoader from './pages/pulseboard/SlowImageLoader';
import Home from './pages/home';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="notification" element={<React.Suspense fallback={<div>Loading...</div>}>
            <Notifications/>
          </React.Suspense>}/>
          <Route path="todo" element={<Todo/>}/>
          <Route path="practice" element={<Practice/>}/>
        </Route>
        <Route path="/pulse-board" >
          <Route index element={<Navigate to="dashboard" replace/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="image-loader" element={<SlowImageLoader/>}/>
      </Routes>
    </div>
  );
}
