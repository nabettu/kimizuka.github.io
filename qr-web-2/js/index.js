(() => {

  "use stcict";

  const video = document.getElementById("video"),
        qr    = new window.QCodeDecoder(),
        popup = new window.Popup("overlay");

  navigator.getUserMedia({
    video: {
      facingMode : {
        exact : "environment"
      }
    }, audio: false
  }, _handleSuccess, _handleError);

  qr.decodeFromVideo(video, (err, result) => {
    if (err) {
      throw err;
    }

    if (/^http/.test(result)) {
      popup.show(result);
    }

  }, false);

  document.getElementById("open").addEventListener("click", () => {
    popup.open();
  }, false);
  
  document.getElementById("close").addEventListener("click", () => {
    popup.hide();
  }, false);

  function _handleSuccess(localMediaStream) {
    video.style.display = "block";
    video.srcObject = localMediaStream;
  }

  function _handleError() {
    alert("ERROR: カメラを起動できませんでした。");
  }

})();