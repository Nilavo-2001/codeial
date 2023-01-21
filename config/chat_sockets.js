const { Server } = require("socket.io");
module.exports.chatSockets = function (chatServer) {
    const io = new Server(chatServer, {
        cors: {
            origin: 'http://54.164.119.170:8000',
            allowedHeaders: ["http://54.164.119.170:5000"], // very important to mention
            credentials: true
        }
    });
    // a listener for connection event and also this listener automatically emits a connect event
    io.on("connection", (socket) => {
        // socket object uniquely identifies the user from client side
        console.log("new connection received on server side");
        // a listener for event (join room) from client side
        socket.on("join_room", function (data) {
            console.log(data);
            // as socket object uniquely identifies a user..so it ensures that a particular user joins the asked room
            socket.join(data.chatroom); // creates a room if it is not present
            // emitting a event that can be receieved by all the users in data.chatroom
            io.in(data.chatroom).emit("user_joined", data)
        })
        // a listener for event (message send) from client side
        socket.on("message_send", function (data) {
            console.log("message received", data.message);
            // emitting a event that can be receieved by all the users in data.chatroom
            io.in(data.chatroom).emit("message_received", data);
        })
    });
}