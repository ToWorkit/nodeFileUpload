let express = require('express'),
  multer = require('multer'),
  path = require('path'),
  fs = require('fs'),
  app = express();

// 开放静态文件
// /www/promotions.yueloo.com
app.use(express.static(path.join('/www/promotions.yueloo.com', 'upload')));
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 文件初始路径
    let filePath = path.join(__dirname, 'upload');
    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, (err) => {
        if (err) {
          console.log(err)
        } else {
          cb(null, filePath)
        }
      })
    } else {
      cb(null, filePath)
    }
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    // UUID 处理
    function guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    cb(null, file.fieldname + guid() + Date.now() + ext)
  }
})

let upload = multer({ storage: storage })
let uploadSingle = upload.single('file')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/web/index.html'))
})

app.post('/FileUpLoad', (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) return
    var file = req.file
      // console.log(req.file)
    function getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      return y + '-' + m + '-' + d;
    }
    // data = JSON.parse(data)
    let simpleImageData = {
      "image_time": getTime(),
      "image_originUrl": file.originalname,
      "image_newUrl": 'http://promotions.yueloo.com/upload/' + file.filename
    }
    simpleImageData = JSON.stringify(simpleImageData)

    fs.appendFile('./data.json', simpleImageData, (err) => {
      if (err) {
        throw err
      }

      // data.imageData.push(simpleImageData);
      // 写入 data.json
      // data = JSON.stringify(data);
      // fs.writeFile('./data.json', data, (err) => {
      //   if(err) {
      //     return err
      //   }
      // })
    })
    res.send(simpleImageData)
      // simpleImageData = JSON.stringify(simpleImageData)
  })
})

app.listen(8083, (err) => {
  console.log('127.0.0.1:8083')
})
