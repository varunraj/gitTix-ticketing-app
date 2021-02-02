import {Stan} from 'node-nats-streaming';
import {Subjects} from './subjects'

interface Event {
    subject: Subjects;
    data: any
}



export abstract class Publisher <T extends Event>{

    abstract subject:T['subject'];
    private client: Stan
    
    constructor(client: Stan) {
        this.client = client
    }

    // publish is an async operation. So we need to use the await
    // keyword where it called. In order to accomplish that, we are going 
    // to return a promose from below code.

    publish(data: T['data']) :Promise<void> {
        return new Promise((resolve, reject)=>{

            this.client.publish(this.subject, JSON.stringify(data), (err)=>{
                
                if(err){
                    return reject(err)
                }

                console.log('Event published to subject', this.subject)

                resolve()    
            });

        })

        
    }



}