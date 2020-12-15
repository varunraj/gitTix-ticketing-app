import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error' 

const app = express();
app.set('trust proxy', true) // trust proxy 
app.use(json());
app.use(
    cookieSession({
        signed: false, // disable enryption since JWT already encrypted
        secure: true // only allow https
    })
)
// app.get('/api/users/currentuser', (req,res)=>{
//     res.send("i am good");
// })

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// unknown url, send back not found error
// throwing an error inside async function dont work without calling next keyword
// Or to make it work we can install and import express-async-errors 
app.all('*', async (req,res)=>{
    throw new NotFoundError()
})

app.use(errorHandler);

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