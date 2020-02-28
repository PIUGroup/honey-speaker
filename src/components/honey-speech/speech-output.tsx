"use strict";

import {Logger} from "./log-helper";
import {EventEmitter} from "@stencil/core";

export class Sprachausgabe {

  sprachSynthese: SpeechSynthesis;

  stimme: SpeechSynthesisVoice;

  speakerStarted: EventEmitter;

  speakerFinished: EventEmitter;

  speakerPaused: EventEmitter;

  speakerFailed: EventEmitter;


  constructor(speakerStarted: EventEmitter
    , speakerFinished: EventEmitter
    , speakerPaused: EventEmitter
    , speakerFailed: EventEmitter
  ) {
    this.speakerStarted = speakerStarted;
    this.speakerFinished = speakerFinished;
    this.speakerPaused = speakerPaused;
    this.speakerFailed = speakerFailed;
    this.sprachSynthese = window.speechSynthesis;
    this.stimme = this.getDefaultStimme();
    Logger.debugMessage("####constructor called");
  }

  getDefaultStimme(): SpeechSynthesisVoice {
    var voices: SpeechSynthesisVoice[] = this.sprachSynthese.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].default) {
        Logger.debugMessage("Voice:" + voices[i].name + voices[i].lang);
        return voices[i];
      }
    }
  }

  erzeugeVorleser(text: string, voice: SpeechSynthesisVoice): SpeechSynthesisUtterance {
    Logger.debugMessage("erzeugeVorleser started");
    const leserStimmeMitText: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);

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

    leserStimmeMitText.pitch = 1;
    leserStimmeMitText.rate = 1;
    leserStimmeMitText.volume = 1;
    leserStimmeMitText.voice = voice;
    return leserStimmeMitText;
  }

  textVorlesen(zuLesenderText: string) {
    if (this.sprachSynthese.speaking) {
      Logger.debugMessage("Spricht bereits");
      // return;
    }
    if (zuLesenderText) {
      const texte: string[] = zuLesenderText.match(/(\S+\s){1,20}/g);

      texte.forEach(text => {
          const vorleser: SpeechSynthesisUtterance = this.erzeugeVorleser(text, this.stimme);
          this.sprachSynthese.speak(vorleser);
        }
      );

    }
  }

}


