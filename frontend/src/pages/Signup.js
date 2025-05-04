import React, { useState } from 'react';
import { signupUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user' // default role
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signupUser(formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
