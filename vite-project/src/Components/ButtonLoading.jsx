// eslint-disable-next-line react/prop-types
const ButtonLoading = ({ type = "submit", status, text }) => {
    return (
        <button
            type={type}
            className={`flex items-center justify-center w-full rounded-md bg-gray-${
                status === "loading" ? "600" : "800"
            } px-3 py-1.5 text-sm font-semibold leading-6
                                    ${
                                        status === "loading" &&
                                        "cursor-not-allowed"
                                    }
                                    text-white shadow-sm hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-700`}
            disabled={status === "loading"}
        >
            {status === "loading" ? (
                <>
                    <div
                        className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mr-2"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                    Loading
                </>
            ) : (
                <>{text}</>
            )}
        </button>
    );
};

export default ButtonLoading;
