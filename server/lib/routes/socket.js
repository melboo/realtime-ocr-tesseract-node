var cv = require('opencv');
//var Tesseract = require('tesseract.js');
var tesseract = require('node-tesseract');
var should = require('should');

// camera properties
var camWidth = 320;
var camHeight = 240;
var camFps = 10;
var camInterval = 1000 / camFps;

// face detection properties
var rectColor = [0, 255, 0];
var rectThickness = 2;

// initialize camera
var camera = new cv.VideoCapture(0);
camera.setWidth(camWidth);
camera.setHeight(camHeight);

module.exports = function (socket) {
  setInterval(function() {
    camera.read(function(err, im) {

      im.save('./pic.jpg');
      if (err) throw err;

      // Tesseract.recognize('./pic.jpg')
      //   .then(function(result){
      //       console.log(result);
      //       socket.emit('frame', { buffer: im.toBuffer() });
      //   });

          tesseract.process('./pic.jpg', function(err, text) {
            if(err) {
              console.log('error');
            }else{
              console.log(text);
            //var tba = text.trim();
            
            //text.trim().should.equal('Lunch special');
            
            }
               
          });
          socket.emit('frame', { buffer: im.toBuffer() });

        
      

      // tesseract.process('./pic.jpg',function(err, text) {
      //         if(err) {
      //           console.error(err);
      //         } else {
      //           console.log(text);
      //           text.trim().should.equal('Lunch special');
      //           done();
      //         }
      //       });

      // im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
      //   if (err) throw err;

      //   for (var i = 0; i < faces.length; i++) {
      //     face = faces[i];
      //     im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
      //   }

      //   socket.emit('frame', { buffer: im.toBuffer() });
      // });
      //socket.emit('frame', { buffer: im.toBuffer() });
    });
  }, camInterval);
};
