
export const parseStack = (stack: string): JsError => {
    if (stack) {
        const lines = stack.split('\n');
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
            type: 1,
              message: lines[0],
              source: fileName,
              lineno: lineNumber,
              colno: columnNumber
          }
        }
    }
}