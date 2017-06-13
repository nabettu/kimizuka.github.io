var vid = document.getElementById("videoel");
var overlay = document.getElementById("overlay");
var overlayCC = overlay.getContext("2d");

var ctrack = new clm.tracker({
  useWebGL: true
});
ctrack.init(pModel);

stats = new Stats();
stats.domElement.style.position = "absolute";
stats.domElement.style.top = "0px";
document.getElementById("container").appendChild(stats.domElement);

function enablestart() {
  var startbutton = document.getElementById("startbutton");

  startbutton.value = "start";
  startbutton.disabled = null;
}

var insertAltVideo = function(video) {
  if (supports_video()) {
    if (supports_ogg_theora_video()) {
      video.src = "./media/cap12_edit.ogv";
    } else if (supports_h264_baseline_video()) {
      video.src = "./media/cap12_edit.mp4";
    } else {
      return false;
    }
    return true;
  } else return false;
}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// check for camerasupport
if (navigator.getUserMedia) {
  // set up stream

  var videoSelector = {
    video: true
  };
  if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
    var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
    if (chromeVersion < 20) {
      videoSelector = "video";
    }
  };

  navigator.getUserMedia(videoSelector, function(stream) {
    if (vid.mozCaptureStream) {
      vid.mozSrcObject = stream;
    } else {
      vid.srcObject = stream;

      var videostyle, width, height;

      videostyle = getComputedStyle(videoel);

      setTimeout(() => {
        width = parseInt(videostyle.width, 10);
        height = parseInt(videostyle.height, 10);

        overlay.setAttribute("width", width);
        overlay.setAttribute("height", height);
        vid.width = width;
        vid.height = height;
      }, 100);
    }
  }, function() {
    insertAltVideo(vid);
    document.getElementById("gum").className = "hide";
    document.getElementById("nogum").className = "nohide";
    alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
  });
} else {
  insertAltVideo(vid);
  document.getElementById("gum").className = "hide";
  document.getElementById("nogum").className = "nohide";
  alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
}

vid.addEventListener("canplay", enablestart, false);

function startVideo() {
  ctrack.start(vid);
  drawLoop();
}

function drawLoop() {
  requestAnimFrame(drawLoop);
  overlay.width = overlay.width;
  overlay.height = overlay.height;

  if (ctrack.getCurrentPosition()) {
    ctrack.draw(overlay);
  }
}

// update stats on every iteration
document.addEventListener("clmtrackrIteration", function(event) {
  stats.update();
}, false);