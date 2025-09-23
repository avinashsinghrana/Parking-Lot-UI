import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './AdminDashboard.css';
import { ReactComponent as RequestIcon } from '../../logo.svg'; // Placeholder, replace with actual icons
import { ReactComponent as EmployeeIcon } from '../../logo.svg'; // Placeholder, replace with actual icons
import { ReactComponent as ParkingIcon } from '../../logo.svg'; // Placeholder, replace with actual icons

const initialRequests = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john.doe@example.com',
		requestedOn: '2025-09-15',
		parkingLot: 'GNIOT Parking Lot',
		address: 'Sector 63, Noida',
		status: 'pending',
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane.smith@example.com',
		requestedOn: '2025-09-16',
		parkingLot: 'DLF Parking',
		address: 'DLF Mall, Noida',
		status: 'pending',
	},
];

const mockEmployees = [
	{
		id: 'LX1001',
		name: 'Alice Johnson',
		email: 'alice.johnson@example.com',
		requestedOn: '2025-09-10',
		parkingLot: 'GNIOT Parking Lot',
		address: 'Sector 62, Noida',
		status: 'active',
	},
	{
		id: 'EMP002',
		name: 'Bob Williams',
		email: 'bob.williams@example.com',
		requestedOn: '2025-09-12',
		parkingLot: 'DLF Parking',
		address: 'DLF Mall, Noida',
		status: 'active',
	},
];

const mockParkingLots = [
	{
		name: 'GNIOT Parking Lot',
		address: 'Sector 63, Noida',
		bike: 50,
		car: 100,
		heavy: 10,
		status: 'active',
	},
	{
		name: 'DLF Parking',
		address: 'DLF Mall, Noida',
		bike: 30,
		car: 80,
		heavy: 5,
		status: 'inactive',
	},
];

