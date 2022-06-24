import {Request, Response} from "express";
import {BorrowDetail, borrowDetailType} from "../db/models/table_borrow_detail";
import {insertSchema, options} from "../db/validateSchema/borrowDeatil";
import formatClearData from "../utils/helper/format/formatCleanData";
import {Types} from "mongoose";

export const Get_Borrow_detail = async (req: Request, res: Response) => {
    try {
        // const populate = [
        //     {
        //         model: "borrow_book", path: "Borrow_ID",
        //         select: {createdAt: 0, updatedAt: 0},
        //         populate: [
        //             {path: "Member_ID", select: {Member_Name: 1}},
        //             {path: "Librarian_ID", select: {Librarian_Name: 1}}
        //         ]
        //     },
        //     {model: "book", path: "Book_ID", select: {Book_Name: 1}}
        // ]
        // const result = await BorrowDetail.find().populate(populate)
        const values = [{
            $lookup: {
                from: "book",
                localField: "Book_ID",
                foreignField: "_id",
                as: "Book"
            }
        }, {
            $lookup: {
                from: "borrow_book",
                localField: "Borrow_ID",
                foreignField: "_id",
                as: "BorrowBook"
            }
        }, {
            $unwind: "$BorrowBook"
        },{
            $lookup:{
                from:"member",
                localField: "BorrowBook.Member_ID",
                foreignField: "_id",
                as: "Member"
            }
        },{
            $lookup:{
                from:"librarian",
                localField: "BorrowBook.Librarian_ID",
                foreignField: "_id",
                as: "Librarian"
            }
        },{
            $unwind:"$Member"
        },{
            $unwind:"$Librarian"
        }, {
            $unwind: "$Book"
        }, {
            $project: {
                _id: false,
                Borrow_Detail:"$_id",
                Borrow_ID: true,
                Book_ID: true,
                Book_Name: '$Book.Book_Name',
                Member_ID:"$Member._id",
                Member:"$Member.Member_Name",
                Librarian_ID:"$Librarian._id",
                Librarian:"$Librarian.Librarian_Name",
                createdAt: true,
                updatedAt: true
            }
        }]
        const result = await BorrowDetail.aggregate(values)
        return res.status(200).json({
            code: 200,
            message: 'Success',
            data: result
        });
    } catch (e: any) {
        console.log(e.message)
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
        })
    }
}

export const Search_Borrow_detail = async (req: Request, res: Response) => {
    const {Borrow_ID}: any = req.params;
    const check = await BorrowDetail.find({_id: Borrow_ID})
    if (check === null) {
        return res.status(404).json({
            code: 404,
            message: 'Not Found'
        })
    }
    try {
        const populate = [
            {
                model: "borrow_book", path: "Borrow_ID",
                select: {createdAt: 0, updatedAt: 0},
                populate: [
                    {path: "Member_ID", select: {Member_Name: 1}},
                    {path: "Librarian_ID", select: {Librarian_Name: 1}}
                ]
            },
            {model: "book", path: "Book_ID", select: {Book_Name: 1}}
        ]
        const result = await BorrowDetail.find({Borrow_ID: Borrow_ID}).populate(populate)
        return res.status(200).json({
            code: 200,
            message: 'Success',
            data: result
        });
    } catch (e: any) {
        console.log(e.message)
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
        })
    }
}

export const Insert_Borrow_detail = async (req: Request, res: Response) => {
    try {
        const {error, value} = insertSchema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request',
                error: error.details.map((err) => err.message)
            })
        } else {
            const doc: borrowDetailType = value
            const document = new BorrowDetail(doc)
            const insertBookDetail = await document.save()
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
