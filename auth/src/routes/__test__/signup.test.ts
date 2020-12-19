import request from 'supertest';
import  {app}  from '../../app';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test123@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test123@test',
      password: 'password'
    })
    .expect(400);
});
  
it('returns a 400 with an invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test123@test.com',
      password: 'p'
    })
    .expect(400);
});
  
it('returns a 400 with a missing email and password ', async () => {
  
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test123@test.com',
     })
    .expect(400);
  
    await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password'
    })
    .expect(400);
});
  
it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

    // send same email again

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);

});

// response has a cookie

it('sets a cookie after successful signup', async ()=>{
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();

})