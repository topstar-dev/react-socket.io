const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    // Register
    socket.on('register', (data) => {
        const { username, email, password } = data;
        console.log(`register email: ${email}`)

        let result = database.filter(
            (user) => user.email === email || user.username === username
        )

        if (result.length === 0) {
            database.push({
                id: generateID(),
                username,
                password,
                email,
                image: []
            })
            return socket.emit("registerSuccess", "Account created successfully!");
        }
        socket.emit("registerError", "User already exists");
    })
    // Login
    socket.on("login", (data) => {
        const { username, password } = data;
        console.log(database);
        let result = database.filter(
            (user) => user.username === username && user.password === password
        );
        if(result.length !== 1) {
            return socket.emit("loginError", "Incorrect credentials");
        }
        socket.emit("loginSuccess", {
            message: "Login successfully",
            data: {
                _id: result[0].id,
                _email: result[0].email
            }
        })
    })
    // UploadPhoto
    socket.on("uploadPhoto", (data) => {
        const { id, email, photoURL } = data;
        let result = database.filter((user) => user.id === id)

        const newImage = {
            id: generateID(),
            image_url: photoURL,
            vote_count: 0,
            votedUsers: [],
            _ref: email
        }
        console.log(result);
        result[0]?.image.unshift(newImage);
        socket.emit("uploadPhotoMessage", "Upload Successful!");
    })
    // All Photos
    socket.on("allPhotos", (data) => {
        let images = [];
        for (let i =0; i < database.length; i++) {
            images = images.concat(database[i]?.image);
        }
        socket.emit("allPhotosMessage", {
            message: "Photos retrieved successfully",
            photos: images
        })
    })
    // Get My Photos
    socket.on("getMyPhotos", (id) => {
        let result = database.filter((db) => db.id === id);
        socket.emit("getMyPhotosMessage", {
            data: result[0]?.images,
            username: result[0]?.username
        })
    })
    // Share Photo
    socket.on("sharePhoto", (name) => {
        let result = database.filter((db) => db.username === username)
        socket.emit("sharePhotoMessage", result[0]?.images);
    })
    // Upvote Action
    socket.on("photoUpvote", (data) => {
        const { userID, photoID } = data;
        let images = [];
        
        for(let i = 0; i < database.length; i++) {
            if(!(database[i].id === userID)) {
                images = images.concat(database[i]?.images);
            }
        }
        // Filter the images array for the image selected for upvote
        const item = images.filter((image) => image.id === photoID);

        if(item.length < 1) {
            return socket.emit("upvoteError", {
                error_message: "You cannot upvote your photos"
            })
        }
        const voters = item[0]?.votedUsers;
        const authenticateUpvote = voters.filter((voter) => voter === userID);

        if(!authenticateUpvote.length) {
            item[0].vote_count += 1;
            voters.push(userID);

            socket.emit("allPhotosMessage", {
                message: "Photos retrived successfully",
                photos: images,
            })

            return socket.emit("upvoteSuccess", {
                message: "Upvote successful",
                item,
            })
        }
        /* nullifies duplicate votes. */
        socket.emit("upvoteError", {
            error_message: "Duplicate votes are not allowed"
        })

    })
    // Disconnect
    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('🔥: A user disconnected');
    })

})

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world"
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
}); 