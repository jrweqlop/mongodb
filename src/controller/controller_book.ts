import {Request, Response} from "express";
import {Book, bookType} from "../db/models/table_book";
import formatClearData from "../utils/helper/format/formatCleanData";
import {insertSchema,updateSchema ,options} from "../db/validateSchema/book";
import {Types} from "mongoose";

export const Get_Book = async (req: Request, res: Response) => {
    try {
        const result = await Book.find()
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

export const Search_Book = async (req: Request, res: Response) => {
    const {Book_ID}: any = req.params;
    try {
        const documentBook = await Book.findOne({_id: Book_ID})
        if (documentBook === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'No Have Book_ID'
            })
        } else {
            return res.status(200).json({
                code: 200,
                message: 'Search Book Success',
                data: documentBook
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

export const Insert_Book = async (req: Request, res: Response) => {
    try {
        const {error, value} = insertSchema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request',
                value:value,
                error: error.details.map((err) => err.message)
            })
        } else {
            const doc: bookType = value
            const document = new Book(doc)
            const insertBook = await document.save()
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

export const Edit_Book = async (req: Request, res: Response) => {
    const {Book_ID}: any = req.params;
    if (!Types.ObjectId.isValid(Book_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(Book_ID)
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
            const doc:bookType = formatClearData(value)
            console.log(doc)
            const updateBook = await Book.findOneAndUpdate({_id: Book_ID}, doc)
            return res.status(202).json({
                code: 202,
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

export const Delete_Book = async (req: Request, res: Response) => {
    const {Book_ID} = req.params;
    if (!Types.ObjectId.isValid(Book_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(Book_ID)
        })
    }
    try {
        const documentBook = await Book.findOne({_id:Book_ID})
        if (documentBook === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'No Have Book_ID'
            })
        } else {
            await documentBook.remove()
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