import { parseStack } from '../utils/index'

const errors: ErrorItem[] = []
export const monitor = () => {
    window.onerror = (errorMessage, sourceURL, lineNumber, columnNumber) => {
        if (errorMessage === 'string') {
            errors.push({
                message: errorMessage,
                source: sourceURL,
                lineno: lineNumber,
                colno: columnNumber
            })
        }
    }

    window.addEventListener('unhandledrejection', (event) => {
        const { stack } = event.reason
        const errorItem = parseStack(stack)
        errors.push(errorItem)
    })
}