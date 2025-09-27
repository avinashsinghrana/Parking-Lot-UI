import React, { useState, useEffect } from 'react';
import '../parking-history/ParkingHistory.css'; // Reuse the same CSS

const MOCK_SUBSCRIPTIONS = [
  {
    subscriptionId: 'SUB001',
    vehicleNumber: 'MH12AB1234',
    vehicleType: 'Car',
    employeeName: 'Rahul Sharma',
    employeeId: 'EMP001',
    startDate: '2025-08-01',
    endDate: '2025-11-01',
    plan: 'Quarterly',
    amount: 24000,
    status: 'Active',
    autoRenew: true,
    parkingLotId: 'A1',
    spotNumber: '23'
  },
  {
    subscriptionId: 'SUB002',
    vehicleNumber: 'MH14XY5678',
    vehicleType: 'Bike',
    employeeName: 'Priya Patel',
    employeeId: 'EMP002',
    startDate: '2025-09-01',
    endDate: '2025-10-01',
    plan: 'Monthly',
    amount: 3000,
    status: 'Active',
    autoRenew: true,
    parkingLotId: 'B1',
    spotNumber: '45'
  },
  {
    subscriptionId: 'SUB003',
    vehicleNumber: 'MH01CD4567',
    vehicleType: 'SUV',
    employeeName: 'Amit Kumar',
    employeeId: 'EMP003',
    startDate: '2025-07-01',
    endDate: '2026-01-01',
    plan: 'Half-yearly',
    amount: 72000,
    status: 'Active',
    autoRenew: false,
    parkingLotId: 'C1',
    spotNumber: '12'
  },
  {
    subscriptionId: 'SUB004',
    vehicleNumber: 'MH02EF8901',
    vehicleType: 'Car',
    employeeName: 'Sneha Gupta',
    employeeId: 'EMP004',
    startDate: '2025-09-01',
    endDate: '2025-12-01',
    plan: 'Quarterly',
    amount: 24000,
    status: 'Active',
    autoRenew: true,
    parkingLotId: 'A1',
    spotNumber: '34'
  },
  {
    subscriptionId: 'SUB005',
    vehicleNumber: 'MH03GH2345',
    vehicleType: 'Bike',
    employeeName: 'Arun Singh',
    employeeId: 'EMP005',
    startDate: '2025-08-15',
    endDate: '2025-09-15',
    plan: 'Monthly',
    amount: 3000,
    status: 'Expired',
    autoRenew: false,
    parkingLotId: 'B1',
    spotNumber: '56'
  },
  {
    subscriptionId: 'SUB006',
    vehicleNumber: 'MH04IJ6789',
    vehicleType: 'Electric Car',
    employeeName: 'Neha Verma',
    employeeId: 'EMP006',
    startDate: '2025-06-01',
    endDate: '2026-06-01',
    plan: 'Annual',
    amount: 90000,
    status: 'Active',
    autoRenew: true,
    parkingLotId: 'D1',
    spotNumber: '15'
  },
  {
    subscriptionId: 'SUB007',
    vehicleNumber: 'MH05KL0123',
    vehicleType: 'Commercial',
    employeeName: 'Vikram Malhotra',
    employeeId: 'EMP007',
    startDate: '2025-09-01',
    endDate: '2026-03-01',
    plan: 'Half-yearly',
    amount: 90000,
    status: 'Active',
    autoRenew: false,
    parkingLotId: 'E1',
    spotNumber: '08'
  },
  {
    subscriptionId: 'SUB008',
    vehicleNumber: 'MH06MN4567',
    vehicleType: 'Luxury Car',
    employeeName: 'Rajesh Kapoor',
    employeeId: 'EMP008',
    startDate: '2025-09-01',
    endDate: '2025-12-01',
    plan: 'Quarterly',
    amount: 54000,
    status: 'Active',
    autoRenew: true,
    parkingLotId: 'F1',
    spotNumber: '05'
  },
  {
    subscriptionId: 'SUB009',
    vehicleNumber: 'MH07OP8901',
    vehicleType: 'Scooter',
    employeeName: 'Meera Joshi',
    employeeId: 'EMP009',
    startDate: '2025-08-01',
    endDate: '2025-09-01',
    plan: 'Monthly',
    amount: 2500,
    status: 'Expired',
    autoRenew: false,
    parkingLotId: 'G1',
    spotNumber: '67'
  },
  {
    subscriptionId: 'SUB010',
    vehicleNumber: 'MH08QR2345',
    vehicleType: 'Handicapped',
    employeeName: 'Sunil Mehta',
    employeeId: 'EMP010',
    startDate: '2025-07-01',
    endDate: '2026-07-01',
    plan: 'Annual',
    amount: 60000,
    status: 'Active',
    autoRenew: true,
    parkingLotId: 'H1',
    spotNumber: '02'
  },
  {
    subscriptionId: 'SUB011',
    vehicleNumber: 'MH09ST6789',
    vehicleType: 'Electric Bike',
    employeeName: 'Aarti Chawla',
    employeeId: 'EMP011',
    startDate: '2025-09-01',
    endDate: '2025-10-01',
    plan: 'Monthly',
    amount: 2700,
    status: 'Active',
    autoRenew: true,
    parkingLotId: 'B1',
    spotNumber: '78'
  },
  {
    subscriptionId: 'SUB012',
    vehicleNumber: 'MH10UV0123',
    vehicleType: 'Reserved Spot',
    employeeName: 'Dinesh Tiwari',
    employeeId: 'EMP012',
    startDate: '2025-09-01',
    endDate: '2025-12-01',
    plan: 'Quarterly',
    amount: 45000,
    status: 'Pending',
    autoRenew: false,
    parkingLotId: 'A1',
    spotNumber: '01'
  }
];

