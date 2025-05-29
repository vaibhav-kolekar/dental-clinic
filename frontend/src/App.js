import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import MedicalHistory from './components/MedicalHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Navbar />
        {/* <h2 className="text-center mb-4">Vathare Dental Clinic</h2> */}
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/add" element={<AddPatient />} />
          <Route path="/edit/:id" element={<EditPatient />} />
          <Route path="/history/:id" element={<MedicalHistory />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;