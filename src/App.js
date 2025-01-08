import React from 'react';
import CalendarComponent from './Component/Calendar';
import Sidebar from './Component/Sidebar';
import AttendancePage from './Component/AtttendancePage'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LeaveForm from './Component/Leave';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/calendar" element={<CalendarComponent />} />
                <Route path="/paidleave" element={<LeaveForm/>} />
                <Route path='/attendancelogs' element={<AttendancePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
