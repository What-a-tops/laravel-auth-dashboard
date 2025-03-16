/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";
import InputLabel from "../../../Components/InputLabel";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../Components/Modal";
import {
    getUser,
    clearData,
    addUser,
    updateUser,
} from "../../../Redux/features/User/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "../../../Components/Loading";
import ImageUploadPreview from "./ImagePreview";
import Button from "../../../Components/Button";

const AddEditUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialUserFormState = {
        id: null,
        profile_photo: null,
        name: "",
        company: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const [userForm, setUserForm] = useState(initialUserFormState);

    const { name, email, company, phone, password, password_confirmation } =
        userForm;

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const status = useSelector((state) => state.user.status);
    const user = useSelector((state) => state.user.data);
    const { errors } = useSelector((state) => state.user);

    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState(null);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    await dispatch(getUser(id));
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            fetchUser();
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (user) {
            setUserForm(user);
            if (user.profile_photo) {
                console.log(user.profile_photo);
                setImagePreview(
                    import.meta.env.VITE_BACKEND_URL + user.profile_photo
                );
            }
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setUserForm((prevUser) => ({
            ...prevUser,
            [name]: files ? files[0] : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setUserForm((prevUser) => ({
                ...prevUser,
                profile_photo: file,
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Ensure reader.result is a data URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                const updatedUser = { ...userForm, id };
                const actionResult = await dispatch(
                    updateUser({ values: updatedUser, id })
                );
                unwrapResult(actionResult);
                setMessage("User updated successfully.");
            } else {
                const actionResult = await dispatch(addUser(userForm));
                unwrapResult(actionResult);
                setMessage("User added successfully.");
            }

            setOpenModal(true);
        } catch (error) {
            console.error("Failed to add / updated user:", error);
        }
    };

    const onConfirm = async () => {
        clearForm();
        navigate("/admin/users");
    };

    const clearForm = () => {
        dispatch(clearData());
        setUserForm(initialUserFormState);
        setMessage(null);
        setOpenModal(false);
    };

    return (
        <div className="card">
            {status === "loading" && (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center py-4">
                        <Loading />
                    </div>
                </div>
            )}
            {(status === "succeeded" ||
                status === "failed" ||
                status === "idle") && (
                <div className="py-2">
                    <div className="w-3/4 mx-auto sm:px-6">
                        <div className="bg-white overflow-hidden border shadow-sm sm:rounded-lg">
                            <div className="pl-4 py-2 text-center bg-gray-800 text-white">
                                {userForm.id ? (
                                    <h3>Update User: {name}</h3>
                                ) : (
                                    <h3>Add User</h3>
                                )}
                            </div>
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white sm:rounded-lg"
                                noValidate
                            >
                                <div className="flex flex-row gap-4">
                                    <div className="basis-1/4">
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="user-profile"
                                                value="Upload Photo"
                                            />
                                            <ImageUploadPreview
                                                handleDragOver={handleDragOver}
                                                handleDrop={handleDrop}
                                                selectedImage={selectedImage}
                                                imagePreview={imagePreview}
                                                handleFileChange={
                                                    handleFileChange
                                                }
                                            />
                                            {errors?.profile_photo && (
                                                <InputError
                                                    message={
                                                        errors.profile_photo
                                                    }
                                                    className="mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="basis-3/4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Name"
                                                />
                                                <TextInput
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={name || ""}
                                                    className="mt-1 block w-full"
                                                    isFocused={true}
                                                    placeholder="Enter Name"
                                                    onChange={handleChange}
                                                    autoComplete="username"
                                                />
                                                {errors?.name && (
                                                    <InputError
                                                        message={errors.name}
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={email || ""}
                                                    className="mt-1 block w-full"
                                                    placeholder="Enter Email"
                                                    onChange={handleChange}
                                                    autoComplete="username"
                                                />
                                                {errors?.email && (
                                                    <InputError
                                                        message={errors.email}
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="company"
                                                    value="Company"
                                                />
                                                <TextInput
                                                    id="company"
                                                    type="text"
                                                    name="company"
                                                    value={company || ""}
                                                    className="mt-1 block w-full"
                                                    placeholder="Enter Company"
                                                    onChange={handleChange}
                                                />
                                                {errors?.company && (
                                                    <InputError
                                                        message={errors.company}
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Phone"
                                                />
                                                <TextInput
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    value={phone || ""}
                                                    className="mt-1 block w-full"
                                                    placeholder="Enter Phone"
                                                    onChange={handleChange}
                                                    minLength="11"
                                                />
                                                {errors?.phone && (
                                                    <InputError
                                                        message={errors.phone}
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="Password"
                                                />
                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    className="mt-1 block w-full"
                                                    placeholder="Enter Password"
                                                    value={password || ""}
                                                    onChange={handleChange}
                                                    autoComplete="new-password"
                                                />
                                                {errors?.password && (
                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
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
                                                    value={
                                                        password_confirmation ||
                                                        ""
                                                    }
                                                    onChange={handleChange}
                                                    autoComplete="new-password"
                                                />
                                                {errors?.password_confirmation && (
                                                    <InputError
                                                        message={
                                                            errors.password_confirmation
                                                        }
                                                        className="mt-2"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="px-6 py-3.5 flex items-center bg-gray-800 text-white rounded-lg shadow transition-all hover:bg-gray-600 mr-2"
                                        >
                                            <CheckCircleIcon className="h-6 w-6 text-white mr-2" />
                                            Submit
                                        </button>
                                        <Link
                                            to="/admin/users"
                                            onClick={clearForm}
                                            className="px-6 py-3.5 flex items-center rounded-lg bg-red-600 text-white focus:ring-red-300 shadow transition-all hover:bg-red-500"
                                        >
                                            <XCircleIcon className="h-6 w-6 text-white mr-2" />
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <Modal
                open={openModal}
                onConfirm={onConfirm}
                onClose={handleCloseModal}
                showCloseButton={false}
                title="Success!"
                message={message}
            />
        </div>
    );
};

export default AddEditUser;
