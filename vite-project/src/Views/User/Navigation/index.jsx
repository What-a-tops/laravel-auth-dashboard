/* eslint-disable react/prop-types */
import {
    ArrowLeftIcon,
    ArrowRightStartOnRectangleIcon,
    Bars3BottomLeftIcon,
    ClipboardDocumentIcon,
    HomeIcon,
    UserCircleIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function classNames(...classNames) {
    return classNames.filter(Boolean).join(" ");
}

const navigation = [
    { name: "Home", to: "/user/home", icon: HomeIcon },
    {
        name: "Tasks",
        to: "/user/tasks",
        icon: ClipboardDocumentIcon,
    },
    { name: "Profile", to: "/user/profile", icon: UserIcon },
];

const Navigation = ({ users, logout }) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = (e) => {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="relative">
                <aside
                    id="sidebar-multi-level-sidebar"
                    className={`fixed top-0 left-0 z-40 ${
                        sidebarOpen ? "w-64" : "w-16"
                    } h-screen transition-all duration-200 ease-in-out bg-gray-50 dark:bg-gray-800`}
                    aria-label="Sidebar"
                >
                    <div
                        className={classNames(
                            "flex items-center p-2",
                            sidebarOpen ? "justify-end" : "justify-center"
                        )}
                    >
                        <button
                            onClick={toggleSidebar}
                            data-drawer-toggle="sidebar-multi-level-sidebar"
                            aria-controls="sidebar-multi-level-sidebar"
                            type="button"
                            className={
                                "inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            }
                        >
                            <span className="sr-only">Toggle sidebar</span>
                            {sidebarOpen ? (
                                <ArrowLeftIcon
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Bars3BottomLeftIcon
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <div className="flex flex-col items-center py-2 mb-4 space-y-3">
                            {users.profile_photo ? (
                                <img
                                    className={classNames(
                                        "rounded-full shadow object-cover",
                                        sidebarOpen ? "h-20 w-20" : "h-10 w-10"
                                    )}
                                    src={
                                        import.meta.env.VITE_BACKEND_URL +
                                        users.profile_photo
                                    }
                                    alt="Profile"
                                />
                            ) : (
                                <UserCircleIcon className="h-20 w-20 rounded-full text-white" />
                            )}
                            <div className="text-gray-900 dark:text-white font-small text-center">
                                {users.name}
                            </div>
                        </div>
                        <ul className="space-y-2 px-2 font-medium">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={classNames(
                                        "flex items-center p-2 rounded-lg group",
                                        location.pathname === item.to
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        sidebarOpen ? "" : "justify-center"
                                    )}
                                >
                                    <item.icon
                                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                    />
                                    {sidebarOpen && (
                                        <span className="ml-3">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            ))}
                            <Link
                                to="#"
                                onClick={logout}
                                className={classNames(
                                    "text-gray-300 hover:bg-gray-700 hover:text-white flex items-center p-2 rounded-lg group",
                                    sidebarOpen ? "" : "justify-center"
                                )}
                            >
                                <ArrowRightStartOnRectangleIcon
                                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                />
                                {sidebarOpen && (
                                    <span className="ml-3">Logout</span>
                                )}
                            </Link>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Navigation;
