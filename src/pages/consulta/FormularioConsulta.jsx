import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Importa tu configuración de Firebase
import { addHistoriaClinica } from "../../service/HistoriaService"; // Importa el servicio para agregar historia clínica

const FormularioConsulta = () => {
  const [formData, setFormData] = useState({
    paciente: "",
    motivo: "",
    diagnostico: "",
    tratamiento: "",
    fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
  });

  const [pacientes, setPacientes] = useState([]); // Estado para almacenar los pacientes

  // Obtener los pacientes desde Firestore
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pacientes"));
        const listaPacientes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPacientes(listaPacientes);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.paciente) {
      alert("Debes seleccionar un paciente.");
      return;
    }

    try {
     

      await addHistoriaClinica(formData.paciente, {
        motivo: formData.motivo,
        diagnostico: formData.diagnostico,
        tratamiento: formData.tratamiento,
        fecha:new Date()
      });

      alert("Historia clínica guardada con éxito.");
      setFormData({
        paciente: "",
        motivo: "",
        diagnostico: "",
        tratamiento: "",
        fecha:new Date() // Fecha actual en formato YYYY-MM-DD
    });
    } catch (error) {
      console.error("Error al guardar la historia clínica:", error);
      alert("Hubo un error al guardar la historia clínica.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="fecha"
              label="Fecha"
              value={formData.fecha}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Paciente</InputLabel>
              <Select
                label="Paciente"
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
              >
                {pacientes.map((paciente) => (
                  <MenuItem key={paciente.id} value={paciente.id}>
                    {paciente.nombre} {paciente.apellido}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              name="motivo"
              label="Motivo de la consulta"
              fullWidth
              required
              value={formData.motivo}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              name="diagnostico"
              label="Diagnóstico"
              fullWidth
              required
              value={formData.diagnostico}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              name="tratamiento"
              label="Tratamiento/Indicaciones"
              multiline
              rows={4}
              fullWidth
              required
              value={formData.tratamiento}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Confirmar
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={() =>
                setFormData({
                  paciente: "",
                  motivo: "",
                  diagnostico: "",
                  tratamiento: "",
                  fecha: new Date().toISOString().split("T")[0],
                })
              }
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

export default FormularioConsulta;
