// Pacientes.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header"; // Importa el componente Header
import Tools from "./Tools"; // Importa el componente Tools
import TablaPacientes from "./TablaPacientes";

const Pacientes = () => {
  return (
    <div>
      {/* Usa el componente Header con el título "Pacientes" */}
      <Header title="Pacientes" />
      <Tools />
      {/* <TablaPacientes /> */}
    </div>
  );
};

export default Pacientes;