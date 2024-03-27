import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
const CreateUser = () => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const initialValue = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Username is required'),
        email: Yup.string().email().matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'enter valid mail').required('email is required'),
        password: Yup.string().min(5, 'password should be minimum 5 charactor').max(10, 'password shuld less than 10 charactor').required('Password required')

    })
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: async (values) => {
            await axios.post('https://password-reset-flow-be-sxss.onrender.com/api/register', values).then(res => setMessage(res.data.message))

            setTimeout(() => {
                setMessage('')
                navigate('/login')
            }, 3000);
        }

    })

    return (
        <div className='row mt-4'>
            <form onSubmit={formik.handleSubmit} >
                <div className='col-8 col-sm-6 col-md-4 d-flex flex-column justify-content-between border mx-auto p-3 text-white rounded-4' style={{ backgroundColor: "#006466", height: '75vh' }}>


                    <h1 className="h3 mb-3 fw-normal text-center">Create Account</h1>
                    <div className="">
                        <label className='m-1' for="name">User name</label>
                        <input type="text" name='name' className="form-control m-1" id="name" placeholder="jhoe" onChange={formik.handleChange} />
                        <p>{formik.errors.name}</p>
                    </div>

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

                    <p>already have an account <NavLink to='/login'>login</NavLink></p>
                    <button className="btn btn-primary w-50 py-2 mx-auto" type="submit">Create</button>
                </div>

            </form>
            <p className='text-center text-info'>{message}</p>
        </div>
    );
};

export default CreateUser;