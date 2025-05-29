import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PatientDetails() {
	const { id } = useParams();
	const [patient, setPatient] = useState(null);
	const [history, setHistory] = useState({
		visitDate: "",
		treatment: "",
		medication: "",
		notes: "",
	});

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/patients/${id}`)
			.then((res) => setPatient(res.data))
			.catch((err) => console.error(err));
	}, [id]);

	const handleChange = (e) => {
		setHistory({ ...history, [e.target.name]: e.target.value });
	};

	const handleAddHistory = (e) => {
		e.preventDefault();
		axios
			.post(`http://localhost:8080/api/history/${id}`, history)
			.then(() => window.location.reload())
			.catch((err) => console.error(err));
	};

	// const deleteHistory = (historyId) => {
	// 	axios
	// 		.delete(`http://localhost:8080/api/history/${historyId}`)
	// 		.then(() => window.location.reload())
	// 		.catch((err) => console.error(err));
	// };

	const deleteHistory = async (hid) => {
		try {
			console.log("deleting record̀");
			
			await axios.delete(`http://localhost:8080/api/history/${hid}`);
			toast.success('History deleted successfully!');
			// loadHistory(); // Refresh list
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete history.');
		}
	};

	const confirmAndDelete = (hid) => {
		console.log("Inside confirmAndDelete()");
		
		if (window.confirm('Are you sure you want to delete this history record?')) {
			deleteHistory(hid);
		}
	};


	return (
		<div>
			{patient && (
				<div>
					<h2 className="text-xl font-bold">{patient.name}'s Details</h2>
					<p>Age: {patient.age}</p>
					<p>Contact: {patient.contact}</p>
					<p>Address: {patient.address}</p>

					<h3 className="mt-4 font-semibold">Add Medical History</h3>
					<form onSubmit={handleAddHistory} className="space-y-2">
						{["visitDate", "treatment", "medication", "notes"].map((field) => (
							<input
								key={field}
								name={field}
								value={history[field]}
								onChange={handleChange}
								placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
								className="block w-full p-2 border rounded"
							/>
						))}
						<button
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							Add History
						</button>
					</form>

					<h3 className="mt-6 font-semibold">Previous Medical Records</h3>
					<ul className="mt-2">
						{patient.medicalHistory?.map((h, index) => (
							<li key={index} className="border p-2 mb-2">
								<p>
									<strong>Date:</strong> {h.visitDate}
								</p>
								<p>
									<strong>Treatment:</strong> {h.treatment}
								</p>
								<p>
									<strong>Medication:</strong> {h.medication}
								</p>
								<p>
									<strong>Notes:</strong> {h.notes}
								</p>
								<button
									className="btn btn-sm btn-danger"
									onClick={() => confirmAndDelete(h.id)}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default PatientDetails;