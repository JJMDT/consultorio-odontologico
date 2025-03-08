// Dashboard.js
import React from "react";
import Header from "../components/Header"; // Importa el componente Header
import "../styles/HeaderComponent.css"; // Importa el CSS si no lo has hecho

const Dashboard = () => {
  return (
    <div>
      {/* Usa el componente Header con el título "Dashboard" */}
      <Header title="Dashboard" />
      {/* Resto del contenido del Dashboard */}
      <div className="dashboard-content">
        <h2>Pagina Principal</h2>
        <p>Contenido del Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;