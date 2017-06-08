// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com
(function() {

  "use strict";

  var INTERVAL = 1000;

  var gCtx = null;
  var gCanvas = null;
  var c = 0;
  var stype = 0;
  var gUM = false;
  var webkit = false;
  var moz = false;
  var v = null;

  function initCanvas(w, h) {
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
  }

  function captureToCanvas() {
    if (stype != 1)
      return;
    if (gUM) {
      try {
        gCtx.drawImage(v, 0, 0);
        try {
          qrcode.decode();
        } catch (e) {
          console.log(e);
        };
      } catch (e) {
        console.log(e);
      };

      setTimeout(captureToCanvas, INTERVAL);
    }
  }

  function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function isCanvasSupported() {
    var elem = document.createElement('canvas');

    return !!(elem.getContext && elem.getContext('2d'));
  }

  function success(stream) {
    if (webkit) 
      v.src = window.URL.createObjectURL(stream);
    else
    if (moz) {
      v.mozSrcObject = stream;
      v.play();
    } else
      v.src = stream;
    gUM = true;

    captureToCanvas();
  }

  function error(error) {
    gUM = false;

    return;
  }

  function setwebcam() {
    var options = true;

    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      try {
        navigator.mediaDevices.enumerateDevices()
          .then(function(devices) {
            devices.forEach(function(device) {
              if (device.kind === 'videoinput') {
                if (device.label.toLowerCase().search("back") > -1)
                  options = {
                    'deviceId': {
                      'exact': device.deviceId
                    },
                    'facingMode': 'environment'
                  };
              }
              console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
            });
            setwebcam2(options);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("no navigator.mediaDevices.enumerateDevices");
      setwebcam2(options);
    }
  }

  function setwebcam2(options) {
    console.log(options);
    if (stype == 1) {
      captureToCanvas();
      return;
    }

    var n = navigator;

    v = document.getElementById("v");


    if (n.getUserMedia)
      n.getUserMedia({
        video: options,
        audio: false
      }, success, error);
    else
    if (n.webkitGetUserMedia) {
      webkit = true;
      n.webkitGetUserMedia({
        video: options,
        audio: false
      }, success, error);
    } else
    if (n.mozGetUserMedia) {
      moz = true;
      n.mozGetUserMedia({
        video: options,
        audio: false
      }, success, error);
    }

    stype = 1;
  }

  window.QR = {
    isCanvasSupported : isCanvasSupported,
    initCanvas        : initCanvas,
    setwebcam         : setwebcam
  };

})();