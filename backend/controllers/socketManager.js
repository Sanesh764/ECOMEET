import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("User Connected:", socket.id);

        // Join Room
        socket.on("join-call", (path) => {
            if (!connections[path]) {
                connections[path] = [];
            }

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            // Notify everyone in room
            for (let i = 0; i < connections[path].length; i++) {
                io.to(connections[path][i]).emit(
                    "user-joined",
                    socket.id,
                    connections[path]
                );
            }

            // Send previous messages
            if (messages[path]) {
                messages[path].forEach((msg) => {
                    io.to(socket.id).emit(
                        "chat-message",
                        msg.data,
                        msg.sender,
                        msg.socketIdSender
                    );
                });
            }
        });

        // WebRTC Signaling
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        // Chat Message
        socket.on("chat-message", (data, sender) => {
            const [room, found] = Object.entries(connections).reduce(
                ([roomName, isFound], [key, users]) => {
                    if (!isFound && users.includes(socket.id)) {
                        return [key, true];
                    }
                    return [roomName, isFound];
                },
                ["", false]
            );

            if (found) {
                if (!messages[room]) {
                    messages[room] = [];
                }

                messages[room].push({
                    sender,
                    data,
                    socketIdSender: socket.id,
                });

                console.log(`Message in ${room}: ${sender} -> ${data}`);

                connections[room].forEach((userId) => {
                    io.to(userId).emit(
                        "chat-message",
                        data,
                        sender,
                        socket.id
                    );
                });
            }
        });

        // Disconnect
        socket.on("disconnect", () => {
            const onlineTime =
                Date.now() - timeOnline[socket.id]?.getTime();

            console.log(
                `${socket.id} disconnected after ${Math.floor(
                    onlineTime / 1000
                )} seconds`
            );

            for (const [room, users] of Object.entries(connections)) {
                const index = users.indexOf(socket.id);

                if (index !== -1) {
                    // Notify remaining users
                    users.forEach((userId) => {
                        io.to(userId).emit("user-left", socket.id);
                    });

                    // Remove socket
                    users.splice(index, 1);

                    // Delete room if empty
                    if (users.length === 0) {
                        delete connections[room];
                        delete messages[room];
                    }

                    break;
                }
            }

            delete timeOnline[socket.id];
        });
    });

    return io;
};

export default connectToSocket;