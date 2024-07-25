import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
// import { ContextProvider } from "./Context/contextProvider.jsx";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

import { initializeAuth } from "./Redux/features/Auth/initialAuth";

initializeAuth(store);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <ContextProvider> */}
            <RouterProvider router={router}></RouterProvider>
            {/* </ContextProvider> */}
        </Provider>
    </React.StrictMode>
);
