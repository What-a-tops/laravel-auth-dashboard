/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Button({
    className = "",
    disabled = false,
    children,
    color,
    to,
    ...props
}) {
    const baseClasses = `${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
    } flex items-center justify-center px-4 py-2 h-12 mt-1 shadow text-${color}-700 border border-${color}-700 hover:text-white hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-${color}-500 dark:text-${color}-500 dark:hover:text-white dark:hover:bg-${color}-600 dark:focus:ring-${color}-900 transition-colors duration-200 group`;

    if (disabled) {
        return (
            <button
                className={`${baseClasses} opacity-25 ${className}`}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }

    return (
        <Link to={to} className={`${baseClasses} ${className}`} {...props}>
            {children}
        </Link>
    );
}
