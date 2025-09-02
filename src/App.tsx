import './App.css'
import Notifications from './Notifications';
import Todo from './pages/todo';
import { Link, Routes,Route } from 'react-router-dom';

export default function App() {

  return (
    <div className="App">
      <nav>
        <Link to="/notification">notification center</Link>
        <Link to="/todo">todos</Link>
      </nav>
      <Routes>
        <Route path="/notification" element={<Notifications/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
    </div>
  );
}
