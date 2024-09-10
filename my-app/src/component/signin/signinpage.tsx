import { Link, useNavigate } from "react-router-dom"
import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import Button from "../reusable/button/button";
import { AppConfig } from "../../config/app.config";
import { errorMessage } from "../../utils/helper";
import { toast } from "sonner";
import axios from 'axios';
import Cookie from "js-cookie";

interface ISigninForm {
    email: string,
    password: string
}

const SigninPage = () => {
    const navigate = useNavigate();

    const signinValidation = yup.object().shape({
        email: yup.string().email("Please enter a valid email address").required("Email address is required"),
        password: yup
            .string()
            .required("Password is required")
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ISigninForm>({
        resolver: yupResolver(signinValidation),
    });

    const onSignin = useCallback(async (values: ISigninForm) => {
        try {
            const { data } = await axios.post(`${AppConfig.API_URL}/login`, {
                email: values.email,
                password: values.password
            })
            Cookie.set('accessToken', data.accessToken);
            Cookie.set('userId', data.user._id);
            Cookie.set('role', data.user.role);

            console.log(data)


            switch (data.user.role) {
                case "admin":
                    navigate('/dashboard')
                    break;
                case "user":
                    navigate('/user-dashboard')
                    break;
                default:
                    break;
            }

            toast.success(data.message || "Login Successfully")

        } catch (error) {
            toast.error(errorMessage(error))
            console.log(error)
        }
    }, [navigate])

    return (
        <div>


            <section className="bg-gray-50 dark:bg-gray-900" onSubmit={handleSubmit(onSignin)}>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="flex flex-col justify-center">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
                        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                    </div>
                    <div>
                        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Sign in
                            </h2>
                            <form className="mt-8 space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email"
                                        id="email"
                                        {...register("email")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                    {
                                        errors.email &&
                                        <span className="text-red-600">{errors.email.message}</span>
                                    }
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password"
                                        {...register("password")}
                                        id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    {
                                        errors.password &&
                                        <span className="text-red-600">{errors.password.message}</span>
                                    }
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div className="ms-3 text-sm">
                                        <label className="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
                                    </div>
                                    <a href="#" className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</a>
                                </div>
                                <Button
                                    buttonType={'submit'}
                                    buttonColor={{
                                        primary: true,
                                    }}>
                                    Log in to your account
                                </Button>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    Not registered yet?
                                    <Link to="/register">
                                        <button className="text-blue-600 hover:underline dark:text-blue-500">Register</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default SigninPage