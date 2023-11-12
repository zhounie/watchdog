declare enum ErrorType {
    TypeError = 1,
    ReferenceError,
    SyntaxError,
    RangeError,
    URIError,
    SourceError,
    AxiosError
}

interface ErrorItem {
    type: ErrorType;
    errorTime?: number
}

interface JsError extends ErrorItem {
    message: string;
    source: string;
    lineno: number;
    colno: number;
    error: any;
}

interface SourceError extends ErrorItem {
    tag: string,
    url: string,
    source: string,
    errorTime: number
}

interface AxiosError extends JsError, ErrorItem {
    requestUrl: string,
    responseUrl: string,
    requestParams: string,
    header: string,
    responseStatus: number,
}

// interface ErrorItem extends JsError | SourceError {
//     type: ErrorType
// }

interface PerformanceItem {
    type: 0,
    href: string
    lcp?: number
    cls?: number
    fid?: number
}

type Log = SourceError | JsError | PerformanceItem

interface Options {
    url: string;
    isVue: boolean;
}