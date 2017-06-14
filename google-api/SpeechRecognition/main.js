(function(win, doc) {

    "use strict";

    var recognition = new webkitSpeechRecognition(),
        msg         = doc.getElementById("msg");

    recognition.lang = "ja";

    recognition.addEventListener("start", function() {

    });

    recognition.addEventListener("result", function(evt) {
      var txt = evt.results[0][0].transcript;

      if (txt) {
        msg.innerText += evt.results[0][0].transcript;
        msg.innerHTML += "<br />";
      }
    }, false);

    recognition.addEventListener("end", function() {
      recognition.start();
    });

    recognition.start();

})(this, document);