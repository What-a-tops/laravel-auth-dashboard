/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "../../Components/InputLabel";
import TextInput from "../../Components/TextInput";
import InputError from "../../Components/InputError";
import Alert from "../../Components/Alert";

import { clearData, registerUser } from "../../Redux/features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import ButtonLoading from "../../Components/ButtonLoading";

function register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errors, status } = useSelector((state) => state.user);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const [values, setValues] = useState(initialValues);
    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = () => setOpenModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const onConfirm = () => {
        navigate("/login");
    };
    const submit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(registerUser(values));
            unwrapResult(resultAction);
            dispatch(clearData());
            setOpenAlert(true);
        } catch (rejectedValueOrSerializedError) {
            console.error(
                "Failed to add user:",
                rejectedValueOrSerializedError
            );
            setError(rejectedValueOrSerializedError);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12 lg:px-4 overflow-hidden">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register
                    </h2>
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={submit}
                        className="space-y-6 border p-6 rounded-lg shadow"
                        noValidate
                    >
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                autoComplete="name"
                                placeholder="Enter Name"
                            />
                            {errors?.name && (
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                placeholder="Enter Email"
                            />
                            {errors?.email && (
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                                className="mt-1 block w-full"
                                placeholder="Enter Password"
                            />
                            {errors?.password && (
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Password Confirmation"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                className="mt-1 block w-full"
                                placeholder="Enter Confirm Password"
                                onChange={handleChange}
                                value={values.password_confirmation}
                            />
                            {errors?.password_confirmation && (
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <ButtonLoading
                            type={"submit"}
                            status={status}
                            text={"Register"}
                        />
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-gray-800 hover:text-gray-500"
                        >
                            Login.
                        </Link>
                    </p>
                </div>
            </div>
            {openAlert && (
                <Alert
                    open={openAlert}
                    onConfirm={onConfirm}
                    onClose={handleCloseAlert}
                    showCloseButton={false}
                    title="Success!"
                    message="Thank you for registering."
                />
            )}
        </>
    );
}

export default register;
