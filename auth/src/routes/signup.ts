import express, { Request, Response} from 'express';
import {body, validationResult} from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import {User} from '../models/user'
import {BadRequestError} from '../errors/bad-request-error'
import jwt from 'jsonwebtoken'

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
    ], async (req: Request,res:Response)=>{
        
            
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                //return res.status(400).send(errors.array())
               throw new RequestValidationError(errors.array())
                
            }

            const {email, password} = req.body;

            const existingUser = await User.findOne({email})

            if (existingUser) {
                //console.log("Email in Use")
                throw new BadRequestError('Email in Use')
            }

            const user = User.build({email, password})
            
            await user.save();

            // generate jwt and store on session
            // we will include basic user data in jwt so that other
            // services can decrypt it
            const userJwt = jwt.sign({
                id: user.id,
                email:user.email
            },'asdf' )

            // attach to req.session ( instead of req.session.jwt do below approach )
            // cookie-session middleware will take care of sending cookie to browser- it is 
            // added as an express mw.
            req.session =  {
                jwt: userJwt
            }

            res.status(201).send(user)

            //console.log('Creating a user')
            //throw new Error();
            //throw new DatabaseConnectionError();
            // res.send({});

    })

export { router as signupRouter }