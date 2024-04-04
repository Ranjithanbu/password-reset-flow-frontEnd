import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const ResetPage = ({ token, setToken }) => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const handleReset = async (e) => {
        e.preventDefault()
        const data = { email: e.target[0].value }
        await axios.post('http://localhost:5000/api/resetPasswordLink', data)
            .then(res => {
                setMessage(res.data.message)
                console.log(token);
                setToken(res.data.token)
                console.log(token);
                setTimeout(() => {
                    setMessage('')

                }, 3000)

            })
            .catch(err => setMessage(err.message))

    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-4 text-center row ' >
            <div className='col-md-4 border rounded ' style={{ backgroundColor: "#83c5be", height: '50vh' }}>
                <form onSubmit={(e) => { handleReset(e) }} >
                    <h3 className='m-4 pb-2 border-2 border-bottom text-primary' >Password Reset Page</h3>
                    <input type="email" className='m-3 rounded' name="email" id="email" placeholder='enter your email id' /><br />
                    <button type="submit" className='btn btn-primary m-3' >submit</button>
                </form>

            </div>
            <p className='text-info fw-bold'>{message}</p>
        </div>

    );
};

export default ResetPage;
