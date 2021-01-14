import nats, {Message} from 'node-nats-streaming'
import {randomBytes} from 'crypto'


console.clear();

// create a random client id. we need a random id for horizontal scaling
// since nats server can have only one client id per client

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
})

stan.on('connect', ()=>{
    console.log('Listener connected to NATS');

    stan.on('close', ()=>{
        console.log('NATS connection closed');
        process.exit();
    })

    // set various options of subscription
    const options = stan.subscriptionOptions()
                        .setManualAckMode(true) // nats will mark event done
                        // only after getting an ack from client. Default is for 
                        // lister to send ack automatically. But we can send this manually
                        // If we dont set this option, event could be lost due to errors in client
                        // if not heard back after x time, nats server will retry
                        .setDeliverAllAvailable() // when a new subscription is created, send all events in history
                        .setDurableName('ticket-service') // this will keep track on all messages processed and missed. 
                                                            // re-deliver only the ones that are missed.
    // listen to channel
    // queue group is a grouping of all clients during horizonatal scaling
    // one message will be sent to only one member of a queue group.
    const subscription = stan.subscribe(
                'ticket:created', 
                'listenerQueueGroup', 
                 options
            );

    subscription.on('message', (msg:Message)=>{

        const data = msg.getData();

        if (typeof data === 'string'){
            console.log(`Received event # ${msg.getSequence()}, with data:${data}`)
        }

        //ack to nats server that client got event and all good.
        // option is set as manual ack.
        msg.ack()

        })

});

// This is to disconnect from a subscriber if it goes down. 

process.on('SIGINT', ()=>stan.close());
process.on('SIGTERM', ()=>stan.close());