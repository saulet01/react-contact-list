import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import MainPage from "./Main/MainPage";

import { ContactProvider } from "./Context/ContactContext";

function App() {
    return (
        <ContactProvider>
            <MainPage />
        </ContactProvider>
    );
}

export default App;
