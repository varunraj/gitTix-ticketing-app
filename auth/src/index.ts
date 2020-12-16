import mongoose from 'mongoose'
import app from './app'

const start = async ()=>{
    // below code will make sure that JWT key is available in k8s cluster.
    if (!process.env.JWT_KEY) {
        throw new Error('JWT Key must be defined')
    }

    try {
    
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
            })
        console.log('connected to auth-mongo-db')    
    } catch(e) {
            console.error(e)    
    }

    app.listen(3000, ()=> console.log("Listening to 3000 !!!! "));  
}

// we wrapped mongo connection inside a function to use async/await pattern
start();

//app.listen(3000, ()=> console.log("Listening to 3000 !!!! "));