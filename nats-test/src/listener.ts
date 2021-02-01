import nats from 'node-nats-streaming'
import {randomBytes} from 'crypto'
import {TicketCreatedListener} from './events/ticket-created-listener' 
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

    //-- BELOW LOGIC MOVED TO CLASS --//

    // set various options of subscription
    // const options = stan.subscriptionOptions()
    //                     .setManualAckMode(true) // nats will mark event done
    //                     // only after getting an ack from client. Default is for 
    //                     // lister to send ack automatically. But we can send this manually
    //                     // If we dont set this option, event could be lost due to errors in client
    //                     // if not heard back after x time, nats server will retry
    //                     .setDeliverAllAvailable() // when a new subscription is created, send all events in history
    //                     .setDurableName('ticket-service') // this will keep track on all messages processed and missed. 
    //                                                         // re-deliver only the ones that are missed.
    // listen to channel
    // queue group is a grouping of all clients during horizonatal scaling
    // one message will be sent to only one member of a queue group.
    // const subscription = stan.subscribe(
    //             'ticket:created', 
    //             'listenerQueueGroup', 
    //              options
    //         );

    // subscription.on('message', (msg:Message)=>{

    //     const data = msg.getData();

    //     if (typeof data === 'string'){
    //         console.log(`Received event # ${msg.getSequence()}, with data:${data}`)
    //     }

    //     //ack to nats server that client got event and all good.
    //     // option is set as manual ack.
    //     msg.ack()

    //     })

    new TicketCreatedListener(stan).listen();

});

// This is to disconnect from a subscriber if it goes down. 

process.on('SIGINT', ()=>stan.close());
process.on('SIGTERM', ()=>stan.close());



//-- BELOW CODE MOVED TO SEPERATE FILE events/base-event-listener

// abstract class  Listener {

//     abstract subject: string;
//     abstract queueGroupName : string;
//     abstract onMessage(data:any, msg:Message):void

//     private client: Stan;

//     protected ackWait = 5 * 1000 // 5 seconds

//     constructor(client: Stan){
//         this.client = client
//     }

//     subscriptionOptions() {
//         return this.client
//             .subscriptionOptions()
//             .setDeliverAllAvailable()
//             .setManualAckMode(true)
//             .setAckWait(this.ackWait)
//             .setDurableName(this.queueGroupName);
//     }

//     listen() {
//         const subscription = this.client.subscribe(
//             this.subject,
//             this.queueGroupName,    
//             this.subscriptionOptions()
//         )

//         subscription.on('message', (msg: Message)=>{
//             console.log(
//                 `Message Received: ${this.subject} / ${this.queueGroupName} `
//             );

//             const parsedData = this.parseMessage(msg)
//             this.onMessage(parsedData, msg); 
        
//         });
//     }


//     parseMessage(msg: Message) {
//         const data = msg.getData();
//         return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
//     }

// }


//-- BELOW CODE MOVED TO events/ticket-created-listner

// class TicketCreatedListener extends Listener {
//     subject = 'ticket:created';
//     queueGroupName = 'payments-service';
    
//     onMessage(data:any, msg: Message) {
//         console.log('Event Data', data)
    
//         // if everything goes good with event logic
    
//         msg.ack();
    
//     }

// }