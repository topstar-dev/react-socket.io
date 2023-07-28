import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPhoto = ({ socket }) => {
    const navigate = useNavigate();
    const [photoURL, setPhotoURL] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(photoURL)
    };

    return (
        <main className='uploadContainer'>
            <div className='uploadText'>
                <h2>Upload Image</h2>
                <form method='POST' onSubmit={handleSubmit}>
                    <label>Paste the image URL</label>
                    <input 
                        type='text'
                        name='fileImage'
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />
                    <button className='uploadBtn'>UPLOAD</button>
                </form>
            </div>
        </main>
    )
}

export default UploadPhoto;