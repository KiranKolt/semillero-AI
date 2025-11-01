import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import App from './App'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AllProjects from './pages/AllProjects'
import Inicio from './pages/Inicio'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/proyectos" element={<AllProjects />} />
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)

