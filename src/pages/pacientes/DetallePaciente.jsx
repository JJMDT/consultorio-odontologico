import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { db } from "../../../firebase"; // Suponiendo que usas Firebase
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/Header";
import provincias from "./provincias";

const DetallePaciente = () => {
  const { id } = useParams(); // Obtener el ID del paciente desde la URL
  const [paciente, setPaciente] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    // Función para obtener los detalles del paciente
    const fetchPaciente = async () => {
      try {
        const docRef = doc(db, "pacientes", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPaciente(docSnap.data());
        } else {
          console.log("No se encontró el paciente");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del paciente:", error);
      }
    };

    fetchPaciente();
  }, [id]);

  if (!paciente) {
    return <Typography variant="h6" align="center">Cargando...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Header title="Detalle del Paciente" />
      
      <Paper sx={{ padding: 2 }}>
      <Grid item xs={12}>
      <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          ⬅ Volver
        </Button>
            </Grid>  
        <Typography variant="h5" gutterBottom padding={2} >
          Datos del Paciente 
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={paciente.nombre || "No disponible"}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={paciente.apellido || "No disponible"}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="DNI"
                name="dni"
                value={paciente.dni || "No disponible"}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={paciente.telefono || "No disponible"}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={paciente.direccion || "No disponible"}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ciudad"
                name="ciudad"
                value={paciente.ciudad || "No disponible"}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled>
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <Select
                  labelId="provincia-label"
                  id="provincia"
                  name="provincia"
                  value={paciente.provincia}
                  label="Provincia"
                >
                  <MenuItem value="">
                    <em>Selecciona una provincia</em>
                  </MenuItem>
                  {/* Aquí deberías mapear las provincias si es necesario */}
                  {provincias.map((provincia) => (
                    <MenuItem key={provincia} value={provincia}>
                      {provincia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ margin: 2 }}
                onClick={() => navigate("/pacientes")}
                color="error"
              >
                Eliminar
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ margin: 2 }}
                onClick={() => navigate("/pacientes")}
              >
                Modificar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default DetallePaciente;
