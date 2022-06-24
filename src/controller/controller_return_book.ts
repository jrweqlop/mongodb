import {Request, Response} from "express";
import {ReturnBook, returnBookType} from "../db/models/table_return_book";
import {insertSchema, options} from "../db/validateSchema/returnBook";
import {Types} from "mongoose";

export const Get_Return_book = async (req: Request, res: Response) => {
    try {
        const values = [{
            $lookup: {
                from: "member",
                localField: "Member_ID",
                foreignField: "_id",
                as: "Member"
            }
        }, {
            $lookup: {
                from: "librarian",
                localField: "Librarian_ID",
                foreignField: "_id",
                as: "Librarian"
            }
        }, {
            $unwind: "$Member"
        }, {
            $unwind: "$Librarian"
        }, {
            $project: {
                _id: false,
                Return_ID: '$_id',
                BorrowDetail_ID: true,
                Member_Name: '$Member.Member_Name',
                Member_Phone: '$Member.Member_Phone',
                Librarian_Name: '$Librarian.Librarian_Name',
                Librarian_Phone: '$Librarian.Librarian_Phone',
                Return_Date: true,
            }
        }]
        const result = await ReturnBook.aggregate(values)
        res.status(200).json({
            code: 200,
            message: 'Success',
            data: result
        });
    } catch (e: any) {
        return res.status(500).json({
            code: 5000,
            message: e.message
        })
    }
}

export const Insert_Return_book = async (req: Request, res: Response) => {
    const {BorrowDetail_ID, Member_ID, Librarian_ID} = req.body
    if (!Types.ObjectId.isValid(BorrowDetail_ID) && !Types.ObjectId.isValid(BorrowDetail_ID) && !Types.ObjectId.isValid(BorrowDetail_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: {
                error_Borrow_Detail: Types.ObjectId.isValid(BorrowDetail_ID),
                error_Member_ID: Types.ObjectId.isValid(Member_ID),
                error_Librarian_ID: Types.ObjectId.isValid(Librarian_ID),
            }
        })
    }
    try {
        const {error, value} = insertSchema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request',
                error: error.details.map((err) => err.message)
            })
        } else {
            const doc: returnBookType = value
            const document = new ReturnBook(doc)
            const insertBorrowBook = await document.save()
            return res.status(201).json({
                code: 201,
                message: 'Create Success'
            })
        }
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).json({
                code: 409,
                message: 'Already Exist'
            })
        } else {
            return res.status(500).json({
                code: 500,
                message: 'Internal Server Error',
                error: e.message
            })
        }
    }
}