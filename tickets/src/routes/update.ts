import express, {Request, Response} from 'express'
import {body} from 'express-validator'

import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@varunrajtickets/common'

import {Ticket} from '../models/tickets'


const router = express.Router();

router.put('/api/tickets/:id', requireAuth,[
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({gt:0})
        .withMessage('Price must be provided and must be > 0')
    ],validateRequest, async(req:Request, res:Response)=>{
    
    //console.log('server', req.params.id)

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket){
        throw new NotFoundError();
    }

    if(ticket.userId !== req.currentUser!.id){
        throw new NotAuthorizedError()
    } 

    res.send(ticket);

})

export {router as updateTicketRouter };