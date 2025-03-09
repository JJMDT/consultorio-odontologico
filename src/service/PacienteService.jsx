import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export const agregarPaciente = async (pacienteData,cargarPacientes
) => {
    try {
        const pacienteRef = collection(db, "pacientes");
        const docRef = await addDoc(pacienteRef,{
            ...pacienteData,
            createdAt: new Date()
        })
        console.log("paciente agregado", docRef.id);
        cargarPacientes();

        return docRef.id;

    } catch (error) {
        console.error("Error al agregar paciente", error);
        return error;
    }
}