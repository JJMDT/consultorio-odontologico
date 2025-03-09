import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";

const TablaPacientes = ({ filtro }) => {
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Cargar pacientes desde Firebase (Filtrar por nombre o dni si es necesario)
  const cargarPacientes = () => {
    try {
      const pacientesRef = collection(db, "pacientes");

      // Si filtro no está vacío, filtramos por nombre o dni
      const q = filtro
        ? query(
            pacientesRef,
            where("nombre", ">=", filtro),
            where("nombre", "<=", filtro + "\uf8ff") // Este operador permite hacer un filtro de texto
          )
        : query(pacientesRef); // Si no hay filtro, traemos todos los pacientes

      // Usamos onSnapshot para escuchar los cambios en tiempo real
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const pacientesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : null,
          };
        }).sort((a, b) => b.createdAt - a.createdAt); // Ordenar por fecha de creación si está presente

        console.log(pacientesData); // Verifica los datos que llegan de Firebase
        setPacientes(pacientesData);
      });

      // Limpiar el listener cuando el componente se desmonte
      return unsubscribe;
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = cargarPacientes();
    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, [filtro]); // Dependencia para recargar cuando el filtro cambie

  // Filtrar los pacientes según el valor del filtro (si es necesario)
  const pacientesFiltrados = pacientes.filter(
    (pac) =>
      pac.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      pac.dni.includes(filtro)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Apellido</TableCell>
                <TableCell align="left">DNI</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientesFiltrados.length > 0 ? (
                pacientesFiltrados
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((paciente) => (
                    <TableRow key={paciente.id}>
                      <TableCell>{paciente.nombre || "No disponible"}</TableCell>
                      <TableCell align="left">
                        {paciente.apellido || "No disponible"}
                      </TableCell>
                      <TableCell align="left">{paciente.dni || "No disponible"}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="ver paciente"
                          onClick={() => navigate(`/detalle-paciente/${paciente.id}`)} // Ruta para detalle
                        >
                          <LibraryBooksIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No se encontraron pacientes
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pacientesFiltrados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};

export default TablaPacientes;
