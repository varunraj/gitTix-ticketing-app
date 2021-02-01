import {Message} from 'node-nats-streaming';
import {Listener} from './base-listener';
import {TicketCreatedEvent} from './ticket-created-event'
import {Subjects } from './subjects'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    
    readonly subject = Subjects.TicketCreated; // slide 299 for readonly explanation. This is similar to final kw in java
    queueGroupName = 'payments-service';
    
    onMessage(data:TicketCreatedEvent['data'], msg: Message) {
        console.log('Event Data', data)
    
        // if everything goes good with event logic
        
        
        msg.ack();
    
    }

}