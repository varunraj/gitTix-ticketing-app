import mongoose from 'mongoose';
import { OrderStatus } from '@varunrajtickets/common' // enum

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt : Date;
    ticket: TicketDoc;

}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt : Date;
    ticket: TicketDoc;

}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs:OrderAttrs): OrderDoc;

}

const orderShema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    status: {
        type:String,
        required: true,
        enum: Object.values(OrderStatus), // one of enum values
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Ticket'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
        }
    }
});

orderShema.statics.build= (attrs: OrderAttrs) => {
    return new Order(attrs)
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderShema);

export { Order };

