import { Server } from "socket.io"

let connactions={};
let messages={};
let timeOnline={};
const connectToSocket=(server)=>{
    const io=new Server(server);
    io.on("connection", (socket) => {
        socket.on("join-call",(path)=>{

        });
        
        socket.on("signal",(toId,messages)=>{
            io.to(toId).emit("signal",socket.id,messages);
        });

        socket.on("chat-message",(data,sender)=>{

        });

        socket.on("disconnect",()=>{

        });
    });
    return io;
};
export default connectToSocket;