import request from 'supertest';
import  {app}  from '../../app';

it('fails when a email that does not exists', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'checking@test.com',
      password: 'password'
    })
    .expect(400);
});

it('fails when incorrest password is supplied', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'checking123@test.com',
        password: 'password'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'checking123@test.com',
        password: 'incorrect'
      })
      .expect(400);

  });

  
it('response with cookie when signin done with valid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'checking123@test.com',
        password: 'password'
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'checking123@test.com',
        password: 'password'
      })
      .expect(200);

      expect(response.get('Set-Cookie')).toBeDefined();
  });