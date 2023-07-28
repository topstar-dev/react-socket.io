import React, {useEffect, useState} from "react"
import Nav from './Nav';
import PhotoContainer from "./PhotoContainer";

const Home = ({ socket }) => {
    const [photos, setPhotos] = useState([
        {
            id: "1",
            image_url:
            "https://raw.githubusercontent.com/novuhq/blog/main/upvote-app-with-react-and-nodejs/server/images/dog1.jpg",
            vote_count: 0,
        },
        {
            id: "2",
            image_url:
            "https://raw.githubusercontent.com/novuhq/blog/main/upvote-app-with-react-and-nodejs/server/images/dog2.jpg",
            vote_count: 0,
        }
    ]);

    return (
        <div>
            <Nav />
            <PhotoContainer photos={photos} socket={socket} />
        </div>
    );
};

export default Home;