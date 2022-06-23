const socket  = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const roomContainer = document.getElementById('room-container')

if(messageForm !=null){
    const name = prompt('what is your name')
    appendMessage('You joined')
    socket.emit('new-user',roomName,name)
    messageForm.addEventListener('submit',e=> {
        e.preventDefault()
        const message = messageInput.value
        socket.emit('send-chat-message',roomName,message)
        messageInput.value = '' 
    })
}


socket.on('room-created',data=>{
    // <div><%= room %></div> 
    // <a href="/<% room %>">Join</a>
    const roomElement = document.getElementById('div')
    roomElement.innerText = data
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'Join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})

socket.on('chat-message',data =>{
    console.log(data)
    appendMessage(`${data.name}:${data.message}`)
})


socket.on('user-disconnected', data => {
    appendMessage(`${data} disconnected`)
  })

socket.on('user-connected',name =>{
    appendMessage(`${name} connected`)
})



function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)

}