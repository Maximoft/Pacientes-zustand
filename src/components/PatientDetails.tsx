import type { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { usePatientStore } from "../store"


type PatientDetailsProps = {
  patient: Patient
}

export default function PatientDetails({patient}: PatientDetailsProps) {

const { deletePatient, getPatientById } = usePatientStore()

  return (
    <div className="mx-5 mb-10 px-5 py-10 bg-white shadow-md rounded-md">
      <PatientDetailItem label="ID" data={patient.id} />
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Correo" data={patient.email} />
      <PatientDetailItem label="Fecha alta" data={patient.date.toString()} />
      <PatientDetailItem label="Sintomas" data={patient.symptoms} />
    
    <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
      <button 
      type="button"
      className="py-2 px-10 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold uppercase"
      onClick={() => getPatientById(patient.id)}>
        Editar
      </button>

      <button 
      type="button"
      className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white rounded-xl font-bold uppercase"
      onClick={() => deletePatient(patient.id)}>
        Eliminar
      </button>
    </div>
    </div>
  )
}
