var express = require('express');
var router = express.Router();

/* GET home page. */

var multer = require('multer')

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    var random = Math.random();
    cb(null, random + Date.now() + file.originalname);
  },
});
// var upload2 = multer({
//   storage: storage, limits: {
//     // tùy chọn max size cho file
//     fileSize: 2048
//   }
// }).array('ac',2);
var upload2= multer({
  storage: storage,limits:{
    fileSize:1 * 1024 * 1024
  }


}).array('ac',3);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload File' });
});
router.post('/profilearray', function (req, res, next) {
  upload2(req,res,function (err) {
    if (err){
      res.render('index', {
        title: err.message
      });
    }else {
      res.render('index', {
        title: 'Upload thành công!!!!,' +
            ' kiểm tra thư mục uploads'
      });
    }
  })

});

module.exports = router;
