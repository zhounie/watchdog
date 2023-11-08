import { onLCP, onFID, onCLS } from 'web-vitals'
import { report } from '../report'
import { config } from '../config/index'
import type { Log } from '../report/index'
import { toLower } from 'lodash'

const log: Log = {
    type: 0,
    href: window.location.href,
    lcp: undefined,
    cls: undefined,
    fid: undefined
}

export const LCP = () => {
    return new Promise((resolve, reject) => {
        onLCP((data) => {
            resolve(data)
        })
    })
}

export const FID = () => {
    return new Promise((resolve, reject) => {
        onFID((data) => {
            resolve(data)
        })  
    })
}

export const CLS = () => {
    return new Promise((resolve, reject) => {
        onCLS((data) => {
            resolve(data)
        })
    })
}

export function performance () {
    Promise.all([LCP()]).then(res=>{
        res.forEach(item => {
            log[String(item.name).toLowerCase()] = item.value
        })
        report(log)
    }).catch((err) => {
        console.log(err);
    })
}

export default performance