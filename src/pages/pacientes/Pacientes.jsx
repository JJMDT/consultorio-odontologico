// Pacientes.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header"; // Importa el componente Header
import Tools from "./Tools"; // Importa el componente Tools
import TablaPacientes from "./TablaPacientes";
import { Box,Paper } from "@mui/material";

const Pacientes = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Usa el componente Header con el título "Pacientes" */}
      <Header title="Pacientes" />
      <Paper sx={{ padding: 2 }}>

      <Tools />
      </Paper>
      {/* <TablaPacientes /> */}
    </Box>
  );
};

export default Pacientes;