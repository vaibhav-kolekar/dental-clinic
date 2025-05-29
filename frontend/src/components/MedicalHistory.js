import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function MedicalHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const result = await axios.get(`http://localhost:8080/api/patients/${id}`);
    setHistory(result.data.medicalHistory || []);
  };

  const addHistory = async () => {
    if (!description.trim()) return;
    await axios.post(`http://localhost:8080/api/history/${id}`, { description });
    toast.success('History added');
    setDescription('');
    loadHistory();
  };

  const deleteHistory = async (hid) => {
    await axios.delete(`http://localhost:8080/api/history/${hid}`);
    toast.success('History deleted');
    loadHistory();
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </div>
      <h5>Medical History</h5>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success" onClick={addHistory}>Add</button>
      </div>
      <ul className="list-group">
        {history.map((item) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
            {item.description}
            <button className="btn btn-sm btn-danger" onClick={() => deleteHistory(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicalHistory;