import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({ name: '', age: '', contact: '', address: '' });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/patients/${id}`).then((res) => setPatient(res.data));
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/patients/${id}`, patient);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input className="form-control" name="name" value={patient.name} onChange={handleChange} required />
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
        <input className="form-control" name="address" value={patient.address} onChange={handleChange} required />
      </div>
      <button className="btn btn-primary" type="submit">Update</button>
    </form>
  );
}

export default EditPatient;