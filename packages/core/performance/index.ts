import { onLCP, onFID, onCLS } from 'web-vitals'
import { report } from '../report'

export const LCP = (options) => {
    onLCP((data) => {
        report(data)
    })
}

export const FID = (options) => {
    onFID((data) => {
        report(data)
    })
}

export const CLS = (options) => {
    onCLS((data) => {
        report(data)
    })
}

export function performance (options) {
    LCP(options)
    FID(options)
    CLS(options)
}

export default performance