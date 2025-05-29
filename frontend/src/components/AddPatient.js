import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPatient() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({ name: '', gender:'', age: '', contact: '', address: '' });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/patients', patient);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input className="form-control" name="name" value={patient.name} onChange={handleChange} required />
      </div>
	  <div className="mb-3">
        <label>Gender</label>
        <select
          className="form-control"
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Transgender">Transgender</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Age</label>
        <input className="form-control" name="age" value={patient.age} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Contact</label>
        <input className="form-control" name="contact" value={patient.contact} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Address</label>
        <textarea className="form-control" name="address" value={patient.address} onChange={handleChange} required />
      </div>
      <button className="btn btn-success" type="submit">Save</button>
    </form>
  );
}

export default AddPatient;