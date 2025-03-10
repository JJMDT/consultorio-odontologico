import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Pacientes from './pages/pacientes/Pacientes'
import Navbar from './components/Navbar';
import Historias from './pages/historia-clinica/Historias';
import DetallePaciente from './pages/pacientes/DetallePaciente';
import './App.css'
import DetalleHistoria from './pages/historia-clinica/DetalleHistoria';
import NuevaConsulta from './pages/consulta/NuevaConsulta';



function App() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nueva-consulta" element={<NuevaConsulta />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/historias" element={<Historias />} />
          <Route path="/paciente/:id" element={<DetallePaciente />} />
          <Route path='/historia-clinica/:id' element={<DetalleHistoria />} />

        </Routes>
      </div>
    </div>
  );
}

export default App
