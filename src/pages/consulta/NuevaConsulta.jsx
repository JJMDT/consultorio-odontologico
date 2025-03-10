// Dashboard.js
import React from "react";
import Header from "../../components/Header"; // Importa el componente Header
import {Box, Paper, Typography} from "@mui/material";
import { Link } from "react-router-dom"; // Importa el Link de react-router-dom
import FormularioConsulta from "./FormularioConsulta";

const NuevaConsulta = () => {
  return (
    <div>
      {/* Usa el componente Header con el título "Dashboard" */}
      <Header title="Nueva Consulta" />
      <Box sx={{ padding: 2 }}>
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">Datos de la consulta</Typography>
            <FormularioConsulta />
        </Paper>
      </Box>
    </div>
  );
};

export default NuevaConsulta;