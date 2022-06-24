import {Schema, Document} from "mongoose";
import {noSqlConnection} from "../../connection/connect";

export interface librarianType extends Document {
    Librarian_Name: string
    Librarian_Phone: string
    Librarian_Issue: Date
    Librarian_Expiry: Date
}

const schema = new Schema<librarianType>({
        Librarian_Name: {type: String, required: true},
        Librarian_Phone: {type: String, required: true},
        Librarian_Issue: {type: Date, required: true},
        Librarian_Expiry: {type: Date, required: true},
    }, {
        collection: 'librarian',
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.Librarian_ID = ret._id
                delete ret._id
            }
        }
    }
)
export const Librarian = noSqlConnection.model('librarian', schema);