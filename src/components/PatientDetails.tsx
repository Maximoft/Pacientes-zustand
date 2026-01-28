import { toast } from "react-toastify"
import type { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { usePatientStore } from "../store"

type PatientDetailsProps = {
  patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {

  const { deletePatient, getPatientById } = usePatientStore()

  const handleDelete = () => {
    if (confirm('¿Deseas eliminar este paciente? Esta acción no se puede deshacer.')) {
      deletePatient(patient.id)
      toast.error('Paciente Eliminado Correctamente')
    }
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'long'
    }).format(new Date(date))
  }

  return (
    <div className="mx-5 mb-10 px-5 py-10 bg-white shadow-lg rounded-xl border border-gray-100">
      <PatientDetailItem label="ID" data={patient.id} />
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Correo" data={patient.email} />
      <PatientDetailItem label="Fecha alta" data={formatDate(patient.date.toString())} />
      <PatientDetailItem label="Síntomas" data={patient.symptoms} />

      <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold uppercase transition-[background-color] shadow-sm active:scale-[0.98]"
          onClick={() => getPatientById(patient.id)}>
          Editar
        </button>

        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold uppercase transition-[background-color] shadow-sm active:scale-[0.98]"
          onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  )
}
