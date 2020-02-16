"use strict";

import {Logger} from "./log-helper";

export class Sprachausgabe {

  sprachSynthese: SpeechSynthesis;

  constructor() {
    this.sprachSynthese = window.speechSynthesis;
    Logger.logMessage("####constructor called");
  }

  textVorlesen(zuLesenderText) {
    if (this.sprachSynthese.speaking) {
      Logger.logMessage("Spricht bereits");
      return;
    }
    if (zuLesenderText) {
      var vorleseText = zuLesenderText;
      Logger.logMessage("Text:" + vorleseText);
      var leserStimmeMitText = new SpeechSynthesisUtterance(vorleseText);

      leserStimmeMitText.onend = () => {
        Logger.logMessage("Vorlesen beendet");
      }

      leserStimmeMitText.onerror = () => {
        Logger.logMessage("Fehler beim Vorlesen");
      }

      var voices = this.sprachSynthese.getVoices();
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].default) {
          Logger.logMessage("Voice:" + voices[i].name + voices[i].lang);
          leserStimmeMitText.voice = voices[i];
          break;
        }
      }
      leserStimmeMitText.pitch = 1;
      leserStimmeMitText.rate = 1;
      leserStimmeMitText.volume = 1;
      this.sprachSynthese.speak(leserStimmeMitText);
    }
  }

}


