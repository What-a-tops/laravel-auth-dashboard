import { useState } from "react";
import {
    MagnifyingGlassIcon,
    UserPlusIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import Pagination from "../../../Components/Pagination";
import Modal from "../../../Components/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../Redux/features/User/userSlice";
import Loading from "../../../Components/Loading";

const User = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);
    const contacts = useSelector((state) => state.user.datas);

    const meta = useSelector((state) => state.user.meta);
    const [currentPageUrl, setCurrentPageUrl] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        dispatch(getUsers({ page: currentPageUrl, search: searchTerm }));
    }, [dispatch, currentPageUrl, searchTerm]);

    const fetchUsers = async (link) => {
        const url = new URL(link);
        setCurrentPageUrl(url.searchParams.get("page"));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const onDeleteClick = async (id) => {
        try {
            await dispatch(deleteUser(id)).unwrap();
            setOpenModal(false);
            dispatch(getUsers({ page: currentPageUrl }));
        } catch (error) {
            console.error("Error delete:", error);
        }
    };

    return (
        <div className="flex justify-center relative overflow-x-auto">
            <div className="w-full md:w-full lg:w-4/5 xl:w-3/4">
                <div className="mx-auto px-4 border rounded-md shadow mt-2">
                    <div className="flex flex-col md:flex-row justify-between items-center py-4">
                        <h1 className="text-3xl font-bold mb-2 md:mb-0">
                            Contacts
                        </h1>
                        <div className="flex space-x-2">
                            <Link
                                className="px-4 py-2 h-12 mt-1 rounded-lg bg-gray-800 shadow text-white border border-white hover:bg-gray-600 inline-flex items-center sm:w-auto md:w-auto sm:px-6 sm:py-3"
                                to="/admin/users/new"
                            >
                                <UserPlusIcon className="h-6 w-6 text-white mr-2" />
                                <span className="hidden sm:inline">
                                    Add Contact
                                </span>
                            </Link>
                            <div>
                                <label
                                    htmlFor="table-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative mt-1 flex items-center">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <TextInput
                                        type="search"
                                        id="table-search"
                                        className="block w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-gray-700 dark:focus:border-gray-700"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        autoComplete="search"
                                        placeholder="Search"
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="flex align-middle justify-center">
                            <table className="w-full text-sm text-gray-500 text-left rtl:text-right dark:text-gray-400 table-fixed">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-800 dark:bg-gray-800 dark:text-gray-200 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="p-2">ID</th>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Company</th>
                                        <th className="p-2">Phone</th>
                                        <th className="p-2">Email</th>
                                        <th className="p-2 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {status === "loading" ? (
                                    <tbody>
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center p-2 text-gray-900"
                                            >
                                                <div className="flex items-center justify-center min-h-80">
                                                    <div className="text-center py-4">
                                                        <Loading />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody className="table-group-divider">
                                        {status === "succeeded" &&
                                        contacts &&
                                        contacts.length > 0 ? (
                                            contacts.map((u, key) => (
                                                <tr
                                                    key={key}
                                                    className="text-nowrap bg-white text-lg text-gray-800 border-b dark:border-gray-700 hover:text-white dark:hover:bg-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <td className="p-4">
                                                        {key + 1}.
                                                    </td>
                                                    <td className="w-1/5 truncate">
                                                        {u.name}
                                                    </td>
                                                    <td className="w-1/5 truncate">
                                                        {u.company}
                                                    </td>
                                                    <td className="w-1/5 truncate">
                                                        {u.phone}
                                                    </td>
                                                    <td className="w-1/5 truncate">
                                                        {u.email}
                                                    </td>
                                                    <td>
                                                        <div className="flex space-x-2 justify-center">
                                                            <Link
                                                                type="button"
                                                                className="px-3 py-1 text-gray-900 hover:bg-blue-500 rounded-md hover:shadow hover:text-white transition-colors duration-200"
                                                                to={`/admin/users/edit/${u.id}`}
                                                            >
                                                                <PencilSquareIcon className="size-6 text-dark-500" />
                                                            </Link>
                                                            <button
                                                                onClick={
                                                                    handleOpenModal
                                                                }
                                                                type="button"
                                                                className="px-3 py-1 text-gray-900 hover:bg-red-500 rounded-md hover:rounded hover:shadow hover:text-white transition-colors duration-200"
                                                            >
                                                                <TrashIcon className="size-6 text-dark-500" />
                                                            </button>
                                                            {openModal && (
                                                                <Modal
                                                                    open={
                                                                        openModal
                                                                    }
                                                                    onClose={
                                                                        handleCloseModal
                                                                    }
                                                                    onConfirm={
                                                                        onDeleteClick
                                                                    }
                                                                    showCloseButton={
                                                                        true
                                                                    }
                                                                    title="Delete Contact"
                                                                    message="Are you sure you want to Delete your account? This action cannot be undone."
                                                                    id={u.id}
                                                                />
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center p-2 min-h-80"
                                                >
                                                    <h1>Empty Value</h1>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center items-center my-2">
                        {status === "succeeded" && meta?.links && (
                            <Pagination
                                links={meta.links}
                                fetchNextPrevTasks={fetchUsers}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
