import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
   console.log("someone has connected!")

   socket.on("disconnect",()=>{
    console.log("someone has left ")
   })
})

io.listen(5000)