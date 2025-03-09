import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import FormularioPaciente from "./FormularioPaciente";
import TablaPacientes from "./TablaPacientes"; // Suponiendo que esta es tu tabla

const Tools = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [filtro, setFiltro] = useState(""); // Estado para el filtro de búsqueda

  const BuscarPaciente = (event) => {
    event.preventDefault();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Manejar cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setFiltro(event.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={BuscarPaciente}
        display={"flex"}
        justifyContent={"space-around"}
      >
        <TextField
          id="outlined-basic"
          label="Buscar paciente"
          variant="outlined"
          size="small"
          value={filtro} // Asociar el valor del input con el estado
          onChange={handleSearchChange} // Actualizar el filtro cuando el texto cambie
        />
        <Button variant="contained" onClick={handleOpenDialog}>
          + Paciente
        </Button>
      </Box>

      {/* Pasar el filtro a la tabla de pacientes */}
      <TablaPacientes filtro={filtro} />

      <FormularioPaciente
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default Tools;
