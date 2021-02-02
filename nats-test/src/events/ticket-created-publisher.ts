import {Publisher} from './base-publisher'
import {TicketCreatedEvent} from './ticket-created-event'
import {Subjects} from './subjects'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated; // readonly is to make sure subejct is not changed later since it will break rule of parent class
}