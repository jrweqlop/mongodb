import {connect} from "mongoose";
import env from "dotenv";
env.config()

const https = String(process.env.HOST)
const host = String(process.env.URL)
const apiUrl = String(process.env.APIURL)

const url:string = String(process.env.URL_NO_SQL)

const connectDatabase = async () => {
    try {
        await connect(url);
        console.log("success connect MongoDB")
        return true;
    } catch (e) {
        console.log(https, host, apiUrl)
        return false;
    }
}

export default connectDatabase