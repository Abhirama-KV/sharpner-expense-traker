import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth';
import { Route,Routes } from 'react-router-dom';
import Body from './components/Body';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/body' element={<Body />} />
      </Routes>
      
    </div>
  );
}

export default App;
