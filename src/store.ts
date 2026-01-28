import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import type { DraftPatient, Patient } from "./types";

type PatientState = {
  patients: Patient[]
  activeId: Patient['id']
  addPatient: (data: DraftPatient) => void,
  deletePatient: (id: Patient['id']) => void,
  getPatientById: (id: Patient['id']) => void,
  updatePatient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: uuid() }
}

export const usePatientStore = create<PatientState>()(
  devtools(
    persist((set) => ({
      patients: [],
      activeId: '',

      addPatient: (data) => {
        const newPatient = createPatient(data)
        set((state) => ({
          patients: [...state.patients, newPatient]
        }))
        toast.success('Paciente Registrado Correctamente')
      },

      deletePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter(patient => patient.id !== id)
        }))
      },

      getPatientById: (id) => {
        set(() => ({
          activeId: id
        }))
      },

      updatePatient: (data) => {
        set((state) => ({
          patients: state.patients.map(patient => patient.id === state.activeId ? {
            id: state.activeId, ...data
          } : patient),
          activeId: ''
        }))
        toast.info('Paciente Actualizado Correctamente')
      }
    }), {
      name: 'patient-storage'
    })
  ))