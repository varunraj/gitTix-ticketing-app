import request from 'supertest'
import {app} from '../../app'
import mongoose from 'mongoose'
//jest.mock('../../nats-wrapper'); // rec 320 // redirect nats import with mock nats-wrapper



it('returs 404 if the ticket is not found', async ()=>{

    // we need an id that looks like mongodb object id
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404)


})

it('returs ticket if the ticket is found', async ()=>{


    // first create a ticket

    const title = 'concert'
    const price = 20;
    
    const response = await request(app)
        .post('/api/tickets/')
        .set('Cookie',global.signin())
        .send({
            title,
            price
        })
        .expect(201)

    // look for the ticket now using id returned

    const ticketResponse = await request(app)
                        .get(`/api/tickets/${response.body.id}`)
                        .send()
                        .expect(200)

     expect(ticketResponse.body.title).toEqual(title)
     expect(ticketResponse.body.price).toEqual(price)   
})