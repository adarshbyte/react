import './App.css'
import Notifications from './Notifications';
import Todo from './pages/todo';
import Layout from './components/Layout';
import { Link, Routes,Route } from 'react-router-dom';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<div/>}/>
          <Route path="notification" element={<Notifications/>}/>
          <Route path="todo" element={<Todo/>}/>
        </Route>
      </Routes>
    </div>
  );
}
