import React, { useState } from 'react';
import { CredentialStore } from '../Login/Login';
import Header from '../Header';
import Sidebar from './Sidebar';
import './EmployeeDashboard.css';
import './Dashboard.css'; // Import Dashboard-specific CSS
import '../dashboard/parking-history/ParkingHistory.css'; // Import ParkingHistory CSS for consistent styling
import { QRCodeSVG } from 'qrcode.react';
import { Routes, Route } from 'react-router-dom';
import ParkingHistory from './parking-history/ParkingHistory';
import ParkingStatus from './parking-status/ParkingStatus';
import FareDetails from './fare-details/FareDetails';
import ParkingBooking from './parking-booking/ParkingBooking';
import Subscription from './subscription/Subscription';
import LostComplaint from './lost-complaint/LostComplaint';

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
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('CASH');
    const [showCheckInPopup, setShowCheckInPopup] = useState(false);

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

	function getGreeting() {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good Morning';
		if (hour < 17) return 'Good Afternoon';
		return 'Good Evening';
	}
    // Handle Check In button click
    const handleCheckInClick = () => {
        setShowCheckInPopup(true);
    };

	return (
		<Routes>
			<Route path="/*" element={
				<div>
					<Header
						user={{ name: employeeName, employeeId: employeeId }}
						showAdmin={false}
						showRegister={false}
						onHamburgerClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
					/>
					<Sidebar collapsed={sidebarCollapsed} />
					<Routes>
						<Route path="parking-history" element={<ParkingHistory sidebarCollapsed={sidebarCollapsed} />} />
						<Route path="fare-details" element={<FareDetails sidebarCollapsed={sidebarCollapsed} />} />
						<Route path="parking-booking" element={<ParkingBooking sidebarCollapsed={sidebarCollapsed} />} />
						<Route path="subscription" element={<Subscription sidebarCollapsed={sidebarCollapsed} />} />
						<Route path="lost-complaint" element={<LostComplaint sidebarCollapsed={sidebarCollapsed} />} />
						<Route path="parking-status" element={<ParkingStatus sidebarCollapsed={sidebarCollapsed} />} />
						<Route path="/" element={
							<div className={`parking-history-container ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
								<h2 className="dashboard-title">{getGreeting()}, {employeeName || 'Employee'}!</h2>
								<div className="employee-info">
									<span>
										<b>Employee ID:</b> {employeeId || '-'}
									</span>
								</div>

                                <div className="dashboard-actions">
                                    <h3 className="dashboard-subtitle">Vehicle Details</h3>
                                    <button className="check-in-btn" onClick={handleCheckInClick}>
                                        Check In
                                    </button>
                                </div>

								<div className="table-wrapper">
									<table className="parking-history-table">
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
															className="exit-btn"
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
								</div>
								{showExitPopup && selectedVehicle && (
									<>
										<div className="exit-popup-overlay" onClick={() => setShowExitPopup(false)}></div>
										<div className="exit-popup-card logo-theme">
											<span className="exit-popup-close" onClick={() => setShowExitPopup(false)} title="Close">&#10005;</span>
											<div className="exit-popup-title">Parking Charge Details</div>
											<table className="exit-popup-details-table">
												<tbody>
													<tr>
														<td className="exit-popup-detail-label"><b>Vehicle Number:</b></td>
														<td className="exit-popup-detail-value">{selectedVehicle.vehicleNumber}</td>
													</tr>
													<tr>
														<td className="exit-popup-detail-label"><b>Entry Time:</b></td>
														<td className="exit-popup-detail-value">{selectedVehicle.entryTime}</td>
													</tr>
													<tr>
														<td className="exit-popup-detail-label"><b>Exit Time:</b></td>
														<td className="exit-popup-detail-value">{selectedVehicle.exitTime}</td>
													</tr>
													<tr>
														<td className="exit-popup-detail-label"><b>Fare:</b></td>
														<td className="exit-popup-detail-value">₹{selectedVehicle.fare}</td>
													</tr>
												</tbody>
											</table>
											<div className="exit-popup-payment-method">
												<label htmlFor="payment-method" className="exit-popup-detail-label">Payment Method:</label>
												<select
													id="payment-method"
													className="exit-popup-payment-dropdown"
													value={paymentMethod}
													onChange={e => setPaymentMethod(e.target.value)}
												>
													<option value="CASH">CASH</option>
													<option value="Card">Card</option>
													<option value="UPI">UPI</option>
												</select>
											</div>
											{paymentMethod === 'UPI' && (
												<div className="exit-popup-qr-section">
													<div className="exit-popup-detail-label" style={{marginBottom: '0.5rem'}}>Scan to pay via UPI:</div>
													<QRCodeSVG
														value="upi://pay?pa=test@upi&pn=TestUser&am=100"
														size={128}
														bgColor="#fffbe6"
														fgColor="#a57b0a"
														className="exit-popup-qr-code"
													/>
												</div>
											)}
											<button
												className="confirm-exit-btn"
												onClick={handleConfirmExit}
											>
												Confirm
											</button>
										</div>
									</>
								)}

                                {showCheckInPopup && (
                                    <>
                                        <div className="exit-popup-overlay" onClick={() => setShowCheckInPopup(false)}></div>
                                        <div className="exit-popup-card logo-theme">
                                            <span className="exit-popup-close" onClick={() => setShowCheckInPopup(false)} title="Close">&#10005;</span>
                                            <div className="exit-popup-title">Check In Vehicle</div>
                                            <div className="check-in-form">
                                                {/* Check-in form fields will go here */}
                                                <p>Check-in form coming soon...</p>
                                            </div>
                                            <button
                                                className="confirm-exit-btn"
                                                onClick={() => setShowCheckInPopup(false)}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </>
                                )}
							</div>
						} />
					</Routes>
				</div>
			} />
		</Routes>
	);
};

export default EmployeeDashboard;
