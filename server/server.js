const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
var app=express();
const publicPath=path.join(__dirname,'../public');
var server=http.createServer(app);//app.listen is using the same createServer behind the scene
var io=socketIO(server);//this is our web socket server 
app.use(express.static(publicPath));
//server is same as in index.html
io.on('connection',(socket)=>{//on is for differenct events and connections is used to register a new connections
	console.log('a new user connected');

	socket.on('disconnect',()=> {
		console.log('client was disconnected');
	});

});


const port=process.env.PORT||3000;

server.listen(port,()=>{
	console.log(`Server has started on port:${port}`);
});

// console.log(__dirname+'/../public');
// console.log(publicPath); 