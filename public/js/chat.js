	

var socket=io();

function scrollToBottom () {
	// Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child')
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
  
	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
	  messages.scrollTop(scrollHeight);
	}
  }

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

	var formattedMessage=moment(message.createdAt).format('h:mm a');
	var template=$('#message-template').html();
	// console.log(template);
	var html=Mustache.render(template,{
		text:message.text,
		from:message.from,
		createdAt:formattedMessage
	});

	$('#messages').append(html);
	scrollToBottom();
	// console.log('newMessage',message);
	// var li=$('<li></li>');
	// li.text(`${message.from} ${formattedMessage}:${message.text}`);
	// $('#messages').append(li);
});

socket.on('newLocationMessage',function(message) {
	var formattedMessage=moment(message.createdAt).format('h:mm a');
	var template=$('#location-message-template').html();
	var html=Mustache.render(template,{
		text:message.text,
		from:message.from,
		createdAt:formattedMessage,
		url:message.url
	})
	// var li=$('<li></li>');
	// var a=$('<a target="_blank">My current location</a>');
	// li.text(`${message.from} ${formattedMessage} `);
	// a.attr('href',message.url);
	// li.append(a);
	$('#messages').append(html);
	scrollToBottom();
})

// socket.emit('createMessage',{
// 	from:'your daddaa',
// 	text:'top of the'
// },function (data) {
// 	console.log(data);
// });


jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
  
	var messageTextbox = jQuery('[name=message]');
  
	socket.emit('createMessage', {
	  from: 'User',
	  text: messageTextbox.val()
	}, function () {
	  messageTextbox.val('')
	});
  });


var locationButton=$('#send-location');
locationButton.on('click',function() {
	if(!navigator.geolocation) {
		alert('Geolocation is not supported by your browser');
	}
	locationButton.attr('disabled','disabled').text('sending...');
	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('send location');
		socket.emit('createLocationMessage',{
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		});
	},function() {
		locationButton.removeAttr('disabled').text('send location');
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

