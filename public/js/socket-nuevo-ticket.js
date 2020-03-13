// Comando para establecer la comunicacion

var socket = io()
var label = $('#lblNuevoTicket')

socket.on('connect', () => {
  console.log('Conectado al server')
})

socket.on('disconnect', () => {
  console.log('Desconectado del server, intentando reconectar...')
})

socket.on('estadoActual', (data) => {
  label.text(data.actual)
})

$('button').on('click', function(){
  
  socket.emit('SiguienteTicket', null, (siguienteTicket) => {

    label.text(siguienteTicket)
  })
})