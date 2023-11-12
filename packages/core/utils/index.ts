
export const parseStack = (stack: string): JsError => {
    if (stack) {
        const lines = stack.split('\n');
        // const errorType = /^\w+Error/.exec(lines[0])[0]
        
        // 解析第一行堆栈信息以获取文件名、行号和列号
        const matches = /.*at\s(.*):(\d+):(\d+)/.exec(lines[1]);
        if (matches) {
          const fileName = matches[1];
          const lineNumber = parseInt(matches[2], 10);
          const columnNumber = parseInt(matches[3], 10);
        //   console.log('Unhandled Promise rejection at:', fileName);
        //   console.log('Line Number:', lineNumber);
        //   console.log('Column Number:', columnNumber);
          return {
            type: undefined,
            message: lines[0],
            source: fileName,
            lineno: lineNumber,
            colno: columnNumber,
            errorTime: Date.now(),
            error: new window[/^\w+Error/.exec(lines[0])[0]](stack)
          }
        }
    }
}

export const handlerError = (event) => {
  console.log(event);
  
  // if (typeof event === 'string') {
  //   const error = parseStack(event)
    
  // }
  
  // JS错误
  if (event.error instanceof Error) {
    const errorItem: JsError = {
      type: undefined,
      message: event.message,
      source: event.filename || event.source,
      lineno: event.lineno,
      colno: event.colno,
      errorTime: Date.now()
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
    return errorItem
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
    return errorItem
  }
}