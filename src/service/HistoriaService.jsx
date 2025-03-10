import { getDocs, collection, query, limit, orderBy,addDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Obtener historia clínica
export const getHistoriaClinica = async (pacienteId) => {
  try {
    console.log("Fetching historia clínica...");
    const historiaRef = collection(db, `pacientes/${pacienteId}/historia_clinica`);
    const querySnapshot = await getDocs(historiaRef);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } else {
      console.log("No se encontraron historias clínicas para este paciente.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener historia clínica:", error);
    return [];
  }
};

// Obtener todas las historias clínicas de todos los pacientes
export const getTodasLasHistoriasClinicas = async () => {
  try {
    console.log("Fetching todas las historias clínicas...");
    
    // Accedemos a la colección "pacientes"
    const pacientesRef = collection(db, "pacientes");
    const pacientesSnapshot = await getDocs(pacientesRef);
    
    // Si no hay pacientes, devolvemos un array vacío.
    if (pacientesSnapshot.empty) {
      console.log("No se encontraron pacientes.");
      return [];
    }

    // Creamos una lista de promesas para obtener las historias clínicas de todos los pacientes
    const todasLasHistorias = await Promise.all(
      pacientesSnapshot.docs.map(async (pacienteDoc) => {
        const pacienteId = pacienteDoc.id; // Obtener el ID del paciente
        const historiaRef = collection(db, `pacientes/${pacienteId}/historia_clinica`); // Subcolección historia_clinica
        
        // Modificamos la consulta para limitar a 5 historias por paciente
        const historiaQuery = query(
          historiaRef, 
          orderBy("fecha", "desc"), // Asegúrate de tener un campo 'fecha' para ordenar
          limit(6)  // Limita la cantidad de historias a las últimas 5
        );

        const historiaSnapshot = await getDocs(historiaQuery);

        // Si hay historias clínicas, las agregamos al array, si no, ignoramos.
        return historiaSnapshot.empty
          ? null
          : historiaSnapshot.docs.map(historiaDoc => ({
              pacienteId,
              historiaId: historiaDoc.id,
              ...historiaDoc.data()
          }));
      })
    );

    // Filtramos las historias no nulas y las aplanamos en un solo array
    const historiasFiltradas = todasLasHistorias.filter(historia => historia !== null).flat();

    // Si hay historias clínicas, las devolvemos
    if (historiasFiltradas.length > 0) {
      return historiasFiltradas;
    } else {
      console.log("No se encontraron historias clínicas.");
      return [];
    }

  } catch (error) {
    console.error("Error al obtener todas las historias clínicas:", error);
    return [];
  }
};

export const addHistoriaClinica = async (
  pacienteId,
  historiaData
) => {
  if (!pacienteId) {
    console.error("El ID del paciente es obligatorio.");
    return;
  }

  try {
    const historiaRef = collection(db, `pacientes/${pacienteId}/historia_clinica`);
    // Añadimos la historia clínica al paciente
    await addDoc(historiaRef, {
      ...historiaData,
      fecha: historiaData.fecha , // Si no se proporciona fecha, se asigna la actual
    });
    console.log(`Historia clínica añadida para el paciente ${pacienteId}`);
  } catch (error) {
    console.error("Error al añadir historia clínica:", error);
    throw error;
  }
};
