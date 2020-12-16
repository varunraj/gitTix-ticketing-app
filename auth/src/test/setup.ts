import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from '../app';

let mongo:any;
//start mongodb memory db and setup mogoose
beforeAll(async ()=>{
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology : true
    } )
});

// clear mongodb collection after each test

beforeEach(async()=>{
    const collections = await mongoose.connection.db.collections();
    for ( let collection of collections) {
        await collection.deleteMany({})
    }
})


// after all tests close the db connection
afterAll(async()=>{
    await mongo.stop();
    await mongoose.connection.close()
})