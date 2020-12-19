import request from 'supertest';
import  {app}  from '../../app';

it('clears the cookie after sigining out ', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'check123@test.com',
      password: 'password'
    })
    .expect(201);

    const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

    //console.log(response.get('Set-Cookie')[0])
    expect (response.get('Set-Cookie')[0]).toEqual(
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
});
