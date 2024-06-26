import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import {useNavigate } from "react-router-dom";
import './login.css'

function AdminLogin(){
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/adminlogin',{ email, password})
        .then(result => {console.log(result)
            navigate('/adminhome')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="background d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Admin</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                    <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">LOGIN</button>
                    </form>
                    
                    
            </div>
        </div>
    );
}
export default AdminLogin;