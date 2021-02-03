import mongoose from 'mongoose'
import {app} from './app'
import {natsWrapper} from './nats-wrapper'

const start = async ()=>{
    // below code will make sure that JWT key is available in k8s cluster.
    if (!process.env.JWT_KEY) {
        throw new Error('JWT Key must be defined')
    }

    if (!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined')
    }

    try {
    
        await natsWrapper.connect('ticketing', 'abckk', 'http://nats-srv:4222')

        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
            })
        console.log('connected to tickets-mongo-db')    
    } catch(e) {
            console.error(e)    
    }

    app.listen(3000, ()=> console.log("Listening to 3000 !!!! "));  
}

// we wrapped mongo connection inside a function to use async/await pattern
start();

//app.listen(3000, ()=> console.log("Listening to 3000 !!!! "));