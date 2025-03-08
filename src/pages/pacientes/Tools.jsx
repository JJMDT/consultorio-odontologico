import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import FormularioPaciente from "./FormularioPaciente";

const Tools = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const BuscarPaciente = (event) => {
    event.preventDefault();
    alert("Buscando pacientes...");
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        />
        <Button variant="contained" onClick={handleOpenDialog}>
          + Paciente
        </Button>
      </Box>

      <FormularioPaciente
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default Tools;