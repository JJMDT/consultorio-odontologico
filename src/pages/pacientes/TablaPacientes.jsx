import React from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import pacientesData from "./pacientesData";

const TablaPacientes = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
        {/* Agrega maxHeight al TableContainer */}
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Apellido</TableCell>
                <TableCell align="left">DNI</TableCell>
                <TableCell align="left">Teléfono</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientesData.length > 0 ? (
                pacientesData.map((paciente) => (
                  <TableRow key={paciente.idPaciente}>
                    <TableCell>{paciente.nombre}</TableCell>
                    <TableCell align="left">{paciente.apellido}</TableCell>
                    <TableCell align="left">{paciente.dni}</TableCell>
                    <TableCell>
                      {paciente.telefono < 1 ? "ninguno" : paciente.telefono}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" aria-label="ver paciente">
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

        {/* Paginación */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pacientesData.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Box>
    </div>
  );
};

export default TablaPacientes;