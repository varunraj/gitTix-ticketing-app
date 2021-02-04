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

    if (!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID must be defined')
    }

    if (!process.env.NATS_URL){
        throw new Error('NATS_URL must be defined')
    }

    if (!process.env.NATS_CLUSTER_ID){
        throw new Error('MONGO_URI must be defined')
    }


    try {
    
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL)

        // there is some downside to add below close login inside natswrapper class - video 314
        natsWrapper.client.on('close', ()=>{
            console.log('NATS connection closed');
            process.exit();
        })

        process.on('SIGINT', ()=>natsWrapper.client.close());
        process.on('SIGTERM', ()=>natsWrapper.client.close());



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