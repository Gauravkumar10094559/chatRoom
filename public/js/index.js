	

var socket=io();

socket.on('connect',function() {
	console.log("Connected to the server");
	// socket.emit('createMessage',{
	// 	from:'aj@aj.com',
	// 	text:'not so hoola'
	// });
});

socket.on('disconnect',function() {
	console.log("Disconnected from the server");
});

socket.on('newMessage',function(newMessage) {
	console.log('The new Message is:',newMessage);
});

socket.on('newMessage',function(message) {
	console.log('newMessage',message);
	var li=$('<li></li>');
	li.text(`${message.from}:${message.text}`);
	$('#messages').append(li);
})

// socket.emit('createMessage',{
// 	from:'your daddaa',
// 	text:'top of the'
// },function (data) {
// 	console.log(data);
// });


$('#message-form').on('submit',(e)=> {
	e.preventDefault();
	socket.emit('createMessage',{
		from:"user",
		text:$('[name=msg]').val()
	},()=>{

	})
})


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

