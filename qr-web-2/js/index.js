(function() {

  "use stcict";

  var video = document.getElementById("video"),
      qr    = new window.QCodeDecoder();

  navigator.getUserMedia({
    video: {
      facingMode : {
        exact : "environment"
      }
    }, audio: false
  }, _handleSuccess, _handleError);

  qr.decodeFromVideo(video, function (err, result) {
    if (err) {
      throw err;
    }

    alert(result);

  }, false);

  function _handleSuccess(localMediaStream) {
    video.style.display = "block";
    video.srcObject = localMediaStream;
  }

  function _handleError() {
    alert("ERROR: カメラを起動できませんでした。");
  }
})();