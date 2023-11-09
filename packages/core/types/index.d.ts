declare enum ErrorType {
    TypeError = 1,
    ReferenceError,
    SyntaxError,
    RangeError,
    URIError,
    SourceError
}

interface ErrorItem {
    type: ErrorType
}

interface JsError extends ErrorItem {
    message: string;
    source: string;
    lineno: number;
    colno: number;
}

interface SourceError extends ErrorItem {
    tag: string,
    url: string,
    source: string,
    errorTime: number
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

interface Config {
    api: string;
}