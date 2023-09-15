import Koa from 'koa'
import Db from './db/index'
const app = new Koa()

new Db()



app.listen(3000, () => {
    console.log('服务已启动: http://localhost:3000')
})
