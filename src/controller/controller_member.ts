import {Request, Response} from "express";
import {Member, memberType} from "../db/models/table_member";
import formatClearData from "../utils/helper/format/formatCleanData";
import {insertSchema, options, updateSchema} from "../db/validateSchema/member";
import {Types} from "mongoose";

export const Get_Member = async (req: Request, res: Response) => {
    try {
        const result = await Member.find()
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

export const Search_Member = async (req: Request, res: Response) => {
    const {Member_ID}: any = req.params;
    try {
        const checkMemberID = await Member.findOne({_id: Member_ID})
        if (checkMemberID === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'No Have Member_ID'
            })
        } else {
            return res.status(200).json({
                code: 200,
                message: 'Search Member Success',
                data: checkMemberID
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

export const Insert_Member = async (req: Request, res: Response) => {
    try {
        const {error, value} = insertSchema.validate(req.body, options);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request',
                error: error.details.map((err) => err.message)
            })
        } else {
            const doc: memberType = value
            const document = new Member(doc)
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

export const Edit_Member = async (req: Request, res: Response) => {
    const {Member_ID}: any = req.params;
    if (!Types.ObjectId.isValid(Member_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(Member_ID)
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
            const doc: memberType = formatClearData(value)
            console.log(doc)
            const updateMember = await Member.findOneAndUpdate({_id: Member_ID}, doc)
            return res.status(200).json({
                code: 200,
                message: 'Update Success'
            })
        }
    } catch (e: any) {
        console.log(e.message)
        return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
        })
    }
}

export const Delete_Member = async (req: Request, res: Response) => {
    const {Member_ID}: any = req.params;
    if (!Types.ObjectId.isValid(Member_ID)) {
        return res.status(400).json({
            code: 400,
            message: 'Bad Request',
            error: Types.ObjectId.isValid(Member_ID)
        })
    }
    try {
        const documentMember = await Member.findOne({_id: Member_ID})
        if (documentMember === null) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                alert: 'No Have Member_ID'
            })
        } else {
            await documentMember.remove()
            return res.status(200).json({
                code: 200,
                message: 'Delete Success'
            })
        }
    } catch (e: any) {
        return res.status(500).json({
            code: 500,
            message: 'Delete Success',
            alert: e.message
        })
    }
}