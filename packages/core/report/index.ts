import { config } from '../config/index'

enum Type {
    Performance,
    Error,
}

export interface Log {
    type: Type
    href: string
    lcp?: number
    cls?: number
    fid?: number
}
export const report = (log: Log) => {
    navigator.sendBeacon(config.url, new Blob([JSON.stringify(log)], {
        type: 'application/json; charset=UTF-8'
    }))
}
