const io = require('socket.io')(3000)

const users = {}
io.on('connection',socket =>{
   
    socket.on('new-user', data=>{
        users[socket.id] = data
        socket.broadcast.emit('user-connected',data)
    })
    socket.on('send-chat-message',message =>{
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]})
        console.log(message)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
      })
})
