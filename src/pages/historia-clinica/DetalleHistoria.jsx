import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { getHistoriaClinica } from "../../service/HistoriaService";
import { doc, getDoc } from "firebase/firestore"; // Importa funciones de Firestore
import { db } from "../../../firebase"; // Asegúrate de importar tu configuración de Firebase
import Header from "../../components/Header";

const DetalleHistoria = () => {
  const { id } = useParams();
  const [historia, setHistoria] = useState([]);
  const [paciente, setPaciente] = useState(null); // Estado para almacenar el nombre del paciente
  const navigate = useNavigate();

  // Obtener la historia clínica
  useEffect(() => {
    const fetchHistoria = async () => {
      if (id) {
        const data = await getHistoriaClinica(id);
        setHistoria(data);
      }
    };
    fetchHistoria();
  }, [id]);

  // Obtener los datos del paciente
  useEffect(() => {
    const fetchPaciente = async () => {
      if (id) {
        const pacienteRef = doc(db, "pacientes", id); // Ruta de Firestore
        const pacienteSnap = await getDoc(pacienteRef);
        if (pacienteSnap.exists()) {
          setPaciente(pacienteSnap.data()); // Guardamos los datos en el estado
        } else {
          console.error("El paciente no existe");
        }
      }
    };
    fetchPaciente();
  }, [id]);

  return (
    <Box sx={{ padding: 2 }}>
      <Header title="Historia Clínica" />
      <Paper sx={{ padding: 2 }}>
        <Container className="container">
          <div className="historia-header">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(-1)}
              className="back-button"
            >
              ⬅ Volver
            </Button>
            <Typography variant="h5" color="black" gutterBottom padding={2} align="center">
            Historia Clínica de {paciente ? `${paciente.nombre} ${paciente.apellido}` : "Paciente no encontrado"}
            </Typography>
          </div>

          {historia.length === 0 ? (
                <Paper sx={{ padding: 2 }}>
            <Typography className="no-records" variant="h6" align="center">
              No hay registros de historia clínica.
            </Typography>
                    </Paper>
          ) : (
            <Paper sx={{ padding: 2 }}>
            <Table className="historia-table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-h">Fecha</TableCell>
                  <TableCell className="table-header-h">Motivo</TableCell>
                  <TableCell className="table-header-h">Diagnóstico</TableCell>
                  <TableCell className="table-header-h">Tratamiento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historia.map((consulta) => (
                  <TableRow key={consulta.id} className="table-row">
                    <TableCell className="table-cell fecha-cell">
                      {consulta.fecha
                        ? new Date(consulta.fecha.seconds * 1000).toLocaleDateString()
                        : "Fecha no disponible"}
                    </TableCell>
                    <TableCell className="table-cell">{consulta.motivo}</TableCell>
                    <TableCell className="table-cell">{consulta.diagnostico}</TableCell>
                    <TableCell className="table-cell">{consulta.tratamiento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Paper>
          )}
        </Container>
      </Paper>
    </Box>
  );
};

export default DetalleHistoria;
