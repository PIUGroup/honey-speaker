"use strict";

import {Logger} from "./log-helper";
import {EventEmitter} from "@stencil/core";

export class Sprachausgabe {

  sprachSynthese: SpeechSynthesis;

  speakerStarted: EventEmitter;

  speakerFinished: EventEmitter;

  speakerPaused: EventEmitter;

  speakerFailed: EventEmitter;


  constructor(   speakerStarted: EventEmitter
               , speakerFinished: EventEmitter
               , speakerPaused: EventEmitter
               , speakerFailed: EventEmitter
  ) {
    this.speakerStarted = speakerStarted;
    this.speakerFinished = speakerFinished;
    this.speakerPaused = speakerPaused;
    this.speakerFailed = speakerFailed;
    this.sprachSynthese = window.speechSynthesis;
    Logger.debugMessage("####constructor called");
  }

  textVorlesen(zuLesenderText) {
    if (this.sprachSynthese.speaking) {
      Logger.debugMessage("Spricht bereits");
      return;
    }
    if (zuLesenderText) {
      var vorleseText = zuLesenderText;
      Logger.debugMessage("Text:" + vorleseText);
      var leserStimmeMitText = new SpeechSynthesisUtterance(vorleseText);

      leserStimmeMitText.onend = () => {
        this.speakerFinished.emit();
        Logger.debugMessage("Vorlesen beendet");
      }

      leserStimmeMitText.onstart = () => {
        this.speakerStarted.emit();
        Logger.debugMessage("Vorlesen gestartet");
      }

      leserStimmeMitText.onpause = () => {
        this.speakerPaused.emit();
        Logger.debugMessage("Pause mit Vorlesen");
      }

      leserStimmeMitText.onerror = () => {
        this.speakerFailed.emit();
        Logger.errorMessage("Fehler beim Vorlesen");
      }

      var voices = this.sprachSynthese.getVoices();
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].default) {
          Logger.debugMessage("Voice:" + voices[i].name + voices[i].lang);
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


