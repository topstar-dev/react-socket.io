import React, {useEffect, useState} from "react"
import Nav from './Nav';
import PhotoContainer from "./PhotoContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if( !localStorage.getItem("_id") && !localStorage.getItem("_myEmail")){
            navigate('/')
        }
    }, [navigate])
    
    useEffect(() => {
        socket.emit("allPhotos", "search");
        // retrieve all the images from the server
        socket.on("allPhotosMessage", (data) => {
            console.log(data.photos)
            toast.success(data.message);
            setPhotos(data.photos);
        })
    }, [socket])

    return (
        <div>
            <Nav />
            <PhotoContainer photos={photos} socket={socket} />
        </div>
    );
};

export default Home;