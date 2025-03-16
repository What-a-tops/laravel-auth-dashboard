import { useState } from "react";
import {
    MagnifyingGlassIcon,
    UserPlusIcon,
    PencilSquareIcon,
    ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import Pagination from "../../../Components/Pagination";
import Modal from "../../../Components/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../Redux/features/User/userSlice";
import Loading from "../../../Components/Loading";
import Button from "../../../Components/Button";

const User = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);
    const contacts = useSelector((state) => state.user.datas);

    const meta = useSelector((state) => state.user.meta);
    const [currentPageUrl, setCurrentPageUrl] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedContacts, setSelectedContacts] = useState([]);
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

    const handleCheckboxChange = (e, id) => {
        if (e.target.checked) {
            setSelectedContacts([...selectedContacts, id]);
        } else {
            setSelectedContacts(
                selectedContacts.filter((contactId) => contactId !== id)
            );
        }
    };

    const handleAllCheckboxChange = () => {
        if (selectedContacts.length === contacts.length) {
            setSelectedContacts([]);
        } else {
            setSelectedContacts(contacts.map((contact) => contact.id));
        }
    };

    const handleMassDelete = async () => {
        if (selectedContacts.length === 0) return;

        try {
            await Promise.all(
                selectedContacts.map((id) => dispatch(deleteUser(id)).unwrap())
            );
            setSelectedContacts([]);
            dispatch(getUsers({ page: currentPageUrl, search: searchTerm }));
            setOpenModal(false);
        } catch (error) {
            console.error("Error deleting multiple contacts:", error);
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
                            <Button
                                color="red"
                                onClick={handleOpenModal}
                                disabled={selectedContacts.length === 0}
                            >
                                <ArchiveBoxXMarkIcon className="h-6 w-6 text-red-700 mr-2 dark:text-red-500 transition-colors duration-200 group-hover:text-white" />
                                Mass Delete
                            </Button>

                            <Button color="gray" to="/admin/users/new">
                                <UserPlusIcon className="h-6 w-6 text-gray-700 mr-2 dark:gray-red-500 transition-colors duration-200 group-hover:text-white" />
                                <span className="hidden sm:inline">
                                    Add Contact
                                </span>
                            </Button>
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
                                        className="block w-full rounded-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-gray-700 dark:focus:border-gray-700"
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
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-gray-500 text-left rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-800 dark:bg-gray-800 dark:text-gray-200 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="p-2 text-center w-16">
                                            <div className="flex justify-center items-center h-full">
                                                <input
                                                    id="default-checkbox"
                                                    type="checkbox"
                                                    className={`${
                                                        contacts &&
                                                        contacts.length > 0
                                                            ? "cursor-pointer"
                                                            : "cursor-not-allowed"
                                                    }  w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                                                    checked={
                                                        contacts &&
                                                        contacts.length > 0 &&
                                                        selectedContacts.length ===
                                                            contacts.length
                                                    }
                                                    disabled={
                                                        contacts &&
                                                        contacts.length === 0
                                                    }
                                                    onChange={
                                                        handleAllCheckboxChange
                                                    }
                                                />
                                            </div>
                                        </th>
                                        <th className="p-2 w-16 text-center">
                                            ID
                                        </th>
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
                                                colSpan="7"
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
                                                    <td className="p-4 w-16">
                                                        <div className="flex justify-center items-center h-full">
                                                            <input
                                                                id="default-checkbox"
                                                                type="checkbox"
                                                                checked={selectedContacts.includes(
                                                                    u.id
                                                                )}
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(
                                                                        e,
                                                                        u.id
                                                                    )
                                                                }
                                                                className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-blue-700 dark:border-blue-600"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center w-16">
                                                        {key + 1}.
                                                    </td>
                                                    <td className="p-4 w-1/5 truncate">
                                                        {u.name}
                                                    </td>
                                                    <td className="p-4 w-1/5 truncate">
                                                        {u.company}
                                                    </td>
                                                    <td className="p-4 w-1/5 truncate">
                                                        {u.phone}
                                                    </td>
                                                    <td className="p-4 w-1/5 truncate">
                                                        {u.email}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex space-x-2 justify-center">
                                                            <Link
                                                                type="button"
                                                                className="px-3 py-1 text-gray-900 hover:bg-blue-500 rounded-md hover:shadow hover:text-white transition-colors duration-200"
                                                                to={`/admin/users/edit/${u.id}`}
                                                            >
                                                                <PencilSquareIcon className="size-6 text-dark-500" />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
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
                        {status === "succeeded" &&
                            (contacts && contacts.length) > 0 &&
                            meta?.links && (
                                <Pagination
                                    links={meta.links}
                                    fetchNextPrevTasks={fetchUsers}
                                />
                            )}
                    </div>
                </div>
                {openModal && (
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        onConfirm={handleMassDelete}
                        showCloseButton={true}
                        title="Delete Contact"
                        message="Are you sure you want to delete your account? This action cannot be undone."
                    />
                )}
            </div>
        </div>
    );
};

export default User;
