import request from 'supertest'
import {app} from '../../app'
import {Ticket } from '../../models/tickets'

it('has a route handler listening to /api/tickets for post requests', async()=>{

    const response = await request(app)
                    .post('/api/tickets')
                    .send({})

    expect(response.status).not.toEqual(404);

});

it('can only be accessed if used is logged in ', async()=>{

    const response = await request(app)
                    .post('/api/tickets')
                    .send({});

    expect(response.status).toEqual(401)

});

it('returns a status other than 401 if user is signed in', async()=>{

    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', global.signin())
                    .send({});

    expect(response.status).not.toEqual(401)

});


it('returns an error is invalid title is provided', async()=>{

    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', global.signin())
                    .send({
                        title:'',
                        price:10    
                    });

    expect(response.status).toEqual(400)

});

it('returns an error is invalid price is provided', async()=>{

    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', global.signin())
                    .send({
                        title:'valid title',
                        price:-10 // negative price    
                    });

    expect(response.status).toEqual(400)

});





it('creates a ticket for valid request', async()=>{


    // find all existing tickets

    let tickets = await Ticket.find({})
    expect (tickets.length).toEqual(0) // no tickets in collection for first time


    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie',global.signin())
                    .send({
                        title:'valid title',
                        price: 10    
                    });

    expect(response.status).toEqual(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(10)

});