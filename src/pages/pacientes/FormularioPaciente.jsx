import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { agregarPaciente } from "../../service/PacienteService";
import provincias from "./provincias"


const FormularioPaciente = ({ openDialog, handleCloseDialog }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    provincia: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(openDialog){
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        provincia: "",
      });
    }
  }, [openDialog]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Datos del paciente:", formData);
    setLoading(true)
    try {
        await agregarPaciente(formData);
        console.log("paciente agregado")
        handleCloseDialog();
        cargarPacientes();

    } catch (error) {
        console.error("Error al agregar paciente", error)

    } finally {
        setLoading(false)
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogContent>
        <DialogTitle>Agregar Paciente</DialogTitle>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="provincia-label">Provincia</InputLabel>
                <Select
                  labelId="provincia-label"
                  id="provincia"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  label="Provincia"
                >
                  <MenuItem value="">
                    <em>Selecciona una provincia</em>
                  </MenuItem>
                  {provincias.map((provincia) => (
                    <MenuItem key={provincia} value={provincia}>
                      {provincia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <DialogActions>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? "Agregando..." : "Agregar"}
                  
                </Button>
                <Button
                  onClick={handleCloseDialog}
                  variant="contained"
                  color="error"
                >
                  Cancelar
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormularioPaciente;