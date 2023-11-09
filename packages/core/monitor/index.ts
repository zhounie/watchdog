import { report } from '../report'
import { parseStack } from '../utils/index'
// import axios from 'axios'

// axios.get('/user?ID=12345')
 
// const errors: ErrorItem[] = []
export const monitor = () => {
    // window.onerror = (errorMessage, sourceURL, lineNumber, columnNumber) => {
    //     console.log('-------------');
        
    //     console.log(sourceURL);
        
    //     // if (errorMessage === 'string') {
    //     //     const errorItem: ErrorItem = {
    //     //         type: 1,
    //     //         message: errorMessage,
    //     //         source: sourceURL,
    //     //         lineno: lineNumber,
    //     //         colno: columnNumber
    //     //     }
    //     //     report(errorItem)
    //     // }
    // }

    window.addEventListener('unhandledrejection', (event) => {
        console.log('-----');
        
        console.log(event);
        
        const { stack } = event.reason
        const errorItem: JsError = parseStack(stack)
        // errors.push(errorItem)
        report(errorItem)
    })
    
    window.addEventListener("error", (event) => {
        // JS错误
        if (event.error instanceof Error) {
          const errorItem: JsError = {
            type: undefined,
            message: event.message,
            source: event.filename,
            lineno: event.lineno,
            colno: event.colno
          }
          if (event.error instanceof TypeError) {
            errorItem.type = 1
          }
          if (event.error instanceof ReferenceError) {
            errorItem.type = 2
          }
          if (event.error instanceof SyntaxError) {
            errorItem.type = 3
          }
          if (event.error instanceof RangeError) {
            errorItem.type = 4
          }
          if (event.error instanceof URIError) {
            errorItem.type = 5
          }
          report(errorItem)
        } else if ( // 资源加载错误
          event.target instanceof HTMLImageElement ||
          event.target instanceof HTMLScriptElement ||
          event.target instanceof HTMLLinkElement
        ) {
          const errorItem: SourceError = {
            type: 6,
            tag: event.target.tagName.toLowerCase(),
            url: (event.target as HTMLImageElement).src || (event.target as HTMLLinkElement).href,
            source: event.target.baseURI,
            errorTime: Date.now()
          }
          report(errorItem)
        }


          //     console.log('-------------');
        
    //     console.log(errorMessage);
        
    //     if (errorMessage === 'string') {
    //         const errorItem: ErrorItem = {
    //             type: 1,
    //             message: errorMessage,
    //             source: sourceURL,
    //             lineno: lineNumber,
    //             colno: columnNumber
    //         }
    //         report(errorItem)
    //     }
    }, true);
}