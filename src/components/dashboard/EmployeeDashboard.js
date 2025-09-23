import React, { useState } from 'react';
import { CredentialStore } from '../Login/Login';
import Header from '../Header';
import './EmployeeDashboard.css';

// Mock vehicle details
const VEHICLE_DETAILS = [
	{
		vehicleNumber: 'MH12AB1234',
		vehicleType: 'Car',
		entryTime: '2025-09-24 09:15',
		allotedBy: 'John Doe',
		exitBy: '',
		fare: 120,
		exitTime: '',
		locked: false,
	},
	{
		vehicleNumber: 'MH14XY5678',
		vehicleType: 'Bike',
		entryTime: '2025-09-24 10:05',
		allotedBy: 'Jane Smith',
		exitBy: '',
		fare: 60,
		exitTime: '',
		locked: false,
	},
	// Add more vehicles as needed
];

const EmployeeDashboard = () => {
	const employeeName = CredentialStore.name;
	const employeeId = CredentialStore.employeeId;
	const [vehicles, setVehicles] = useState(VEHICLE_DETAILS);
	const [showExitPopup, setShowExitPopup] = useState(false);
	const [selectedVehicle, setSelectedVehicle] = useState(null);

	const handleExitClick = (vehicle) => {
		// Set exit time to now for demo
		setSelectedVehicle({ ...vehicle, exitTime: new Date().toLocaleString() });
		setShowExitPopup(true);
	};

	const handleConfirmExit = () => {
		// Update vehicle exitBy and exitTime
		setVehicles(
			vehicles.map((v) =>
				v.vehicleNumber === selectedVehicle.vehicleNumber
					? { ...v, exitBy: employeeName, exitTime: selectedVehicle.exitTime }
					: v
			)
		);
		setShowExitPopup(false);
		setSelectedVehicle(null);
	};

	return (
		<div>
			<Header user={{ name: employeeName, employeeId: employeeId }} />
			<div className="employee-dashboard-container">
				<h2>Welcome, {employeeName || 'Employee'}!</h2>
				<div className="employee-info">
					<span>
						<b>Employee ID:</b> {employeeId || '-'}
					</span>
				</div>
				<h3>Vehicle Details</h3>
				<table className="parking-lot-table">
					<thead>
						<tr>
							<th>Vehicle Number</th>
							<th>Vehicle Type</th>
							<th>Entry Time</th>
							<th>Alloted By</th>
							<th>Exit By</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{vehicles.map((vehicle) => (
							<tr key={vehicle.vehicleNumber}>
								<td>{vehicle.vehicleNumber}</td>
								<td>{vehicle.vehicleType}</td>
								<td>{vehicle.entryTime}</td>
								<td>{vehicle.allotedBy}</td>
								<td>{vehicle.exitBy || '-'}</td>
								<td style={{ textAlign: 'center' }}>
									<button
										className="lock-btn"
										style={{ marginRight: '0.5rem' }}
										disabled={!!vehicle.exitBy}
									>
										Lock
									</button>
									<button
										className="exit-btn approve-btn"
										disabled={!!vehicle.exitBy}
										onClick={() => handleExitClick(vehicle)}
									>
										Exit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{showExitPopup && selectedVehicle && (
					<div className="exit-popup-card">
						<div className="exit-popup-title">Parking Charge Details</div>
						<div className="exit-popup-detail">
							<b>Vehicle Number:</b> {selectedVehicle.vehicleNumber}
						</div>
						<div className="exit-popup-detail">
							<b>Entry Time:</b> {selectedVehicle.entryTime}
						</div>
						<div className="exit-popup-detail">
							<b>Exit Time:</b> {selectedVehicle.exitTime}
						</div>
						<div className="exit-popup-detail">
							<b>Fare:</b> ₹{selectedVehicle.fare}
						</div>
						<button
							className="confirm-exit-btn approve-btn"
							onClick={handleConfirmExit}
						>
							Confirm
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default EmployeeDashboard;
