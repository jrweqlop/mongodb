import {Schema, Document} from "mongoose";
import {noSqlConnection} from "../../connection/connect";

export interface memberType extends Document {
    Member_Student_ID: string;
    Member_Name: string;
    Member_Add: string;
    Member_Phone: string;
    Member_Issue: Date;
    Member_Expiry: Date;
    Member_Category: string;
}

const schema = new Schema<memberType>({
        Member_Student_ID: {type: String, required: true},
        Member_Name: {type: String, required: true},
        Member_Add: {type: String, required: true},
        Member_Phone: {type: String, required: true},
        Member_Issue: {type: Date, required: true},
        Member_Expiry: {type: Date, required: true},
        Member_Category: {type: String, required: true}
    },
    {
        collection: 'member',
        timestamps: true,
        versionKey: false,
        autoIndex: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.Member_ID = ret._id
                delete ret._id
            }
        }
    }
)

export const Member = noSqlConnection.model('member', schema)