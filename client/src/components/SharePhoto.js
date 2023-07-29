import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from './Nav'
import PhotoContainer from './PhotoContainer';

const SharePhoto = ({ socket }) => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);

    const { user } = useParams();

    useEffect(() => {
        const id = localStorage.getItem("_id");
        if(!id) {
            navigate("/");
        } else {
            socket.emit("sharePhoto", user);
        }
    }, [navigate, socket, user])

    useEffect(() => {
        socket.on("sharePhotoMessge", (data) => setPhotos(data));
    }, [socket]);

    return (
        <div>
            <Nav />
            <PhotoContainer socket={socket} photos={photos} />
        </div>
    )

}

export default SharePhoto;