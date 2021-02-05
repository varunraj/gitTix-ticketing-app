// we wnat to have nats client working just like mongoose with one
// object that can be used from any file for connection.


import nats, {Stan} from 'node-nats-streaming'

class NatsWrapper {
    
    private _client?: Stan

    // getter for _client
    get client(){
        if(!this._client) {
            throw new Error ('Cannot access NATS client before connecting')
        }

        return this._client
    }


    connect(clusterId:string, clientId:string, url:string ){
        this._client = nats.connect(clusterId, clientId, {url})
        


        return new Promise<void>((resolve, reject)=>{
            this.client.on('connect', ()=>{
                console.log('Connected to NATS')
                resolve();
            });

            this.client.on('error', (err)=>{
                reject(err);
            })

        })


    }
}

export const natsWrapper = new NatsWrapper();