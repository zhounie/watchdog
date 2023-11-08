import { Report } from '../controllers/index'

export default function (router) {
    router.post('/report', Report.add)
}