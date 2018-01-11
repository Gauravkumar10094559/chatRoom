const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
var app=express();
const publicPath=path.join(__dirname,'../public');
var server=http.createServer(app);//app.listen is using the same createServer behind the scene
var io=socketIO(server);//this is our web socket server 
app.use(express.static(publicPath));
var {generateMsg,generateLocationMsg}=require('./utils/message');
var {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var users=new Users();

io.on('connection',(socket)=> {	//for all connections
	console.log('a new user connected');

	socket.on('disconnect',()=>{
		// console.log('client was disconnected');
		var user=users.removeUser(socket.id);
		if(user) {
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMsg('Admin',`${user.name} has left.`))
		}

	});
	// socket.emit('newMessage',{
	// 	from:"admin",
	// 	text:"this is the admin byotch",
	// 	createdAt:new Date().getTime()
	// });
	// socket.emit('newMessage',generateMsg('Admin','WElcome to the chat app'));
	// socket.broadcast.emit('newMessage',generateMsg('Admin','A new user joined'));


	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and Room are required');
		}

		socket.join(params.room);
		//remove the user from any other room
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);~

		io.to(params.room).emit('updateUserList',users.getUserList(params.room));



		//socket.leave('The office fans');

		// io.emit==> io.to('the office fans').emit
		//sockete.broadcast.emit ==> socket.broadcast.to().emit
		//socket.emit===< no need
		socket.emit('newMessage',generateMsg('Admin','WELCOME HERE NEW USER'));
		socket.broadcast.to(params.room).emit('newMessage',generateMsg('Admin',`${params.name} has joined`));
	

		callback();
	})

	socket.on('createMessage',(msg,callback)=> {
		console.log("Message from the user",msg);
		
		io.emit('newMessage',generateMsg(msg.from,msg.text));
		callback('Got it from the server');
		// io.emit('newMessage',{ //for all connections (use io)
		// 	from:msg.from,
		// 	text:msg.text,
		// 	createdAt:new Date().getTime()
		// });

		//broadcasting is when msg is sent to all the users except you like when u join a chat room it shows welcome but to other it will be user asdf joined
		// socket.broadcast.emit('newMessage',{
		// 	from:msg.from,
		// 	text:msg.text,
		// 	createdAt:new Date().getTime()
		// });//difference is who it is sent to (everyone but this socket)
	});

	socket.on('createLocationMessage',(coords)=> {
		io.emit('newLocationMessage',generateLocationMsg('Admin',coords.latitude,coords.longitude));
	})



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