import { Report } from '../controllers/report'

export default function (router) {
    router.post('/report', Report.add)
}