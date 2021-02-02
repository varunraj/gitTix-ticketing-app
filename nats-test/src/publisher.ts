import nats from 'node-nats-streaming'
import {TicketCreatedPublisher} from './events/ticket-created-publisher'


console.clear()

//'abc' below is the client id 

const stan = nats.connect('ticketing', 'abc', {
    url:'http://localhost:4222'
});

stan.on('connect', async ()=>{
    console.log('publisher connected to NATS')
   

    // const data = JSON.stringify({
    //     id:'123',
    //     title:'concert',
    //     price:20
    // });


    // // for the publish function, first arg is channel name, second is data
    // // third optional is a cb function

    // stan.publish('ticket:created',data, ()=>{
    //     console.log('event published')
    // })

    const publisher = new TicketCreatedPublisher(stan)
  
    try{
        await publisher.publish({
            id:'123',
            title:'concert',
            price:20
        })
    } catch (err){
        console.error(err);
    }



})

