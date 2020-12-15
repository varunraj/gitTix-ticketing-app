import { Request, Response, NextFunction} from 'express' 
import jwt from 'jsonwebtoken'

interface UserPayload {
    id:string;
    email:string;
}


// add a new attribute- currentUser to Request interface
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req:Request, res:Response, next:NextFunction) => {
    // if session is defined, check if jwt is available
    if (!req.session?.jwt) {
        return next() // user not logged in
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY! ) as UserPayload
        req.currentUser = payload;
    }catch(err) {}  
    
    
    next()
}