import request from 'supertest';
import  {app}  from '../../app';


it('responds with details of the current user', async () => {
//   const authResponse = await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'checking111@test.com',
//       password: 'password'
//     })
//     .expect(201);

    // extract cookie
    const cookie = await global.signin()

    // cookies are not included in follow up req like postman/browser
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)  // set different headers
        .send()
        .expect(200)

    //console.log(response.body)

    expect(response.body.currentUser.email).toEqual('checking111@test.com')
});

it('responds with null if not authenticated', async () => {
        const response = await request(app)
            .get('/api/users/currentuser')
            .send()
            .expect(200)
    
        //console.log(response.body)
    
        expect(response.body.currentUser).toEqual(null);
    });
    