const NewParkingLotPopup = ({ open, onClose, onCreate }) => {
	const [form, setForm] = useState({
		name: '',
		address: '',
		bike: '',
		car: '',
		heavy: '',
	});
	const [error, setError] = useState('');

	useEffect(() => {
		if (open) {
			setForm({ name: '', address: '', bike: '', car: '', heavy: '' });
			setError('');
		}
	}, [open]);

	if (!open) return null;

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError('');
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!form.name || !form.address || !form.bike || !form.car || !form.heavy) {
			setError('All fields are required');
			return;
		}
		onCreate(form);
		onClose();
	};

	return (
		<div className="popup-overlay">
			<div className="popup-box">
				<h3>New Parking Lot</h3>
				<form onSubmit={handleSubmit} className="popup-form">
					<input
						name="name"
						placeholder="Parking Lot Name"
						value={form.name}
						onChange={handleChange}
						required
					/>
					<input
						name="address"
						placeholder="Address"
						value={form.address}
						onChange={handleChange}
						required
					/>
					<input
						name="bike"
						type="number"
						min="0"
						placeholder="Bike Capacity"
						value={form.bike}
						onChange={handleChange}
						required
					/>
					<input
						name="car"
						type="number"
						min="0"
						placeholder="Car Capacity"
						value={form.car}
						onChange={handleChange}
						required
					/>
					<input
						name="heavy"
						type="number"
						min="0"
						placeholder="Heavy Vehicle Capacity"
						value={form.heavy}
						onChange={handleChange}
						required
					/>
					{error && <div className="error-msg">{error}</div>}
					<div className="popup-actions">
						<button type="button" className="popup-cancel" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="popup-create">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const AdminDashboard = () => {
	const [requests, setRequests] = useState(initialRequests);
	const [employees, setEmployees] = useState(mockEmployees);
	const [parkingLots, setParkingLots] = useState(mockParkingLots);
	const [activeTab, setActiveTab] = useState('onboard');
	const [popupOpen, setPopupOpen] = useState(false);

	// Get user from localStorage (for name and employeeId)
	const user = React.useMemo(() => {
		try {
			return JSON.parse(localStorage.getItem('user')) || { name: 'Admin' };
		} catch {
			return { name: 'Admin' };
		}
	}, []);

	useEffect(() => {
		document.title = 'Admin Dashboard | Parking Lot';
		const favicon = document.querySelector("link[rel~='icon']");
		if (favicon) {
			favicon.href = '/logo.svg';
		}
	}, []);

	const handleAction = (id, action) => {
		setRequests(reqs => reqs.map(r => (r.id === id ? { ...r, status: action } : r)));
	};

	const handleCreateParkingLot = (newLot) => {
		// Add status: 'inactive' by default for new lots
		const lotWithStatus = { ...newLot, status: 'inactive' };
		setParkingLots(lots => [...lots, lotWithStatus]);
		// Optionally, switch to the Parking Lot Details tab after creation
		setActiveTab('parking');
	};

	const handleDeactivateEmployee = (id) => {
		setEmployees(emps => emps.map(emp => emp.id === id ? { ...emp, status: 'inactive' } : emp));
	};
	const handleActivateParkingLot = (idx) => {
		setParkingLots(lots => lots.map((lot, i) => i === idx ? { ...lot, status: 'active' } : lot));
	};
	const handleDeactivateParkingLot = (idx) => {
		setParkingLots(lots => lots.map((lot, i) => i === idx ? { ...lot, status: 'inactive' } : lot));
	};

	return (
		<div className="admin-dashboard-container">
			<Header showAdmin={false} showRegister={false} showEmployee={false} user={user} />
			<div className="admin-dashboard-content">
				<div className="dashboard-tabs-graphic">
					<div className={`tab-graphic${activeTab === 'onboard' ? ' tab-graphic-active' : ''}`} onClick={() => setActiveTab('onboard')}>
						<RequestIcon className="tab-icon" />
						<span>Onboard Request</span>
					</div>
					<div className={`tab-graphic${activeTab === 'employee' ? ' tab-graphic-active' : ''}`} onClick={() => setActiveTab('employee')}>
						<EmployeeIcon className="tab-icon" />
						<span>Current Employee</span>
					</div>
					<div className={`tab-graphic${activeTab === 'parking' ? ' tab-graphic-active' : ''}`} onClick={() => setActiveTab('parking')}>
						<ParkingIcon className="tab-icon" />
						<span>Parking Lot Details</span>
					</div>
				</div>
				<div className="dashboard-table-wrapper">
					<div className="admin-dashboard-actions" style={{ justifyContent: 'flex-end', marginBottom: '2rem' }}>
						<button className="onboard-btn" onClick={() => setPopupOpen(true)}>
							Onboard New Parking
						</button>
					</div>
					{activeTab === 'onboard' && (
						<table className="admin-dashboard-table">
							<thead>
								<tr>
									<th>Employee Name</th>
									<th>Email Id</th>
									<th>Requested On</th>
									<th>Parking Lot Name</th>
									<th>Address</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{requests.map(req => (
									<tr key={req.id} className={req.status !== 'pending' ? `row-${req.status}` : ''}>
										<td>{req.name}</td>
										<td>{req.email}</td>
										<td>{req.requestedOn}</td>
										<td>{req.parkingLot}</td>
										<td>{req.address}</td>
										<td>
											{req.status === 'pending' ? (
												<>
													<button className="approve-btn" onClick={() => handleAction(req.id, 'approved')}>
														Approve
													</button>
													<button className="reject-btn" onClick={() => handleAction(req.id, 'rejected')}>
														Reject
													</button>
												</>
											) : (
												<span className={`status-label ${req.status}`}>
													{req.status.charAt(0).toUpperCase() + req.status.slice(1)}
												</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					{activeTab === 'employee' && (
						<table className="admin-dashboard-table">
							<thead>
								<tr>
									<th>Employee Name</th>
									<th>Employee ID</th>
									<th>Parking Lot Name</th>
									<th>Address</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{employees.map(emp => (
									<tr key={emp.id} className={emp.status !== 'active' ? 'row-rejected' : ''}>
										<td>{emp.name}</td>
										<td>{emp.id}</td>
										<td>{emp.parkingLot}</td>
										<td>{emp.address}</td>
										<td>
											<button className="reject-btn" onClick={() => handleDeactivateEmployee(emp.id)} disabled={emp.status !== 'active'}>
												Deactivate
											</button>
											<button className="update-btn">Transfer</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					{activeTab === 'parking' && (
						<table className="admin-dashboard-table">
							<thead>
								<tr>
									<th>Parking Lot Name</th>
									<th>Address</th>
									<th>Bike</th>
									<th>Car</th>
									<th>Heavy Vehicle</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{parkingLots.map((lot, idx) => (
									<tr key={lot.name + idx} className={lot.status === 'active' ? 'row-approved' : 'row-rejected'}>
										<td>{lot.name}</td>
										<td>{lot.address}</td>
										<td>{lot.bike}</td>
										<td>{lot.car}</td>
										<td>{lot.heavy}</td>
										<td>
											{lot.status === 'active' ? (
												<>
													<button className="inactive-btn same-width-btn" onClick={() => handleDeactivateParkingLot(idx)}>
														Inactive
													</button>
													<button className="update-btn same-width-btn" disabled>
														Update
													</button>
												</>
											) : (
												<>
													<button className="active-btn same-width-btn" onClick={() => handleActivateParkingLot(idx)}>
														Active
													</button>
													<button className="update-btn same-width-btn">
														Update
													</button>
												</>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				<NewParkingLotPopup open={popupOpen} onClose={() => setPopupOpen(false)} onCreate={handleCreateParkingLot} />
			</div>
		</div>
	);
};

export default AdminDashboard;
