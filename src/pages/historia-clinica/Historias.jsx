import React, { useState, useEffect } from "react";
import Header from "../../components/Header"; // Importa el componente Header
import { Link } from "react-router-dom"; // Importa el Link de react-router-dom
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer
} from "@mui/material";
import { getTodasLasHistoriasClinicas } from "../../service/HistoriaService";

const Historias = () => {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Estado para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchHistorias = async () => {
      setLoading(true);
      const data = await getTodasLasHistoriasClinicas();
      // Ordenar las historias por fecha
      data.sort((a, b) => {
        const fechaA = a.fecha?.seconds ? new Date(a.fecha.seconds * 1000) : new Date(0);
        const fechaB = b.fecha?.seconds ? new Date(b.fecha.seconds * 1000) : new Date(0);
        return fechaB - fechaA; // Ordena de más reciente a más antigua
      });
      setHistorias(data);
      // Mostrar solo las primeras 10 historias
      //setHistorias(data.slice(0, 10));

      setLoading(false);
    };
    fetchHistorias();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Header title="Todas las historias" />
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Últimas Consultas</Typography>
        {/* Verifica si los datos están cargando o si no hay historias */}
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : historias.length === 0 ? (
          <Typography>No se encontraron historias clínicas.</Typography>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Motivo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historias
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((historia) => (
                      <TableRow key={historia.id}>
                        <TableCell>
                          {historia.fecha
                            ? new Date(historia.fecha.seconds * 1000).toLocaleDateString()
                            : "Fecha no disponible"}
                        </TableCell>
                        <TableCell>
                          <Link to={`/historia-clinica/${historia.pacienteId}`} style={{ textDecoration: "none", color: "blue" }}>
                            {historia.pacienteId || "ID paciente no disponible"}
                          </Link>
                        </TableCell>
                        <TableCell>
                            {historia.motivo || "Motivo no disponible"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Agregar la funcionalidad de paginación */}
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={historias.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Historias;
