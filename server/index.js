const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const database = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    // Register
    socket.on('register', (data) => {
        const { username, email, password } = data;

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
            id: generateID,
            image_url: photoURL,
            vote_count: 0,
            votedUsers: [],
            _ref: email
        }
        result[0]?.images.unshift(newImage);
        socket.emit("uploadPhotoMessage", "Upload Successful!");
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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});