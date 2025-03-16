import React from 'react'
import Home from './pages/Home'
import Canvas from './canvas/Index'
import Customizer from './pages/Customizer'
import './index.css';
const App = () => {
  return (
   <main className='app transition-all ease-in ' >
    <Home/>
    <Canvas/>
    <Customizer/>
   </main>
  )
}

export default App
