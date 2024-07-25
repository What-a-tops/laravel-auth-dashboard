import { CameraIcon } from "@heroicons/react/24/outline";

/* eslint-disable react/prop-types */
const ImagePreview = ({
    handleDragOver,
    handleDrop,
    selectedImage,
    imagePreview,
    handleFileChange,
}) => {
    return (
        <div className="flex items-center justify-center">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {selectedImage || imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Profile"
                            className="mb-4 rounded-md"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "200px",
                            }}
                        />
                    ) : (
                        <>
                            <CameraIcon className="w-20 h-20 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or JPEG (MAX. 800x400px)
                            </p>
                        </>
                    )}
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default ImagePreview;
