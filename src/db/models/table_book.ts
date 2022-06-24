import {Schema, Document} from "mongoose";
import {noSqlConnection} from "../../connection/connect";

export interface bookType extends Document {
    Book_Name: string
    Book_Category: string
    Book_Publishing: string
}

const schema = new Schema<bookType>({
        Book_Name: {type: String, required: true},
        Book_Category: {type: String, required: true},
        Book_Publishing: {type: String, required: true}
    }, {
        collection: 'book',
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.Book_ID = ret._id
                delete ret._id
            }
        }
    }
)
export const Book = noSqlConnection.model('book', schema);