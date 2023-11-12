import { Performance } from '../controllers/index'
import router from './index'

export default function (router) {
    router
    .get('/performance', Performance.getPerformance)
    .get('/performance/statistics', Performance.statistics)
}