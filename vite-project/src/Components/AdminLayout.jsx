import { Outlet } from "react-router-dom";
import Navigation from "../Views/Admin/Navigation";

// eslint-disable-next-line react/prop-types
const AdminLayout = ({ users, logout }) => {
    return (
        <>
            <Navigation users={users} logout={logout} />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AdminLayout;
