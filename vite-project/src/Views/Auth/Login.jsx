import { useState } from "react";
import { Link } from "react-router-dom";
import InputLabel from "../../Components/InputLabel";
import TextInput from "../../Components/TextInput";
import InputError from "../../Components/InputError";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/features/Auth/authSlice";
import ButtonLoading from "../../Components/ButtonLoading";

function Login() {
    const [values, setValues] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const { errors, status } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        dispatch(loginUser(values));
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6 border p-6 rounded-lg shadow"
                        onSubmit={submit}
                        noValidate
                    >
                        <div className="mt-4">
                            <InputLabel htmlFor="user_email" value="Email" />
                            <TextInput
                                value={values.email}
                                onChange={handleChange}
                                id="user_email"
                                type="email"
                                name="email"
                                className="mt-1 block w-full"
                                isFocused={true}
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
                            <InputLabel
                                htmlFor="user_password"
                                value="Password"
                            />
                            <TextInput
                                value={values.password}
                                onChange={handleChange}
                                id="user_password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
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

                        {errors?.message && (
                            <InputError
                                message={errors.message}
                                className="mt-2"
                            />
                        )}

                        <div>
                            <ButtonLoading
                                type={"submit"}
                                status={status}
                                text={"Sign in"}
                            />
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not registered?{" "}
                        <Link
                            to="/register"
                            className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
                        >
                            Create account.
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
