import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User = mongoose.model('User', userSchema)

export default class DB {
    constructor() {
        mongoose.connect('mongodb://127.0.0.1:27017', {
            dbName: 'watchdog',
        }).then(() => {
            console.log(`数据库链接成功`);

            new User({
                username: 'admin',
                password: '123456'
            }).save().then(() => {
                console.log('success');
                
            }).catch((err) => {
                console.log(err);
                
            })
            
        }).catch(err => {
            console.error(err);
        })
    }
}