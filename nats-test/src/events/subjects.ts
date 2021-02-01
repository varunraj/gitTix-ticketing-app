// this is an emum file for event names

export enum Subjects {
    TicketCreated = 'ticket:created',
    OrderUpdated = 'order:updated'
}


// See below how enum will work

const printSubject = (subject:Subjects) => {
    console.log(subject) // prints 'ticket:created'
}

printSubject(Subjects.TicketCreated)
