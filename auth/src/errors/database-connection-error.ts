import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    
    reason = 'Error connecting to database'
    statusCode = 500;    
    constructor(){
        super('Error Connecting to DB') // this will be available in logs

        // only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }


    serializeErrors(){
        return [
            { message: this.reason, 
              field: "none"  
            }
        ]
    }
}
