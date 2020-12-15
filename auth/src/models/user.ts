import mongoose from 'mongoose'
import  {Password} from '../services/password'

// An interface that describes the properties
// required to create a User. This wont come as part of 
// typescript  

interface UserAttrs {
    email: string;
    password: string;
}


// interface that describe properties that usermodel has - build function

interface UserModel extends mongoose.Model<UserDoc> {
    build (attrs:UserAttrs): UserDoc;
}


// interface that describes the properties that 
// User Document has ( User Document will contain additional 
//properties added by mongo like createtime, updatetime etc)

interface UserDoc extends mongoose.Document {
    email: string;
    password:string;

}

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
        }
    }, {
            toJSON:{  // when we send the user back to browser, we need to send only id and email. this objct will
            // override the default JSON.stringify method when data is sent back to browser
                transform(doc, ret){
                    ret.id = ret._id // rename id
                    delete ret._id // remove ._id 
                    delete ret.password // remove password from user document
                    delete ret.__v; // remove version _v

                }
        }
    }
);

// below code is middleaware from mongoose which will be executed any time when user is saved. 
// we will add password hashing logic here.

userSchema.pre('save', async function (done) {
    if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))    
        this.set('password', hashed)
    }

    done();
})


// added a custom function added to user model 
// build function can be called as User.build 
// passing params and typescript will do validation

userSchema.statics.build= (attrs:UserAttrs)=>{
    return new User(attrs);
}


const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

// const user = User.build({
//     email:"test@test.com",
//     password:"assaasdasd"
// })

// always use buildUser to create user.
// const buildUser = (attrs:UserAttrs)=>{
//     return new User(attrs);
//}



export { User } ;