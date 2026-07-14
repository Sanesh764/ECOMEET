import { Server } from "socket.io"

const connectToSocket=(server)=>{
    const io=new Server(server);
    io.on("connection", (socket) => {
        console.log("User connected");
    });
    return io;
};
export default connectToSocket;