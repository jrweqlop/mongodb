import {Schema, Document} from "mongoose";
import {noSqlConnection} from "../../connection/connect";

export interface borrowDetailType extends Document {
    Borrow_ID: Schema.Types.ObjectId;
    Book_ID: Schema.Types.ObjectId;
}

const schema = new Schema<borrowDetailType>({
        Borrow_ID: {type: Schema.Types.ObjectId,ref: 'borrow_book', required: true},
        Book_ID: {type: Schema.Types.ObjectId,ref: 'book', required: true}
    }, {
        collection: 'borrow_detail',
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.BorrowDetail_ID = ret._id
                delete ret._id
            }
        }
    }
)
export const BorrowDetail = noSqlConnection.model('borrow_detail', schema);