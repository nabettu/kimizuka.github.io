(function() {

  "use strict";
  
  let canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");
  
  navigator.getUserMedia({
    audio: true
  }, _handleSuccess, _handleError);
  
  function _handleSuccess(evt) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        options  = {
          mediaStream : evt
        },
        src      = new MediaStreamAudioSourceNode(audioCtx, options),
        analyser = audioCtx.createAnalyser(evt);

    let LENGTH = 16,
        data   = new Uint8Array(LENGTH),
        w      = 0,
        i      = 0;

    analyser.fftSize = 1024;

    document.addEventListener("touchstart", function handleTouchStart() {
      src.connect(audioCtx.destination);
      src.connect(analyser);

      document.removeEventListener("touchstart", handleTouchStart, false);

      setInterval(function() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = "#3e3e3e";

        w = canvas.width / LENGTH,

        analyser.getByteFrequencyData(data);

        for (i = 0; i < LENGTH; ++i) {
          ctx.rect(i * w, canvas.height - data[i] * 2, w, data[i] * 2);
        }

        ctx.fill();
      }, 20);
    }, false);
  }

  function _handleError() {
    alert("Error!");
  }

})();