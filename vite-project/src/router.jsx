import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Components/DefaultLayout";
import GuestLayout from "./Components/GuestLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./Views/Auth/Login";
import Register from "./Views/Auth/Register";

import AdminHome from "./Views/Admin/Home";
import Menus from "./Views/Admin/Menus";
import Logs from "./Views/Admin/Logs";
import Users from "./Views/Admin/User";
import AddEditUser from "./Views/Admin/User/AddEditUser";
import ViewUser from "./Views/Admin/User/ViewUser";

import UserHome from "./Views/User/Home";
import UserTask from "./Views/User/Tasks";
import UserProfile from "./Views/User/Profile";

import NotFound from "./Views/UnAuthorize/404";
import Unauthorized from "./Views/UnAuthorize/UnAuthorize";
import Forbidden from "./Views/UnAuthorize/Forbidden";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                element: <ProtectedRoute role="admin" />,
                children: [
                    {
                        path: "/admin/home",
                        element: <AdminHome />,
                    },
                    {
                        path: "/admin/menus",
                        element: <Menus />,
                    },
                    {
                        path: "/admin/users",
                        element: <Users />,
                    },
                    {
                        path: "/admin/users/new",
                        element: <AddEditUser />,
                    },
                    {
                        path: "/admin/users/edit/:id",
                        element: <AddEditUser />,
                    },
                    {
                        path: "/admin/users/view",
                        element: <ViewUser />,
                    },
                    {
                        path: "/admin/logs",
                        element: <Logs />,
                    },
                ],
            },
            {
                element: <ProtectedRoute role="user" />,
                children: [
                    {
                        path: "user/home",
                        element: <UserHome />,
                    },
                    {
                        path: "/user/tasks",
                        element: <UserTask />,
                    },
                    {
                        path: "/user/profile",
                        element: <UserProfile />,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "/forbidden",
        element: <Forbidden />,
    },
]);

export default router;
