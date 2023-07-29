import React from "react";
// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Page Components
import Photos from "./components/Photos"
import Login from "./components/Login"
import Register from "./components/Register";
import UploadPhoto from "./components/UploadPhoto";
import MyPhotos from "./components/MyPhotos";
import SharePhoto from "./components/SharePhoto";
// React Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Websockets configuration
import { io } from 'socket.io-client';

function App() {

  const socket = io.connect("http://localhost:4000");

  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="/register" element={<Register socket={socket} />} />
        <Route path="/photos" element={<Photos socket={socket} />} />
        <Route path="/photo/upload" element={<UploadPhoto socket={socket} />} />
        <Route path="/user/photos" element={<MyPhotos socket={socket} />} />
        <Route path="/share/:user" element={<SharePhoto socket={socket} />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
   </>
  );
}

export default App;
