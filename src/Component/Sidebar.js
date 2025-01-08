import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCalendar, FaBell, FaEnvelope, FaHome, FaClock, FaCalendarCheck, FaMoneyBill, FaBuilding, FaChevronDown, FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Sidebar = () => {
    const [attendanceOpen, setAttendanceOpen] = useState(false);
    const [leaveOpen, setLeaveOpen] = useState(false);
    const [financesOpen, setFinancesOpen] = useState(false);
    const [organisationOpen, setOrganisationOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);  

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="d-flex">
            {/* Sidebar Section */}
            <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="user-section">
                    <FaUser className="user-logo" />
                    {isExpanded && <h4 className="username">Username</h4>}
                </div>

                {/* Attendance Section */}
                <div className="sidebar-item" onClick={() => setAttendanceOpen(!attendanceOpen)}>
                    <FaClock />
                    {isExpanded && <span>Attendance</span>}
                    <FaChevronDown className="dropdown-icon" />
                </div>
                {attendanceOpen && isExpanded && (
                    <div className="dropdown-content">
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/attendancelogs')}>Attendance Logs</div>
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/attendancerequests')}>Attendance Requests</div>
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/timings')}>Timings</div>
                    </div>
                )}

                {/* Leave Section */}
                <div className="sidebar-item" onClick={() => setLeaveOpen(!leaveOpen)}>
                    <FaCalendarCheck />
                    {isExpanded && <span>Leave</span>}
                    <FaChevronDown className="dropdown-icon" />
                </div>
                {leaveOpen && isExpanded && (
                    <div className="dropdown-content">
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/casualleave')}>Casual Leave</div>
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/paidleave')}>Paid Leave</div>
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/unpaidleave')}>Unpaid Leave</div>
                    </div>
                )}

                
                {/* Finances Section */}
                <div className="sidebar-item" onClick={() => setFinancesOpen(!financesOpen)}>
                    <FaMoneyBill />
                    {isExpanded && <span>Finances</span>}
                    <FaChevronDown className="dropdown-icon" />
                </div>
                {financesOpen && isExpanded && (
                    <div className="dropdown-content">
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/financesummary')}>Summary</div>
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/salaryslip')}>Salary Slip</div>
                    </div>
                )}

                {/* Organisation Section */}
                <div className="sidebar-item" onClick={() => setOrganisationOpen(!organisationOpen)}>
                    <FaBuilding />
                    {isExpanded && <span>Organisation</span>}
                    <FaChevronDown className="dropdown-icon" />
                </div>
                {organisationOpen && isExpanded && (
                    <div className="dropdown-content">
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/documents')}>Documents</div>
                        <div className="sidebar-subitem" onClick={() => handleNavigation('/employees')}>Employees</div>
                    </div>
                )}
            </div>

            {/* Main Content Section */}
            <div className={`main-content w-100 ${isExpanded ? 'expanded' : 'collapsed'}`} >
                <Navbar variant="light" expand="lg" >
                    <Container fluid className="d-flex justify-content-between align-items-center">
                        <Nav className="d-flex align-items-center">
                            <Nav.Link onClick={toggleSidebar} className="toggle-icon">
                                <FaBars size={25} />
                            </Nav.Link>
                        </Nav>

                        <Navbar.Collapse>
                            <Nav className="d-flex align-items-center">
                                <Nav.Link href="#">
                                    <FaBell size={20} />
                                </Nav.Link>
                                <Nav.Link href="#">
                                    <FaEnvelope size={20} />
                                </Nav.Link>
                            </Nav>

                            <Nav className="d-flex justify-content-center flex-grow-1">
                                <form className="d-flex w-75">
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                </form>
                            </Nav>

                            <Nav className="d-flex align-items-center">
                                <p>Username</p>
                                <Nav.Link href="#">
                                    <FaCalendar size={20} onClick={() => handleNavigation('/calendar')} />
                                </Nav.Link>
                                <Nav.Link href="#">
                                    <FaHome size={20} />
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
};

export default Sidebar;
