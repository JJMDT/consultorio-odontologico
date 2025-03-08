import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Pacientes from './pages/pacientes/Pacientes'
import Navbar from './components/Navbar';
import Historias from './pages/Historias';
import './App.css'



function App() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/Historias" element={<Historias />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
