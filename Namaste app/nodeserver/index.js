const io = require('socket.io')(8000, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST','PUT','DELETE'],
    }
});

const users = {};

io.on('connection', socket => {
    console.log("Server is running at http://localhost:8000");

    
    socket.on('newuser-joined', username => {
        
        users[socket.id] = username;
        socket.emit('user-joined',username);
        socket.broadcast.emit('user-joined', username);
        
    });

    
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

   
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    });
});
