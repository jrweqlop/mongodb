"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookTable = new mongoose_1.Schema({
    Book_ID: { type: Number, required: true },
    Book_Name: { type: String, required: true },
    Book_Category: { type: String, required: true },
    Book_Publishing: { type: String, required: true }
}, {
    collection: 'book',
    timestamps: true,
    versionKey: false,
    autoIndex: true
});
exports.default = bookTable;
