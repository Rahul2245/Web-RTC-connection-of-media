import express from "express";
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import { dirname,join } from "node:path";
import { fileURLToPath } from "node:url";
import { Socket } from "node:dgram";


const app=express();
const server =createServer(app);
const io=new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'index.html'));
});




io.on('connection',(socket)=>{
    console.log('a user entered the connection', socket.id);
    socket.on('disconnect', ()=>{
        console.log('user disconnected'); 
    });

    socket.on("join-room", (roomid)=>{
        socket.join(roomid);

        const clients =io.sockets.adapter.rooms.get(roomid);
        if(clients.size===1){
            socket.emit("Initiator");
            console.log("hi")
        }

        if(clients.size===2){
            socket.to(roomid).emit("ready");
        }

    })

    //forward offer
    socket.on("offer",(data)=>{
        console.log("received offer");
        const roomid=data.roomid;
        socket.to(roomid).emit("offer",data);
    })

    //forward answer
    socket.on("answer",(data)=>{
        console.log("received answer");
         const roomid=data.roomid;
        socket.to(roomid).emit("answer",data);

    })

    //forward ice candidates
    socket.on("new-ice-candidate",(data)=>{
        console.log("forwarded candidate");
        const roomid=data.roomid;
        socket.to(roomid).emit("new-ice-candidate",data);
    })


})

server.listen(3000,'0.0.0.0', ()=>{
    console.log("server running on port 3000");
})