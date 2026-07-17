import { Server } from "socket.io"

let connactions={};
let messages={};
let timeOnline={};
const connectToSocket=(server)=>{
    const io=new Server(server);

    io.on("connection", (socket) => {

        socket.on("join-call",(path)=>{
            if(connactions[path]==undefined){
                connactions[path]=[];
            }
            connactions[path].push(socket.id);

            timeOnline[socket.id]=new Date();

            // connactions[path].forEach(elem=>{
            //     io.to(elem)
            // })

            for(let a=0;a<connactions[path].lenght;i++){
                io.to(connactions[path][a]).emit("user-joined",socket.id,connactions[path]);
            }
            if(messages[path]!=undefined){
                for(let a=0;a<messages[path].lenght;a++){
                    io.to(socket.id).emit("chat-message",messages[path][a]['socket-id-sender'])
                }
            }
        });
        
        socket.on("signal",(toId,messages)=>{
            io.to(toId).emit("signal",socket.id,messages);
        });

        socket.on("chat-message",(data,sender)=>{

            const [matchingRoom,found]=Object.entries(connactions)
            .reduce(([room,isFound],[roomKey,roomValue])=>{
                if(!isFound && roomValue.includes(socket.id)){
                    return [roomKey,true]
                }
            },['',false]);
            if(found===true){
                if(messages[matchingRoom]===undefined){
                    messages[matchingRoom]={}
                }
                messages[matchingRoom].push({'sender':sender,'data':data,"socket-id-sender":socket.id})
                console.log("message",key , ":",sender,data);

                connactions[matchingRoom].forEach((ele)=>{
                    io.to(ele).emit("chat-message",data,sender,socket.id)
                })
                
            }
        });

        socket.on("disconnect",()=>{
            var diffTime=Math.abs(timeOnline[socket.id]-new Date())

            var key;
            for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connactions)))){
                for(let a=0;a<v.lenght;a++){
                    if(v[a]===socket.id){
                        key=k;

                        for(let a=0;a<connactions[key].lenght;a++){
                            io.to(connactions[key][a].emit("user-left",socket.id))
                        }
                        var index=connactions[key].indexOf(socket.id)
                        connactions[key].splice(index,1);
                        if(connactions[key].lenght===0){
                            delete connactions[key]
                        }
                    }
                }
            }
        });
    });
    return io;
};
export default connectToSocket;