import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import App from './App'
import { HashRouter, Routes, Route } from 'react-router-dom'
import AllProjects from './pages/AllProjects'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/proyectos" element={<AllProjects />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)

