/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navigation from "../Views/User/Navigation";

const UserLayout = ({ users, logout }) => {
    return (
        <>
            <Navigation users={users} logout={logout} />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default UserLayout;
