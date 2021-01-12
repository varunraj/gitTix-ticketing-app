import express from 'express';
import {currentUser} from '@varunrajtickets/common'

const router = express.Router();

router.get('/api/users/currentuser', 
            currentUser, 
            (req,res)=>{    
                // if no jwt , send back user as null
                res.send({currentUser: req.currentUser || null})

        })

export { router as currentUserRouter }