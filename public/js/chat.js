const socketChat = io()
const email = document.querySelector('#email')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const alias = document.querySelector('#alias')
const age = document.querySelector('#age')
const avatar = document.querySelector('#avatar')
const containerMessages = document.querySelector('#messages')
const messageText = document.querySelector('#message')
const btnMessage = document.querySelector('#btn-message')
const divMessages = document.querySelector('#messages')

// Object Message
const Message = {}

// Render index on connection
socket.on('index', async () => {
   await renderChat()
})

// Post new Message
btnMessage.addEventListener('click',async (e) => {
    e.preventDefault()
    if(!messageText.value){
        return
    }
    if(!email.value){
        return alert('El campo email no puede estar vacio')
    }
    
    Message.firstName = firstName.value
    Message.lastName = lastName.value
    Message.email = email.value
    Message.alias = alias.value
    Message.age = age.value
    Message.message = messageText.value
    Message.user_id = socket.id
    Message.avatar = avatar.value
    await fetch(`${form.baseURI}api/mensajes`, {
        method: 'POST',
        body: JSON.stringify(Message),
        headers:{
            'Content-Type': 'application/json'
          }
    })

    socket.emit('message', null)
    messageText.value = null
})

// refresh Messages view after post
socket.on('new-messages', async ()=>{
        await renderChat()
})


// Show Messages on view
async function renderChat(){
    await fetch(`${form.baseURI}api/mensajes`)
    .then((res) => {
        console.log(res)
        return res.json()
    })
    .then((messages) => {
        divMessages.innerHTML= ""
        messages.forEach(msg => {
            //create elements
            const divUser = document.createElement('div')
            const divData = document.createElement('div')
            const divMessage = document.createElement('div')
            const messageText = document.createElement('p')
            const spanName = document.createElement('span')
            const spanDate = document.createElement('span')

            //assign class & value
            messageText.className = 'message-text'
            messageText.innerHTML = msg.message
            divData.className = 'message-data'
            spanName.className = 'user'
            spanDate.className = 'date-time'
            spanDate.innerHTML = ` [${new Date(msg.createdDate).toLocaleString()}]: `
            divMessage.className = 'message-body'
            
            // assign user Local or Remote
            if(msg.name == userName.value && msg.user_id === socket.id ){
                divUser.className = 'local' 
                spanName.innerHTML = 'Yo'
                divData.appendChild(spanDate)
                divData.appendChild(spanName)
                divMessage.appendChild(messageText)
                divUser.appendChild(divData)
                divUser.appendChild(divMessage)
            }else{
                divUser.className = 'remote' 
                spanName.innerHTML = msg.name
                divData.appendChild(spanName)
                divData.appendChild(spanDate)
                divMessage.appendChild(messageText)
                divUser.appendChild(divData)
                divUser.appendChild(divMessage)
            }
            
            divMessages.appendChild(divUser)
            divMessages.scrollTop = divMessages.scrollHeight
        })
    })

}