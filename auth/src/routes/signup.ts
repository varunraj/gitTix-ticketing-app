import express, { Request, Response} from 'express';
import {body, validationResult} from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

const router = express.Router();

// we will use body from express validator as a middle ware.

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be provided'),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Password must be between 4 and 20 chars')
    ], (req: Request,res:Response)=>{
        
            
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                //return res.status(400).send(errors.array())
               throw new RequestValidationError(errors.array())
                
            }

            
            console.log('Creating a user')
            //throw new Error();
            //throw new DatabaseConnectionError();
             res.send({});

    })

export { router as signupRouter }