/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    const { token, role: userRole } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role && role !== "admin" && role !== "user") {
        throw new Error("Invalid role provided for ProtectedRoute.");
    }

    if (role === "admin" && userRole !== "admin") {
        return <Navigate to="/unauthorized" replace />;
    }

    if (role === "user" && userRole !== "user") {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
