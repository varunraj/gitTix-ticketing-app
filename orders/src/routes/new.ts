import mongoose from 'mongoose'
import express, {Request, Response} from 'express'
import { requireAuth, validateRequest } from "@varunrajtickets/common";
import {body} from 'express-validator'

const router = express.Router();

router.post('api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .custom((input:string)=> mongoose.Types.ObjectId.isValid(input) ) // check if ticket id is mongo primary key
        .withMessage('TicketId must be provided')
], validateRequest, async (req:Request, res:Response)=>{
    
    
    
    
    res.send({});
})


export { router as newOrderRouter }