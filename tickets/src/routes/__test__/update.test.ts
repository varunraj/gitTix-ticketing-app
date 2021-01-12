import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose'


it('returns a 404 if the provided id does not exists', async()=>{

    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie',global.signin())
        .send({
            title:'ticket1sfsdfsdf',
            price: 20
        })
        .expect(404)

})

it('returns a 401 if user is not authenticated', async()=>{

    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title:'ticket1sfdsfsdfass',
            price: 20
        })
        .expect(401)



})

it('returns a 401 if the user does not own the ticket', async ()=>{
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title:'dfdsfdkkk',
            price:20
        });

    //console.log('test', response.body.id )

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin()) // new user now
        .send({
            title:'dfdsfdooo',
            price:80
        })
        .expect(401);


})

it('returns a 400 if the user provides an invalid title or price', async()=>{
    
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title:'dfdsfd555kkk111',
            price:20
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie) // new user now
        .send({
            title:'',
            price:20
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie) // new user now
        .send({
            title:'fsdsadfadsgfertr',
            price: -20
        })
        .expect(400);

})

it('updates the ticket for valid request', ()=>{
    
})