import React, { useEffect, useState } from "react";
// React Router Configs
import { Link, useNavigate } from "react-router-dom";;
import PhotoContainer from "./PhotoContainer";
// React-copy-to-clipboard config
import { CopyToClipboard } from "react-copy-to-clipboard";

const MyPhotos = ({ socket }) => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [userLink, setUserLink] = useState("");
    // navigates users to the homepage
    const handleSignOut = () => {
        localStorage.removeItem("_id");
        localStorage.removeItem("_myEmail");
        navigate("/")
    }
    // This function runs immediately the content is copied
    const copyToClipboard = () => alert(`Copied👍`);

    return (
        <div>
            <nav className="navbar">
                <h3>PhotoShare</h3>
                <div className="nav__BtnGroup">
                    <Link to='/photo/upload'>Upload Photo</Link>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            </nav>
            <div className="copyDiv">
                <CopyToClipboard
                    text={userLink}
                    onCopy={copyToClipboard}
                    className='copyContainer'
                >
                    <span className="shareLink">Copy your share link</span>
                </CopyToClipboard>
            </div>
            <PhotoContainer socket={socket} photos={photos} />
        </div>
    )
}

export default MyPhotos;
