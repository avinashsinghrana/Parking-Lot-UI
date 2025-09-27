import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from './icons/DashboardIcon.svg';
import { ReactComponent as ParkingHistoryIcon } from './icons/ParkingHistoryIcon.svg';
import { ReactComponent as FareDetailsIcon } from './icons/FareDetailsIcon.svg';
import { ReactComponent as ParkingStatusIcon } from './icons/ParkingStatusIcon.svg';
import { ReactComponent as ParkingBookingIcon } from './icons/ParkingBookingIcon.svg';
import { ReactComponent as SubscriptionIcon } from './icons/SubscriptionIcon.svg';
import { ReactComponent as LostComplaintIcon } from './icons/LostComplaintIcon.svg';
import './Sidebar.css';

const sidebarOptions = [
  { to: '/employee-dashboard', icon: DashboardIcon, label: 'Dashboard', exact: true },
  { to: '/employee-dashboard/parking-history', icon: ParkingHistoryIcon, label: 'Parking History', circle: true },
  { to: '/employee-dashboard/fare-details', icon: FareDetailsIcon, label: 'Fare Details', circle: true },
  { to: '/employee-dashboard/parking-status', icon: ParkingStatusIcon, label: 'Parking Status', circle: true },
  { to: '/employee-dashboard/parking-booking', icon: ParkingBookingIcon, label: 'Parking Booking', circle: true },
  { to: '/employee-dashboard/subscription', icon: SubscriptionIcon, label: 'Subscription', circle: true },
  { to: '/employee-dashboard/lost-complaint', icon: LostComplaintIcon, label: 'Lost Complaint', circle: true },
];

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`sidebar-container${collapsed ? ' collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {sidebarOptions.map(({ to, icon: Icon, label, circle, exact }) => {
          // Check if current route matches this sidebar item
          // For the Dashboard (root path), only match exactly "/employee-dashboard" or "/employee-dashboard/"
          // For other items, match their exact paths
          let isActive = false;

          if (exact) {
            // Dashboard path should only be active if it's exactly "/employee-dashboard" or "/employee-dashboard/"
            isActive = currentPath === to || currentPath === `${to}/`;
          } else {
            // For other menu items, match their exact paths
            isActive = currentPath === to;
          }

          return (
            <NavLink
              to={to}
              key={to}
              className={`sidebar-link${isActive ? ' active-link' : ''}`}
            >
              <span className={`sidebar-icon-wrapper${circle ? ' sidebar-icon-circle' : ''}${isActive ? ' active-icon' : ''}`}>
                <Icon className="sidebar-icon" />
              </span>
              {!collapsed && <span className="sidebar-label">{label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
