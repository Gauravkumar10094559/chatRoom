	

var socket=io();

socket.on('connect',function() {
	console.log("Connected to the server");
	socket.emit('createMessage',{
		from:'aj@aj.com',
		text:'not so hoola'
	});
});

socket.on('disconnect',function() {
	console.log("Disconnected from the server");
});

socket.on('newMessage',function(newMessage) {
	console.log('The new Message is:',newMessage);
});



		//it will run right after the above code
		// var socket=io();//available from the above js code and not from the server and this is making a request to open a web socket for the client and keep the connection open
		// socket.on('connect',function (){
		// 	console.log('Connected to the server');
		
		// 	socket.emit('createEmail',{
		// 		to:'sdjf',
		// 		text:'asdfj'
		// 	});
		// });

		// socket.on('disconnect',function () {
		// 	console.log('disconnected from the server');
		// });

		// socket.on('newEmail',function(email) {
		// 	console.log('newEmail',email);
		// });

