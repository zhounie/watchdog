import { config } from '../config/index'

let logs: Log[] = []

function sendLogs () {
    if (logs.length) {
        console.log(JSON.stringify(logs));
        
        const reportStatus = navigator.sendBeacon(
            config.url,
            new Blob([JSON.stringify(logs)], {
                type: 'application/json; charset=UTF-8'
            })
        )
        if (reportStatus) {
            logs = []
        }
    }
}

window.addEventListener('beforeunload', () => {
    sendLogs()
})

export const report = (log: Log) => {
    logs.push(log)
    // sendLogs()
}
