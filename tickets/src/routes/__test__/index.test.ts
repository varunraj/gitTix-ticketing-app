import request from 'supertest'
import {app} from '../../app'
//jest.mock('../../nats-wrapper'); // rec 320 // redirect nats import with mock nats-wrapper


const createTicket= ()=>{
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title:'ticket1',
            price:20
        });

}



it('can fetch a list of tickets', async ()=>{
    const r1 = await createTicket()
    const r2 = await createTicket()
    const r3 = await createTicket()
    
    // console.log(r1.body)
    // console.log(r2.body)
    // console.log(r3.body)

    const response = await request(app)
                    .get('/api/tickets')
                    .send()
                    

    //console.log(response.body);

    expect(response.body.length).toEqual(3)

})