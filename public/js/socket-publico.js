var socket = io()

let ticket1 = $('#lblTicket1')
let escritorio1 = $('#lblEscritorio1')
let ticket2 = $('#lblTicket2')
let escritorio2 = $('#lblEscritorio2')
let ticket3 = $('#lblTicket3')
let escritorio3 = $('#lblEscritorio3')
let ticket4 = $('#lblTicket4')
let escritorio4 = $('#lblEscritorio4')

var Tickets = [ticket1, ticket2, ticket3, ticket4]
var Escritorios = [escritorio1, escritorio2, escritorio3, escritorio4]

socket.on('estadoActual', (data) => {
  
  let ultimos4 = data.ultimos4
  var audio = new Audio('./audio/new-ticket.mp3')

  if(ultimos4.length === 4){

    for(let i=0; i<4; i++){
      Tickets[i].text(`Ticket ${ultimos4[i].numero}`)
      Escritorios[i].text(`Escritorio: ${ultimos4[i].escritorio}`)
    }

    audio.play()
  }
  else {
    switch(ultimos4.length){
      case 1:
        ticket1.text(`Ticket ${ultimos4[0].numero}`)
        escritorio1.text(`Escritorio ${ultimos4[0].escritorio}`)
        audio.play()
        break;
      case 2:
        for(let i = 0; i<2; i++){
          Tickets[i].text(`Ticket ${ultimos4[i].numero}`)
          Escritorios[i].text(`Escritorio: ${ultimos4[i].escritorio}`)
          audio.play()
        }
        break;
      case 3:
        for(let i = 0; i<3; i++){
          Tickets[i].text(`Ticket ${ultimos4[i].numero}`)
          Escritorios[i].text(`Escritorio: ${ultimos4[i].escritorio}`)
          audio.play()
        }
        break;
    }
  }

})