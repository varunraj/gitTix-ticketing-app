// check diagram 'Custom Error Abstract Class Implementation

export abstract class CustomError extends Error {
    abstract statusCode:number
    
    constructor(message:string){
        super(message) // message when an error is created to Error class which will be used for logging.
        Object.setPrototypeOf(this,CustomError.prototype)
    }

    abstract serializeErrors(): { message:string; field?:string }[];
}