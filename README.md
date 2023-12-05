# Watchdog

### Usage

```sh
# npm
npm add watchdog
```

```sh
# pnpm
pnpm add watchdog
```

```sh
# yarn
yarn add watchdog
```

<!-- ## 错误监控

## 性能监控
1. Page Load Time
   ``` js
   var startTime = performance.now();

    // 页面加载完成后执行的代码

    window.addEventListener('load', function() {
        var endTime = performance.now();
        var pageLoadTime = endTime - startTime;
        console.log('Page Load Time:', pageLoadTime);
    });
    ```
2. First Contentful Paint
   ``` js
    window.addEventListener('load', function() {
        var firstContentfulPaint = performance.timing.domContentLoadedEventStart - performance.timing.navigationStart;
        console.log('First Contentful Paint:', firstContentfulPaint);
    });
    ```
3. First Meaningful Paint
   ``` js
    window.addEventListener('load', function() {
        var firstMeaningfulPaint = performance.getEntriesByName('first-contentful-paint')[0].startTime;
        console.log('First Meaningful Paint:', firstMeaningfulPaint);
    });
   ```
4. Time to Interactive
   ``` js
    var startTime = performance.now();

    // 监听用户输入或按钮点击等事件

    window.addEventListener('input', function() {
        var endTime = performance.now();
        var timeToInteractive = endTime - startTime;
        console.log('Time to Interactive:', timeToInteractive);
    });
   ``` -->