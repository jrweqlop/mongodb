import {ConnectOptions, createConnection} from "mongoose";
import env from "dotenv";
env.config()
let options: ConnectOptions = {}
const noSqlConnection = createConnection(process.env.URL_NO_SQL!, options)
export {
    noSqlConnection
}