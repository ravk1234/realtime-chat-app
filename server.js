const io = require('socket.io')(3000)

io.on('connection',socket =>{
    console.log("user")
    socket.emit('chat-message','hello')
})