const Subscription = ({ sidebarCollapsed }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Fixed at exactly 10 rows per page

  // Filter subscriptions based on search (vehicle number, employee name, or subscription ID)
  const filteredSubscriptions = MOCK_SUBSCRIPTIONS.filter(sub =>
    sub.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
    sub.employeeName.toLowerCase().includes(search.toLowerCase()) ||
    sub.subscriptionId.toLowerCase().includes(search.toLowerCase())
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Get current rows for pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSubscriptions.slice(indexOfFirstRow, indexOfLastRow);

  // Ensure we always have exactly 10 rows (or fill with empty rows)
  const rowsToDisplay = [...currentRows];
  while (rowsToDisplay.length < rowsPerPage) {
    rowsToDisplay.push(null); // Add empty rows to maintain exactly 10 items
  }

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredSubscriptions.length / rowsPerPage));

  // If current page is beyond total pages (e.g., after search filter), reset to page 1
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Change page
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Get status class for styling
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'expired': return 'status-expired';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className={`parking-history-container ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
      <h2 className="parking-history-title">Subscription</h2>
      <div className="parking-history-search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon"></span>
          <input
            type="text"
            placeholder="Search by Vehicle Number"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="parking-history-search-input"
          />
        </div>
        <div className="button-container">
          <button className="activate-button" onClick={() => alert('Activate Subscription functionality not implemented.')}>
            Activate Subscription
          </button>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="parking-history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle Number</th>
              <th>Employee Name</th>
              <th>Plan</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Auto Renew</th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay.map((subscription, index) => (
              subscription ? (
                <tr key={`${subscription.subscriptionId}-${index}`}>
                  <td>{subscription.subscriptionId}</td>
                  <td>{subscription.vehicleNumber}</td>
                  <td>{subscription.employeeName}</td>
                  <td>{subscription.plan}</td>
                  <td>{subscription.startDate}</td>
                  <td>{subscription.endDate}</td>
                  <td>{subscription.amount}</td>
                  <td className={getStatusClass(subscription.status)}>{subscription.status}</td>
                  <td>{subscription.autoRenew ? 'Yes' : 'No'}</td>
                </tr>
              ) : (
                <tr key={`empty-${index}`}>
                  <td colSpan="9">&nbsp;</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages || filteredSubscriptions.length === 0}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Subscription;
