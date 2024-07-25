/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import Modal from "./Modal";
import { clearSession } from "../Redux/features/Auth/authSlice";

function DefaultLayout() {
    const { token, user, role, expireToken } = useSelector(
        (state) => state.auth
    );
    let logoutTimeout;
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [button, setButton] = useState(false);

    useEffect(() => {
        const checkSession = () => {
            if (token && expireToken) {
                const now = new Date().getTime();
                if (now >= expireToken) {
                    setOpenModal(true);
                    setTitle("Oops!");
                    setMessage("Looks like session expired.");
                    setButton(false);

                    logoutTimeout = setTimeout(() => {
                        clearUserSession();
                    }, 300000);
                }
            }
        };

        checkSession();

        return () => clearTimeout(logoutTimeout);
    }, [token, expireToken]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else if (token && role && location.pathname === "/") {
            if (role && location.pathname === "/") {
                navigate(`/${role}/home`);
            } else {
                const lastVisitedRoute =
                    localStorage.getItem("lastVisitedRoute");
                if (
                    lastVisitedRoute &&
                    lastVisitedRoute !== location.pathname
                ) {
                    navigate(lastVisitedRoute);
                }
            }
        }
    }, [token, role, navigate]);

    useEffect(() => {
        if (token && location.pathname !== "/login") {
            localStorage.setItem("lastVisitedRoute", location.pathname);
        }
    }, [token]);

    const handleLogout = (e) => {
        e.preventDefault();
        setOpenModal(true);
        setTitle("Are you sure you want logout?");
        setMessage("This action cannot be undone.");
        setButton(true);
    };

    const clearUserSession = () => {
        localStorage.clear();
        setOpenModal(false);
        dispatch(clearSession());
        navigate("/login");
    };

    const handleCloseModal = () => setOpenModal(false);

    const onConfirm = () => {
        clearUserSession();
    };

    if (!token) return null;

    return (
        <>
            {role ? (
                role === "admin" ? (
                    <AdminLayout users={user} logout={handleLogout} />
                ) : (
                    <UserLayout users={user} logout={handleLogout} />
                )
            ) : (
                <div>Loading...</div>
            )}

            {openModal && (
                <Modal
                    open={openModal}
                    onConfirm={onConfirm}
                    onClose={handleCloseModal}
                    showCloseButton={button}
                    title={title}
                    message={message}
                />
            )}
        </>
    );
}

export default DefaultLayout;
