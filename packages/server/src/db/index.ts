import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})


const errorsSchema = new mongoose.Schema({
    message: String,
    source: String,
    lineno: Number,
    colno: Number
})

const applicationSchema = new mongoose.Schema({
    name: String
})


export const User = mongoose.model('User', userSchema)
export const Errors = mongoose.model('Errors', errorsSchema)
export const application = mongoose.model('applicationSchema', applicationSchema)

export default class DB {
    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017', {
            dbName: 'watchdog',
        }).then(() => {
            console.log(`数据库链接成功`);
        }).catch(err => {
            console.error(err);
        })
    }
}