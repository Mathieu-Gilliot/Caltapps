const io = require('socket.io')(3000)

const user = {}

io.on('connection',socket=>{

    socket.on('message-sent',(data)=>{
        socket.broadcast.emit('message-sent',{message: data.message, pseudo :user[socket.id], heure : data.horaire})
    })
    socket.on('new-challenger', pseudo =>{
        user[socket.id] = pseudo
        socket.broadcast.emit('new-connection',`${pseudo} connecté`)
        socket.broadcast.emit('utilisateurs-connectés',user)
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('déconnexion', `${user[socket.id]} déconnecté`)
        delete user[socket.id]

    })
})