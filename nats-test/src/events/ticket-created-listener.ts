import {Message} from 'node-nats-streaming'
import {Listener} from './base-listener'

export class TicketCreatedListener extends Listener {
    subject = 'ticket:created';
    queueGroupName = 'payments-service';
    
    onMessage(data:any, msg: Message) {
        console.log('Event Data', data)
    
        // if everything goes good with event logic
    
        msg.ack();
    
    }

}