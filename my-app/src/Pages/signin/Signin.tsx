import React, { useCallback } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import Button from '../../component/reusable/button/button'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { AppConfig } from '../../config/app.config';
import { toast } from 'sonner';
import { errorMessage } from '../../utils/helper';
import cookie from "js-cookie"
import { useNavigate } from 'react-router-dom';

interface ILoginForm {
    email: string,
    password: string
}

const Login = () => {
const navigate = useNavigate()
    const loginSchema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required()
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema)
    })

    const onLogin = useCallback(async(values: ILoginForm) => {
        try {
            const { data } = await axios.post(`${AppConfig.API_URL}/login`, {
                email: values.email,
                password: values.password
            })
            console.log(data)
            toast.success(data.message || "login sucessful")
            cookie.set('accessToken', data.accessToken);
            cookie.set('userId', data.user._id);
            cookie.set('role', data.user.role);

            navigate("/dashboard")
        } catch (error) {
            console.log(error)
            toast.error(errorMessage(error))
        }
    }, [navigate])

    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onLogin)}>
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="John"
                    />
                    {
                        errors.email &&
                        <span className='text-red-600 text-sm'>{errors.email.message}</span>
                    }
                </div>
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="text"
                        id="password"
                        {...register("password")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="John"
                    />
                    {
                        errors.password &&
                        <span className='text-red-600 text-sm'>{errors.password.message}</span>
                    }
                </div>
                <Button
                    buttonType={'submit'}
                    buttonColor={{
                        primary: true,
                    }} >
                    login
                </Button>
            </form>
        </div>
    )
}

export default Login