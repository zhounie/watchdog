import { parseStack } from '../../utils/index'
const errors = []
export const monitor = () => {
    window.onerror = (errorMessage, sourceURL, lineNumber, columnNumber) => {
        console.log('err', errorMessage, sourceURL, lineNumber, columnNumber);
        errors.push({
            errorMessage, sourceURL, lineNumber, columnNumber            
        })
    }

    window.addEventListener('unhandledrejection', (event) => {
        const { message, stack } = event.reason
        const {} = parseStack(stack)
        console.log('err', message, stack);
        errors.push({
            message,
            stack
        })
    })
}