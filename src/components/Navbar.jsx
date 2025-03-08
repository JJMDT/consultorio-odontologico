import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IoMdPulse } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
// import EventNoteIcon from '@mui/icons-material/EventNote';

const Navbar = () => {
    return (
      <header>
        <h1>Consultorio</h1>
        <nav className="navbar">
          <ul>
            <li>
              <Link
                to="/"
                style={{
                  display: "flex", // Usa Flexbox
                  alignItems: "center", // Centra verticalmente
                  gap: "8px", // Espacio entre el ícono y el texto
                  textDecoration: "none", // Quita el subrayado del enlace
                }}
              >
                <FaHome /> Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/pacientes"
                style={{
                  display: "flex", // Usa Flexbox
                  alignItems: "center", // Centra verticalmente
                  gap: "8px", // Espacio entre el ícono y el texto
                  textDecoration: "none", // Quita el subrayado del enlace
                }}
              >
                <FaUser /> Pacientes
              </Link>
            </li>
            <li>
              <Link
                to="/historias"
                style={{
                  display: "flex", // Usa Flexbox
                  alignItems: "center", // Centra verticalmente
                  gap: "8px", // Espacio entre el ícono y el texto
                  textDecoration: "none", // Quita el subrayado del enlace
                }}
              >
                <IoMdPulse />Historias 
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}
export default Navbar;