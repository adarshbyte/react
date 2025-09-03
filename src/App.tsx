import './App.css'
import Notifications from './Notifications';
import Todo from './pages/todo';
import Layout from './components/Layout';
import { Routes,Route } from 'react-router-dom';
import Practice from './pages/practice';
export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<div/>}/>
          <Route path="notification" element={<Notifications/>}/>
          <Route path="todo" element={<Todo/>}/>
          <Route path="practice" element={<Practice/>}/>
        </Route>
      </Routes>
    </div>
  );
}
