import React from "react";
import Header from "../components/Header"; // Importa el componente Header

const Historias = () => {
    return (
        <div>
           <Header title="Historias Clinicas" />
           <div className="historias-content">
        <h2>Historias clinicas</h2>
        <p>Listado de historias clinicas</p>
      </div>
        </div>
    )
}
export default Historias;