import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
const ResetPassword = () => {

    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const { id, token } = useParams()

//passing new password to database    

    const handlePassword = async (e) => {
        e.preventDefault()
        const data = { password: e.target[0].value }
        await axios.put(`https://password-reset-flow-be-sxss.onrender.com/api/resetPassword/${token}`, data)
            .then(res => {
                setMessage(res.data.message)
                setTimeout(() => {
                    setMessage('')
                    navigate('/login')
                }, 3000)

            })
            .catch(err => setMessage(err.message))

    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-4 text-center row '>
            <div className='col-md-4 col-sm-6 border rounded ' style={{ backgroundColor: 'cadetblue', height: '50vh' }}>
                <form onSubmit={(e) => { handlePassword(e) }}>
                    <h3 className='m-4 pb-2 border-2 border-bottom text-white'>Reset Password</h3>
                    <input type="password" className='m-3 rounded' name="password" id="password" placeholder='Enter new password' /><br />
                    <button className='btn btn-primary m-3' type="submit">update</button>
                </form>
            </div>
            <p className='text-info fw-bold'>{message}</p>
        </div>
    );
};

export default ResetPassword;