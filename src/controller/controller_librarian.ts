import {Request, Response} from "express";
import {Librarian, librarianType} from "../db/models/table_librarian";
import {insertSchema, options, updateSchema} from "../db/validateSchema/librarian";
import formatClearData from "../utils/helper/format/formatCleanData";
import {Types} from "mongoose";

export const Get_Librarian = async (req: Request, res: Response) => {
    try {
        const result = await Librarian.find()
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

export const Search_Librarian = async (req: Request, res: Response) => {
    const {librarian_ID} = req.params;
    try {
        const documentLibrarianID = await Librarian.findOne({_id: librarian_ID})
        if (documentLibrarianID === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'Have no data Librarian_ID'
            })
        } else {
            return res.status(200).json({
                code: 200,
                message: 'Success',
                data: documentLibrarianID
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

export const Insert_Librarian = async (req: Request, res: Response) => {
    try {
        const {error, value} = insertSchema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request',
                error: error.details.map((err) => err.message)
            })
        } else {
            const doc: librarianType = value
            const document = new Librarian(doc)
            const insertLibrarian = await document.save()
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

export const Edit_Librarian = async (req: Request, res: Response) => {
    const {librarian_ID} = req.params
    if (!Types.ObjectId.isValid(librarian_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(librarian_ID)
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
            const doc: librarianType = formatClearData(value)
            console.log(doc)
            const document = await Librarian.findOneAndUpdate({_id: librarian_ID}, doc)
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

export const Delete_Librarian = async (req: Request, res: Response) => {
    const {librarian_ID} = req.params
    if (!Types.ObjectId.isValid(librarian_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(librarian_ID)
        })
    }
    try {
        const documentLibrarian = await Librarian.findOne({_id: librarian_ID})
        if (documentLibrarian === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'No Have Librarian_ID'
            })
        } else {
            await documentLibrarian.remove()
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