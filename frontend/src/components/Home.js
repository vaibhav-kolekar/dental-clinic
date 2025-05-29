import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/patients')
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  const deletePatient = (id) => {
    axios.delete(`http://localhost:8080/api/patients/${id}`)
      .then(() => setPatients(patients.filter(p => p.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <Link to="/add-patient" className="bg-blue-500 text-white px-4 py-2 rounded">Add Patient</Link>
      <ul className="mt-4">
        {patients.map(patient => (
          <li key={patient.id} className="border p-2 mb-2 flex justify-between items-center">
            <Link to={`/patient/${patient.id}`}>{patient.name}</Link>
            <div className="space-x-2">
              <Link to={`/edit-patient/${patient.id}`} className="text-yellow-600">Edit</Link>
              <button onClick={() => deletePatient(patient.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;