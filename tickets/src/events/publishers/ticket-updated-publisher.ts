import {Publisher, Subjects, TicketUpdatedEvent} from '@varunrajtickets/common'

export class  TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
        subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
}