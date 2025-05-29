import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const query = searchParams.get('search');

//     if (query) {
//       searchPatients(query);
//     } else {
//       setPatients([]);
//     }
//   }, [location.search]); // <-- This is the key fix

    useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');

    if (query) {
        searchPatients(query);
    } else {
        fetchAllPatients();
    }
    }, [location.search]);

    const fetchAllPatients = async () => {
    try {
        const result = await axios.get('http://localhost:8080/api/patients');
        setPatients(result.data);
    } catch (error) {
        console.error("Failed to load patients", error);
        toast.error("Failed to load patients.");
    }
    };


  const searchPatients = async (query) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/patients/search?name=${query}`);
      setPatients(result.data);
    } catch (error) {
      console.error("Search failed", error);
      toast.error("Search failed. Please check the server.");
    }
  };

  const deleteHistory = async (hid) => {
    try {
      await axios.delete(`http://localhost:8080/api/patients/${hid}`);
      toast.success('History deleted successfully!');
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('search');
      if (query) searchPatients(query);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete history.');
    }
  };

  const confirmAndDelete = (hid) => {
    toast.info(
      <div>
        <p className="mb-2">Are you sure you want to delete this history record?</p>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-sm btn-danger" onClick={() => {
            deleteHistory(hid);
            toast.dismiss();
          }}>
            Yes
          </button>
          <button className="btn btn-sm btn-secondary" onClick={() => toast.dismiss()}>
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <div>
      {patients.length === 0 && location.search.includes('search=') && (
        <p className="text-muted text-center">No patients found.</p>
      )}
      {patients.length > 0 && (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.contact}</td>
                <td>{patient.address}</td>
                <td>
                  <Link to={`/edit/${patient.id}`} className="btn btn-outline-warning me-2">Edit</Link>
                  <Link to={`/history/${patient.id}`} className="btn btn-outline-primary me-2">History</Link>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => confirmAndDelete(patient.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientList;






// function PatientList() {
// 	const { id } = useParams();
// 	const [history, setHistory] = useState([]);
// 	const [patients, setPatients] = useState([]);
// 	const [keyword, setKeyword] = useState('');

// 	useEffect(() => {
// 		fetchPatients();
// 	}, []);

// 	const fetchPatients = async () => {
// 		const result = await axios.get('http://localhost:8080/api/patients');
// 		setPatients(result.data);
// 	};

// 	const searchPatients = async () => {
// 		const result = await axios.get(`http://localhost:8080/api/patients/search?name=${keyword}`);
// 		setPatients(result.data);
// 	};

// 	const deleteHistory = async (hid) => {
// 		try {
// 			console.log("deleting record");

// 			await axios.delete(`http://localhost:8080/api/patients/${hid}`);
// 			toast.success('History deleted successfully!');
// 			fetchPatients();
// 		} catch (error) {
// 			console.error(error);
// 			toast.error('Failed to delete history.');
// 		}
// 	};

// 	const loadHistory = async () => {
// 		const result = await axios.get(`http://localhost:8080/api/patients/${id}`);
// 		setHistory(result.data.medicalHistory || []);
// 	};

// 	const confirmAndDelete = (hid) => {
// 		toast.info(
// 			<div>
// 				<p className="mb-2">Are you sure you want to delete this history record?</p>
// 				<div className="d-flex justify-content-end gap-2">
// 					<button className="btn btn-sm btn-danger" onClick={() => {
// 						deleteHistory(hid);
// 						toast.dismiss(); // Close the toast after confirmation
// 					}}>
// 						Yes
// 					</button>
// 					<button className="btn btn-sm btn-secondary" onClick={() => toast.dismiss()}>
// 						No
// 					</button>
// 				</div>
// 			</div>,
// 			{
// 				autoClose: false,
// 				closeOnClick: false,
// 				closeButton: false,
// 				draggable: false,
// 			}
// 		);
// 	};

// 	return (
// 		<div>
// 			<Navbar/>
// 			{/* <div className="d-flex justify-content-between mb-3">
// 				<input
// 					type="text"
// 					className="form-control me-2"
// 					style={{ maxWidth: '300px' }}
// 					placeholder="Search patients..."
// 					value={keyword}
// 					onChange={(e) => setKeyword(e.target.value)}
// 				/>
// 				<button className="btn btn-outline-primary me-2" onClick={searchPatients}>
// 					Search
// 				</button>
// 				<Link to="/add" className="btn btn-success">
// 					Add Patient
// 				</Link>
// 			</div> */}
// 			<table className="table table-bordered table-hover">
// 				<thead className="table-light">
// 					<tr>
// 						<th>Name</th>
// 						<th>Gender</th>
// 						<th>Age</th>
// 						<th>Contact</th>
// 						<th>Address</th>
// 						<th>Actions</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{patients.map((patient) => (
// 						<tr key={patient.id}>
// 							<td>{patient.name}</td>
// 							<td>{patient.gender}</td>
// 							<td>{patient.age}</td>
// 							<td>{patient.contact}</td>
// 							<td>{patient.address}</td>
// 							<td>
// 								<Link to={`/edit/${patient.id}`} className="btn btn-outline-warning me-2">
// 									Edit
// 								</Link> 
// 								<Link to={`/history/${patient.id}`} className="btn btn-outline-primary me-2">
// 									History
// 								</Link>
// 								<button
// 									className="btn btn-sm btn-danger me-2"
// 									onClick={() => confirmAndDelete(patient.id)}
// 								>
// 									Delete
// 								</button>
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// }

// export default PatientList;