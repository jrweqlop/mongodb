import express, {Application, Request, Response} from "express";
import env from "dotenv";
import book from "./routes/book";
import {noSqlConnection} from "./connection/connect";
import member from "./routes/member";
import librarian from "./routes/librarian";
import borrow_book from "./routes/borrow_book";
import borrow_detail from "./routes/borrow_detail";
import return_book from "./routes/return_book";


env.config()

const app: Application = express()

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("hello world")
})

const port: number = parseInt(String(process.env.CONFIG_PORT || 4000))

const base = '/book_system'
app.use(`${base}/api/v1/member`, member)
app.use(`${base}/api/v1/librarian`, librarian)
app.use(`${base}/api/v1/book`, book)
app.use(`${base}/api/v1/borrow_book`, borrow_book)
app.use(`${base}/api/v1/borrow_detail`, borrow_detail)
app.use(`${base}/api/v1/return_book`, return_book)

app.listen(port, async () => {
    noSqlConnection.on("error", () => {
        console.log("Connect Database Fail")
    })
    noSqlConnection.on("connected", async () => {
        console.log("Connect Database Success")
    })
    console.log("connect");
    console.log(port)
})
