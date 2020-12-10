import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {errorHandler} from './middlewares/error-handler'
import {NotFoundError} from './errors/not-found-error' 

const app = express();
app.use(json());

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

app.listen(3000, ()=> console.log("Listening to 3000 !!!! "));