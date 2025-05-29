import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', age: '', contact: '', address: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/patients/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = id 
      ? axios.put(`http://localhost:8080/api/patients/${id}`, form)
      : axios.post('http://localhost:8080/api/patients', form);

    req.then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit' : 'Add'} Patient</h2>
      {['name', 'age', 'contact', 'address'].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="block w-full mb-2 p-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}

export default PatientForm;