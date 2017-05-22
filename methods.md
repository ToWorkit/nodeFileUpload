# 文件部署

> ### 如果文件处理需要一直的修改某一文件比如data.json, 那么服务端git是没法搞得，因为每次修改之后都得重新去git pull代码，那样是没法搞得，解决方案是建立一个data.json.dist 文件，告知data.json文件是存在的，然后当部署之后再生成data.json文件就可以完美解决这个问题了

# url转码

> ### 使用encodeURIComponent去做url转码，因为会有&符号的存在，encodeURI是没法去处理的，会导致url地址错误

# 使用// 而非/ 引入外部文件

> ### 受限于https和http协议，使用 / 引入而使用https协议访问网页时会报错，并且会锁定文件，而使用 // 就可以避免这个问题从而达到自适应 协议

```html
<link rel="stylesheet" href="//cdn.yuelu.net/bootstrap/3.3.1/css/bootstrap.min.css"/>
```

# 数据的处理

> ### 注意json数据格式的转换，以及 res.end/send 数据要求

# 防止文件命名重复

## UUID
```JavaScript
// UUID 处理
    function guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
```