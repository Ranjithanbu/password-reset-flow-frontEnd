import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
const LoginPage = () => {

    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const initialValue = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({

        email: Yup.string().email().required('email is required'),
        password: Yup.string().required('Password required')

    })
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post('https://password-reset-flow-be-sxss.onrender.com/api/login', values).then(res => setMessage(res.data.msg))

                setTimeout(() => {
                    setMessage('')
                    navigate('/home')
                }, 3000);
            } catch (error) {

                setMessage('Invalid user credintial')

            }

        }

    })

    return (
        <div className='row mt-4'>
            <form onSubmit={formik.handleSubmit} >
                <div className='col-8 col-sm-8 col-md-4 d-flex flex-column justify-content-between border mx-auto p-3 text-white rounded-3' style={{ backgroundColor: '#5e007a', height: '70vh' }}>


                    <h1 className="h3 mb-3 fw-normal text-center">Log in</h1>


                    <div className="">
                        <label className='m-1' for="email">Email address</label>
                        <input type="email" name='email' className="form-control m-1" id="email" placeholder="name@example.com" onChange={formik.handleChange} />
                        <p>{formik.errors.email}</p>
                    </div>
                    <div className="">
                        <label className='m-1' for="password">Password</label>
                        <input type="password" name='password' className="form-control m-1" id="password" data-testid="royal_pass" placeholder="Password" onChange={formik.handleChange} />
                        <p>{formik.errors.password}</p>
                    </div>

                    <NavLink to={'/resetPassword'}>forgot password</NavLink>
                    <button className="btn btn-primary w-50 py-2 mx-auto" type="submit">log in</button>
                </div>

            </form>
            <h5 className='text-center'>{message}</h5>
        </div>
    );
};

export default LoginPage;