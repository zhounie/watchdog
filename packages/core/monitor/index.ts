import { report } from '../report'
import { parseStack, handlerError } from '../utils/index'
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
        
        const { stack } = event.reason
        let errorItem: JsError = parseStack(stack)
        console.log(errorItem);
        
        if (event.reason.name === 'AxiosError') {
            (errorItem as AxiosError).type = 7;
            (errorItem as AxiosError).requestUrl = event.reason.config.url;
            (errorItem as AxiosError).responseUrl = event.reason.request.responseURL;
            (errorItem as AxiosError).requestParams = event.reason.config.data;
            (errorItem as AxiosError).responseStatus = event.reason.response.status;
            (errorItem as AxiosError).header = JSON.stringify(event.reason.config.headers);
        } else {
            errorItem = handlerError(errorItem)
            console.log(errorItem);
            
        }
        
        // errors.push(errorItem)
        report(errorItem)
    })
    
    window.addEventListener("error", (event) => {
        console.log(33333);
        
        
        const errorItem = handlerError(event)
        console.log(errorItem);
        
        report(errorItem)
    }, true);
}