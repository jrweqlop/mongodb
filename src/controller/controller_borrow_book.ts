import {Request, Response} from "express";
import {BorrowBook, borrowBookType} from "../db/models/table_borrow_book";
import {insertSchema, options, updateSchema} from "../db/validateSchema/borrowBook";
import formatClearData from "../utils/helper/format/formatCleanData";
import {Types} from "mongoose";

export const Get_Borrow_book = async (req: Request, res: Response) => {
    try {
        // const populate = [
        //     {model: "member", path: "Member_ID", select: {Member_Name: 1}},
        //     {model: "librarian", path: "Librarian_ID", select: {Librarian_Name: 1}}
        // ]
        // const result = await BorrowBook.find().populate(populate)
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
                Borrow_ID: '$_id',
                Member_Name: '$Member.Member_Name',
                Member_Phone: '$Member.Member_Phone',
                Member_Category: '$Member.Member_Category',
                Librarian_Name: '$Librarian.Librarian_Name',
                Librarian_Phone: '$Librarian.Librarian_Phone',
                Borrow_Date: true,
                createdAt: true,
                updatedAt: true
            }
        }]
        const result = await BorrowBook.aggregate(values)
        return res.status(200).json({
            code: 200,
            message: 'Success',
            data: result
        });
    } catch (e: any) {
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
            error: e.message
        })
    }
}

export const Search_Borrow_book = async (req: Request, res: Response) => {
    const {Borrow_ID} = req.params;
    try {
        const documentBorrowBook = await BorrowBook.findOne({_id: Borrow_ID})
        console.log(documentBorrowBook)
        if (documentBorrowBook === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'Have no data Librarian_ID'
            })
        } else {
            return res.status(200).json({
                code: 200,
                message: 'Success',
                data: documentBorrowBook
            });
        }
    } catch (e: any) {
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
            error: e.message
        })
    }
}

export const Insert_Borrow_book = async (req: Request, res: Response) => {
    try {
        const {error, value} = insertSchema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request',
                error: error.details.map((err) => err.message)
            })
        } else {
            const doc: borrowBookType = value
            const document = new BorrowBook(doc)
            const insertBorrowBook = await document.save()
            return res.status(201).json({
                code: 201,
                message: 'Create Success'
            })
        }
    } catch (e: any) {
        console.log(e.message)
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
            error: e.message
        })
    }
}

export const Edit_Borrow_book = async (req: Request, res: Response) => {
    const {Borrow_ID} = req.params
    if (!Types.ObjectId.isValid(Borrow_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(Borrow_ID)
        })
    }
    try {
        const {error, value} = updateSchema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request',
                error: error.details.map((err) => err.message)
            })
        } else {
            const doc: borrowBookType = formatClearData(value)
            console.log(doc)
            const document = await BorrowBook.findOneAndUpdate({_id: Borrow_ID}, doc)
            return res.status(200).json({
                code: 200,
                message: 'Update Success'
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
            error: e.message
        })
    }
}

export const Delete_Borrow_book = async (req: Request, res: Response) => {
    const {Borrow_ID} = req.params
    if (!Types.ObjectId.isValid(Borrow_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(Borrow_ID)
        })
    }
    try {
        const documentBorrowBook = await BorrowBook.findOne({_id: Borrow_ID})
        if (documentBorrowBook === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'No Have Borrow_ID'
            })
        } else {
            await documentBorrowBook.remove()
            return res.status(200).json({
                code: 200,
                message: 'Delete Success'
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
            error: e.message
        })
    }
}