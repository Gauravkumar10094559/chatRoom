//milliseconds since jan 1st 1970 00:00:01 ==> 1000

var moment=require('moment');


//to convert using timestamp 
var timestamp=244323243;
var date=moment(timestamp);

//to get time stamp using moment use moment.valueOf();

// console.log(date.format('MMM'));
//with moment it easy to add and subtract time
//4:29 pm

console.log(date.format('h:mm a'));
