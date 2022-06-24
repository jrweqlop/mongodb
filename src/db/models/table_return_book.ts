import {Schema, Document} from "mongoose";
import {noSqlConnection} from "../../connection/connect";

export interface returnBookType extends Document{
    Return_Date: Date;
    BorrowDetail_ID: Schema.Types.ObjectId;
    Member_ID: Schema.Types.ObjectId;
    Librarian_ID: Schema.Types.ObjectId;
}

const schema = new Schema<returnBookType>({
    Return_Date: {type: Date, required: true},
    BorrowDetail_ID: {type: Schema.Types.ObjectId,ref: 'borrow_detail', required: true,unique:true},
    Member_ID: {type: Schema.Types.ObjectId,ref: 'member', required: true},
    Librarian_ID: {type: Schema.Types.ObjectId,ref: 'librarian', required: true}
    }, {
        collection: 'return_book',
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.Return_ID = ret._id
                delete ret._id
            }
        }
    }
)
export const ReturnBook = noSqlConnection.model('return_book', schema);