import React from 'react'
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import NavBar from './Components/Navbar/NavBar'
import Landing from './Views/Landing/Landing'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to={'/landing'} />} />
        <Route path='/landing' element={<Landing />} />
      </Routes>
    </div>
  )
}

export default App
