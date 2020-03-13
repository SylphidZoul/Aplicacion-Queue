var socket = io()


// Logica para obtener el valor del param "escritorio" en la url
var searchParams = new URLSearchParams(window.location.search)

if( !searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escritorio es necesario');
  
}

var escritorio = searchParams.get('escritorio')
let label = $('small')

$('h1').text(`Escritorio: ${escritorio}`)

$('button').on('click', function(){

  socket.emit('atenderTicket', {escritorio}, function(resp){

    if(!resp.numero){
      console.log(resp)
    }
    else{
      label.text(resp.numero)
    }
  })
})