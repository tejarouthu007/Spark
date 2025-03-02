import { useState } from 'react'
import {BrowserRouter ,Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import EnergyProfiles from './pages/EnergyProfiles';
import Reports from './pages/Reports';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/devices' element={<Devices/>}/>
        <Route path='/energy-profiles' element={<EnergyProfiles/>}/>
        <Route path='/reports' element={<Reports/>}/>
      </Routes>  
    </BrowserRouter>

    </>
  )
}

export default App
