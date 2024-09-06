import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Bot from "./pages/Bot";
import Chat from "./pages/Chat";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="bot" element={<Bot />} />
                    <Route path="chat" element={<Chat />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;