import { useState, useContext } from 'react'
import {BrowserRouter ,Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import EnergyProfiles from './pages/EnergyProfiles';
import Reports from './pages/Reports';
import { AppContext } from './context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
          }/>
        <Route path='/devices' element={
          <ProtectedRoute>
          <Devices/>
        </ProtectedRoute>
          }/>
        <Route path='/energy-profiles' element={
          <ProtectedRoute>
            <EnergyProfiles/>
          </ProtectedRoute>
        }/>
        <Route path='/reports' element={
          <ProtectedRoute>
            <Reports/>
          </ProtectedRoute>
          }/>
      </Routes>  
    </BrowserRouter>

    </>
  )
}

export default App
