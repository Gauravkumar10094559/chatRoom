	

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

// socket.on('newMessage',function(newMessage) {
// 	console.log('The new Message is:',newMessage);
// });

socket.on('newMessage',function(message) {
	console.log('newMessage',message);
	var li=$('<li></li>');
	li.text(`${message.from}:${message.text}`);
	$('#messages').append(li);
});

socket.on('newLocationMessage',function(message) {
	var li=$('<li></li>');
	var a=$('<a target="_blank">My current location</a>');
	li.text(`${message.from}`);
	a.attr('href',message.url);
	li.append(a);
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


var locationButton=$('#send-location');
locationButton.on('click',function() {
	if(!navigator.geolocation) {
		alert('Geolocation is not supported by your browser');
	}
	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit('createLocationMessage',{
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		});
	},function() {
		alert('Unable to fetch location');
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

