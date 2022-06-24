import {Schema, Document} from "mongoose";
import {noSqlConnection} from "../../connection/connect";

export interface borrowBookType extends Document {
    Member_ID: Schema.Types.ObjectId;
    Librarian_ID: Schema.Types.ObjectId;
    Borrow_Date: Date;
}

const schema = new Schema<borrowBookType>({
        Member_ID: {type: Schema.Types.ObjectId, ref: 'member', required: true},
        Librarian_ID: {type: Schema.Types.ObjectId, ref: 'librarian', required: true},
        Borrow_Date: {type: Date, required: true}
    }, {
        collection: 'borrow_book',
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.Borrow_ID = ret._id
                delete ret._id
            }
        }
    }
)
export const BorrowBook = noSqlConnection.model('borrow_book', schema);