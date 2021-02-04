// this is a jest feature to fake a import 
// we need to fake the nats connnection so that import statements 
// in route handler wont given an error

// we mocked the client with a publish function that takes a subject, data and a cb
// because publisher is called in base-published where we use
// client to call publish function which will invoke the cb function
// once connection is made.

export const natsWrapper = { // rec 321
    client: {

        // intial implementation to get create a fake client
        // publish:(subject:string, data:string, callback:()=>void)=>{
        //     callback()
        // }

        // we need to create a jest fake functiont o test nats

        publish: jest.fn().mockImplementation((subject:string, data:string, callback:()=>void)=>{
            // this is the function that will invoke when publish is called
            callback()


        }) // this fake function will be invoked when publish is called
        // by base publisher. 

    }
}