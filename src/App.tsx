import PatientForm from "./components/PatientForm"
import PatientsList from "./components/PatientsList"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <div className="container mx-auto mt-20 px-5 md:px-0">

        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto text-balance">
          Seguimiento de Pacientes {''}
          <span className="text-cyan-700">Veterinaria</span>
        </h1>

        <div className="mt-12 md:flex gap-5">
          <PatientForm />
          <PatientsList />
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default App
