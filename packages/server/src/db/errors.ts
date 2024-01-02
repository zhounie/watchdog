import mongoose from 'mongoose'

const errorsSchema = new mongoose.Schema({
    type: Number,
    message: String,
    source: String,
    lineno: Number,
    colno: Number,
    tag: String,
    url: String,
    errorTime: Number,
    requestUrl: String,
    responseUrl: String,
    requestParams: String,
    header: String,
    responseStatus: Number,
    userAgent: String,
    createTime: {
        type: Date,
        default: Date.now
    }
})
export const Errors = mongoose.model('Errors', errorsSchema)
export default Errors
