// we seperate the configuration of app in this file and 
// export to use in index.ts file. This mainly done to work
// with express testing using super-test


import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler } from '@varunrajtickets/common'
import { NotFoundError, currentUser } from '@varunrajtickets/common' 
import {createTicketRouter} from './routes/new'
import {showTicketRouter} from './routes/show'
import {indexTicketRouter } from './routes/index'
import {updateTicketRouter} from './routes/update'




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

app.use(currentUser) // extract current user and attach to req.currentUser

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter)
app.use(updateTicketRouter);


// unknown url, send back not found error
// throwing an error inside async function dont work without calling next keyword
// Or to make it work we can install and import express-async-errors 
app.all('*', async (req,res)=>{
    throw new NotFoundError()
})

app.use(errorHandler);

export {app};