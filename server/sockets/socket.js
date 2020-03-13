const { io } = require('../server');
const { ticketControl } = require('../classes/ticket')

const ticket = new ticketControl()

io.on('connection', (client) => {
    // Solucionamos el error de que no funcionaba bien iniciando nodemon con server/server -e js,html, para decirle qe solo reinicie
    // al estar pendientes de js y htmls y no de json que se estaba grabando continuamente y reiniciando la app
    client.on('SiguienteTicket', (data, callback) => {

        let siguiente = ticket.siguienteTicket()
        
        console.log(`Siguiente: ${siguiente}`)

        callback(siguiente)
    })

    // Emite un evento para que los clientes que recien se unan tengan el ultimo ticket
    client.emit('estadoActual', {actual: ticket.getUltimoTicket(), ultimos4: ticket.getUltimos4()})

    client.on('atenderTicket', (data, callback) => {

        if ( !data.escritorio){
            return callback({
                err: true,
                message: 'El escritorio es necesario.'
            })
        }

        let atenderTicket = ticket.atenderTickets(data.escritorio)

        callback(atenderTicket)

        // Con esta linea actualizo todas las ventanas de publico al llamar a alguien.
        client.broadcast.emit('estadoActual', {actual: ticket.getUltimoTicket(), ultimos4: ticket.getUltimos4()})
        

    })

   

});