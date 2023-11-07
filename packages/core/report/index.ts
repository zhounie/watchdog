import { config } from '../config/index'
export const report = (data) => {
    navigator.sendBeacon('/report', JSON.stringify(data))
}
