import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError} from '../errors/request-validation-error'

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            //return res.status(400).send(errors.array())
           throw new RequestValidationError(errors.array())
            
        }
        
        next()

    };

