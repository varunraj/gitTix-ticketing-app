import {Request, Response, NextFunction} from 'express'
import {CustomError} from '../errors/custom-error'

export const errorHandler = (err:Error, req: Request, res:Response, next:NextFunction) => {
    
    // WE NEED TO DEFINE A COMMON FORMAT OF ERROR BACK TO CLIENT  FROM ALL MS

    // {
    //     errors:{
    //         messgae:String, field?:String
    //     }[]
    // }

    // Both DatabaseConnectionError and requestValidationError are inherited from abstrat class customError

    if ( err instanceof CustomError) {
        //console.log('handling as req validation error')
       return res.status(err.statusCode).send({errors:err.serializeErrors()})

    }

    
    // if ( err instanceof DatabaseConnectionError) {
    //     //console.log('handling as db connection error')
    //     return res.status(err.statusCode).send({errors: err.serializeErrors()});
    // }

    //console.log('handling all other error')
    console.log(err)
    
    res.status(400).send({
        errors: [{message:"something went wrong", field:"none"}]
    });
    

}