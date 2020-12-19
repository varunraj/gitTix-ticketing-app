import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app}  from '../app';
import request from 'supertest'

// we have to update global variable to include new signin function
// otherwise ts will error out 
declare global {
  namespace NodeJS {
    interface Global {
      signin():Promise <string[]>
    }
  }
}



// mongodb+srv://dbUser:QAZplm537@cluster0.halij.mongodb.net/dev?retryWrites=true&w=majority
// let mongo: any;
beforeAll(  async () => {

  //console.log("inside beforeall")

  process.env.JWT_KEY = 'asdfasdf';

  //mongo = new MongoMemoryServer();

  //const mongoUri = await mongo.getUri();

  // mongo memory server didnt work. Used atlas connection. 
  const mongoUri = "mongodb+srv://dbUser:8r8iD71VZiPkRRI8@cluster0.halij.mongodb.net/dev?retryWrites=true&w=majority"

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


  mongoose.connection
        .once('open', ()=>{ 
            console.log('Good to go');
                      
        })
        .on('error', (error)=> {
            console.warn('Warning', error)
        });


})



beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // await mongo.stop();
  await mongoose.connection.close();
});


// adding a global function -> only available in testing scope 
// this function can be used to signin a user and get cookie to use 
// in follow up request,
global.signin = async()=>{
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email, password
    })
    .expect(201);

    const cookie = response.get('Set-Cookie')
    return cookie

}