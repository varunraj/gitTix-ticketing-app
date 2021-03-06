// we seperate the configuration of app in this file and 
// export to use in index.ts file. This mainly done to work
// with express testing using super-test


import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from '@varunrajtickets/common'
import { NotFoundError } from '@varunrajtickets/common' 

const app = express();
app.set('trust proxy', true) // trust proxy 
app.use(json());
app.use(
    cookieSession({
        signed: false, // disable enryption since JWT already encrypted
        secure: process.env.NODE_ENV !== 'test' // only allow https in prod. When jest 
                                // runs test , this env variable is is 'test'. So we can get cookies
                                // in http connection by supertest
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

export {app};