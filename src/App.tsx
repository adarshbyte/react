import './App.css'
import Notifications from './Notifications';
import { Link, Routes,Route } from 'react-router-dom';

export default function App() {

  return (
    <div className="App">
      <nav>
        <Link to="/notification">notification center</Link>
      </nav>
      <Routes>
        <Route path="/notification" element={<Notifications/>}/>
      </Routes>
    </div>
  );
}
