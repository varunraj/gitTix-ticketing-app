import {Publisher, Subjects, TicketCreatedEvent} from '@varunrajtickets/common'

export class  TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
        subject:Subjects.TicketCreated = Subjects.TicketCreated;
}