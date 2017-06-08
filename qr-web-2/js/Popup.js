(() => {

  "use strict";

  class Popup {
    constructor(id) {
      this.elm = document.getElementById(id);
      this.txt = this.elm.querySelector(".txt");

      this.elm.addEventListener("click", (evt) => {
        if (evt.target === this.elm) {
          this.hide();
        }
      }, false);
    }
    
    hide() {
      this.elm.classList.remove(Popup.CONST.ON_KLASS);
    }
    
    show(txt = "") {
      this.elm.classList.add(Popup.CONST.ON_KLASS);
      this.txt.innerText = txt;
    }

    open() {
      window.open(this.txt.innerText);
    }
    
    static get CONST() {
      return {
        ON_KLASS : "on"
      };
    }
  }

  window.Popup = Popup;

})();