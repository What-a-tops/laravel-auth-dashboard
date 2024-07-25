import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function GuestLayout() {
    const { token, role } = useSelector((state) => state.auth);

    if (token && role) {
        return <Navigate to={role ? `/${role}/home` : "/"} replace />;
    }
    return (
        <>
            <Outlet />
        </>
    );
}

export default GuestLayout;
