import React, { useEffect } from 'react';
import { MdOutlineArrowUpward } from "react-icons/md";

const PhotoContainer = ({ photos, socket }) => {
    const handleUpvote = (id) => {
        console.log("Upvote", id);
    };

    return (
        <main className='photoContainer'>
            {photos.map((photo) => (
                <div className='photo' key={photo.id}>
                    <div className='imageContainer'>
                        <img 
                            src={photo.img_url}
                            alt={photo.id}
                            className='photo__image'
                        />
                    </div>
                    <button className='upvoteIcon' onClick={handleUpvote(photo.id)}>
                        <MdOutlineArrowUpward 
                            style={{ fontSize: "20px", marginBottom: "5px" }}
                        />
                        <p style={{ fontSize: "12px", color: "#ce7777" }}>
                            {photo.vote_count}
                        </p>
                    </button>
                </div>
            ))}
        </main>
    )

}

export default PhotoContainer;