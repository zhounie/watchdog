import mongoose from 'mongoose'
export { Errors } from './errors'

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createTime: {
        type: Date,
        default: Date.now
    }
})


const applicationSchema = new mongoose.Schema({
    name: String,
    createTime: {
        type: Date,
        default: Date.now
    }
})

const performanceSchema = new mongoose.Schema({
    href: String,
    lcp: Number,
    cls: Number,
    fid: Number,
    userAgent: String,
    createTime: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model('User', userSchema)
export const Performance = mongoose.model('Performance', performanceSchema)
export const Application = mongoose.model('Application', applicationSchema)

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