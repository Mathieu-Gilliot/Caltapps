const socket = io("http://localhost:3000");
const sendForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-send')
const globalContainer = document.getElementById('message-container')
const globalUserContainer = document.getElementById('users')

//Connection

let pseudo = prompt("Bonjour mon mignon, c'est quoi ton ptit nom?")
afficherUsers('Vous êtes connecté')
if(pseudo == null || pseudo == ""){
    while(pseudo == null || pseudo == ""){
      pseudo =  prompt('Choisis un pseudo wesh!')
    }
}
socket.emit('new-challenger',pseudo)

socket.on('new-connection', data=>{
    afficherUsers(data)
})

//Déconnection

socket.on('déconnexion', data=>{
    afficherUsers(data)
})

//Envoi des messages
sendForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = messageInput.value
    const messageDate = new Date()
    const horaire = `${messageDate.getHours()}:${messageDate.getMinutes()}:${messageDate.getSeconds()}`
    afficherMessage(`<b>Toi</b>: <span class="message own"> ${message}</span> <span id="heure">envoyé à ${horaire}</span>`)
    socket.emit('message-sent',{message: message, horaire:horaire})

    messageInput.value=''
})

socket.on('message-sent',data=>{
    afficherMessage(`<b>${data.pseudo}</b>: <span class="message other">${data.message}</span> <span id="heure">envoyé à ${data.heure}</span>`)
 })

 socket.on('utilisateurs-connectés',users=>{


 })


 //Fonctions
 function afficherMessage(message){
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    messageContainer.innerHTML = message;
    globalContainer.append(messageContainer);
}

function afficherUsers(user){
    const userContainer = document.createElement('div');
    userContainer.classList.add('user');
    userContainer.innerHTML = user;
    globalUserContainer.append(userContainer)
}