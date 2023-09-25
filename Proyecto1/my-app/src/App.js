import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Historial from './components/Historial';
import Monitor from './components/Monitoreo';
import Prin from './components/Principal';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Prin/>}/>
          <Route path='/monitor' element={<Monitor/>}/>
          <Route path='/historial' element={<Historial/>}/>
          <Route path='*' element={<Prin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
