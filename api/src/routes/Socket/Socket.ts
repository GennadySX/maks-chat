io.on('connection', (socket) => {
    const ID     = (socket.id).toString().substr(0, 15);
    const time   = (new Date).toLocaleTimeString()
    
    console.log(`User ${ID} connected`);

    connections.push(socket);

    const SEND = socket.json.send({
        'event': 'connected', 
        'name': ID, 
        'time': time,
    });

    socket.broadcast.json.send({
        'event': 'userJoined', 
        'name': ID, 
        'time': time,
    });
    
    // socket.emit.json.send({
    //     'event': 'privateMsg', 
    //     'name': ID, 
    //     'time': time,
    // });

    socket.on('send message', (msg) => {
        // const time = (new Date).toLocaleTimeString();

        console.log('I received a private message by ', ID, ' saying ', msg);

        io.emit('message', msg);
        
        io.emit('send message', `${time}: ${ID}: ${msg}`);
    })

    socket.on('disconnect', () => {
        io.emit('message', `A user ${ID} has left!`);
    });
    console.log(`Connections: --- ${connections}`);
})
