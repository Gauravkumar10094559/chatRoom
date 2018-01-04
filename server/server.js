const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
var app=express();
const publicPath=path.join(__dirname,'../public');
var server=http.createServer(app);//app.listen is using the same createServer behind the scene
var io=socketIO(server);//this is our web socket server 
app.use(express.static(publicPath));





io.on('connection',(socket)=> {	//for all connections
	console.log('a new user connected');

	socket.on('disconnect',()=>{
		console.log('client was disconnected');
	});

	// socket.emit('newMessage',{
	// 	from:"gk@gk.com",
	// 	text:"holla there ",
	// 	createdAt:Date.now()
	// });

	socket.on('createMessage',(msg)=> {
		console.log("Message from the user",msg);
		io.emit('newMessage',{ //for all connections
			from:msg.from,
			text:msg.text,
			createdAt:new Date().getTime()
		});
	});
});











//socket is same as in index.html
// io.on('connection',(socket)=>{//on is for differenct events and connections is used to register a new connections
// 	console.log('a new user connected');

// 	socket.on('disconnect',()=> {
// 		console.log('client was disconnected');
// 	});

// 	socket.emit('newEmail',{
// 		from:'gk@gk.com',
// 		text:'hey there',
// 		createAt:123
// 	});

// 	socket.on('createEmail',(newEmail)=>{
// 		console.log('Create Email',newEmail);
// 	});


// });


const port=process.env.PORT||3000;

server.listen(port,()=>{
	console.log(`Server has started on port:${port}`);
});

// console.log(__dirname+'/../public');
// console.log(publicPath); 