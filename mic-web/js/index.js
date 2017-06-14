(function(win, doc) {

  "use strict";
  
  let canvas = doc.getElementById("canvas"),
      ctx    = canvas.getContext("2d");
  
  navigator.webkitGetUserMedia({
    audio: true
  }, _handleSuccess, _handleError);
  
  function _handleSuccess(evt) {
    let audioCtx = new AudioContext(),
        src      = audioCtx.createMediaStreamSource(evt),
        analyser = audioCtx.createAnalyser(evt);

    let LENGTH = 256,
        data   = new Uint8Array(LENGTH),
        w      = 0,
        i      = 0;


    analyser.fftSize = 1024;

    src.connect(audioCtx.destination);
    src.connect(analyser);

    setInterval(function() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = "#3e3e3e";

      w = canvas.width / LENGTH,

      analyser.getByteFrequencyData(data);

      for (i = 0; i < LENGTH; ++i) {
        console.log(data[i])
        ctx.rect(i * w, canvas.height - data[i], w, data[i]);
      }

      ctx.fill();
    }, 2000);
  }

  function _handleError() {
    alert("Error!");
  }

})(this, document);