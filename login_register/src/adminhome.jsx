// LabAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSSPopup.css'

function LabAdminDashboard() {
    const [reserves, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCSSPopup, setShowCSSPopup] = useState(false); 

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/reserves');
                setPatients(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);
    const sendSMS = async (mobileNumber,index) => {
        try {
            const response = await axios.post('http://localhost:3001/api/send-sms', {
                route: 'q',
                message: 'Your test report is ready.',
                language: 'english',
                flash: 0,
                numbers: mobileNumber,
            });
            console.log('SMS sent:', response.data);
            // Handle success
            const updatedReserves = [...reserves];
            updatedReserves[index].smsSent = true;
            setPatients(updatedReserves);
        } catch (error) {
            console.error('Error sending SMS:', error);
            // Handle error
        }
    };
    const handleCSSPopup = () => {
        setShowCSSPopup(true);
      };
    
      const handleCloseCSSPopup = () => {
        setShowCSSPopup(false);
      };
    
    return (
        <div>
            <h2>Lab Admin Dashboard</h2>
            
            {loading ? (
                <div>Loading...</div>
            ) : reserves.length === 0 ? (
                <div>No patients found.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Patient Id</th>
                            <th>Doctor Id</th>
                            <th>Mobile No</th>
                            <th>Test Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Alert Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserves.map((reserves, index) => (
                            <tr key={index}>
                                <td>{reserves.name}</td>
                                <td>{reserves.pid}</td>
                                <td>{reserves.did}</td>
                                <td>{reserves.mobileno}</td>
                                <td>{reserves.testname}</td>
                                <td>{reserves.date}</td>
                                <td>{reserves.time}</td>
                                <td><button onClick={() => sendSMS(reserves.mobileno,index)} style={{
                                        borderRadius: '50px',
                                        padding: '10px 20px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer'
        }}>Send SMS</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showCSSPopup && <CSSPopup handleClose={handleCloseCSSPopup} />} 

        </div>
    );
}

export default LabAdminDashboard;
