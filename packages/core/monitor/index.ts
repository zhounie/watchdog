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

    // window.addEventListener("error", (event) => {
    //     // 判断是否是资源加载错误
    //     if (
    //       event.target instanceof HTMLImageElement ||
    //       event.target instanceof HTMLScriptElement ||
    //       event.target instanceof HTMLLinkElement
    //     ) {
    //       console.error("资源加载错误:", event.target.src || event.target.href);
    //     }
    // });
}