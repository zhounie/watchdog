interface ErrorItem {
    message: string;
    source: string;
    lineno: number;
    colno: number;
}

interface Config {
    api: string;
}