import { useForm } from "react-hook-form"
import Error from "./Error";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../store";
import { useEffect } from "react";


export default function PatientForm() {
  const { addPatient, activeId, patients, updatePatient, getPatientById } = usePatientStore()

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>()

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(patient => patient.id === activeId)[0]
      setValue('name', activePatient.name)
      setValue('caretaker', activePatient.caretaker)
      setValue('email', activePatient.email)
      setValue('date', activePatient.date)
      setValue('symptoms', activePatient.symptoms)
    } else {
      reset()
    }
  }, [activeId, patients, setValue, reset])

  const registerPacient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data)
    } else {
      addPatient(data)
    }
    reset()
  }

  const cancelEdit = () => {
    getPatientById('') // Reset activeId in store
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        {activeId ? 'Editar Paciente' : 'Añadir Paciente'}
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        {activeId ? 'Modifica la información y ' : 'Agrega Pacientes y '}
        <span className="text-cyan-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-lg rounded-xl py-10 px-5 mb-10 border border-gray-100"
        noValidate
        onSubmit={handleSubmit(registerPacient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold text-gray-700">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3 mt-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
            type="text"
            placeholder="Nombre del Paciente…"
            autoComplete="name"
            {...register('name', {
              required: 'El nombre del paciente es obligatorio'
            })}
          />
          {errors.name && (
            <Error>{errors.name?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold text-gray-700">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3 mt-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
            type="text"
            placeholder="Nombre del Propietario…"
            autoComplete="name"
            {...register('caretaker', {
              required: 'El nombre del propietario es obligatorio'
            })}
          />
          {errors.caretaker && (
            <Error>{errors.caretaker?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold text-gray-700">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3 mt-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
            type="email"
            placeholder="Email de Registro…"
            autoComplete="email"
            spellCheck={false}
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido'
              }
            })}
          />
          {errors.email && (
            <Error>{errors.email?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold text-gray-700">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3 mt-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
            type="date"
            {...register('date', {
              required: 'La fecha es obligatoria'
            })}
          />
          {errors.date && (
            <Error>{errors.date?.message}</Error>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold text-gray-700">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3 mt-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all min-h-[100px]"
            placeholder="Síntomas del paciente…"
            {...register('symptoms', {
              required: 'Los sintomas son obligatorios'
            })}
          />
          {errors.symptoms && (
            <Error>{errors.symptoms?.message}</Error>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="submit"
            className="bg-cyan-600 w-full p-3 text-white uppercase font-bold hover:bg-cyan-700 cursor-pointer rounded-xl transition-[background-color] shadow-sm active:scale-[0.98]"
            value={activeId ? 'Guardar Cambios' : 'Guardar Paciente'}
          />

          {activeId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-100 w-full p-3 text-gray-600 uppercase font-bold hover:bg-gray-200 cursor-pointer rounded-xl transition-[background-color]"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
