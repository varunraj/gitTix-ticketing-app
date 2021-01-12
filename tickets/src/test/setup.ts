//import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app}  from '../app';
import request from 'supertest'
import jwt from 'jsonwebtoken'

// we have to update global variable to include new signin function
// otherwise ts will error out 
declare global {
  namespace NodeJS {
    interface Global {
      signin():string[];
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
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
  await mongoose.connection.close();
});


// adding a global function -> only available in testing scope 
// this function can be used to signin a user and get cookie to use 
// in follow up request,
global.signin = ()=>{
  
  // we are going to create a fake cookie. We dont want to reach out to auth service
  // to get a cookie since that will create dependecy during testing


  // cookie by inspecting browser look as below
  // cookie: express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZtWm1NM1pES
  // mhZMkk0Tm1NNE1EQXhPR0ZoWXpnNFpTSXNJbVZ0WVdsc0lqb2lkbUZ5ZFc1aFpHRnpRSFJsYzNRdVkyOXRJaXdpYVdGMElqb3hOakV3TXp
  // neU5qTTBmUS5jUlBCWXJTT3JuY212WVZmd2RwSE5Yc1BkVV84UU5EdTNIWklKdVR5alE0In0=
 
  // we can take the value part and decode using base64 to get jwt data. We need to reverse engineer this


  // Build a JWT payload {id, email}

  const payload =  {
        id:new mongoose.Types.ObjectId().toHexString(),
        email:'test@test.com'
  }

  
  // Create a JWT!

  const token = jwt.sign(payload, process.env.JWT_KEY!) // ! in the end is for TS to ignore not defined error

  // Build the sesson object {"jwt":"asdassa"}

  const session = {jwt:token};

  // Turn that session to JSON

  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64

  const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string that the cookier with encoded data

  return [`express:sess=${base64}`]

}