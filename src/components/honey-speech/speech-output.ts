import {EventEmitter} from "@stencil/core";
import {Logger} from "./log-helper";

export class Sprachausgabe {

  sprachSynthese: SpeechSynthesis;

  stimme: SpeechSynthesisVoice;

  audioLang: string;
  audioPitch: number;
  audioRate: number;
  audioVolume: number;
  voiceName: string;


  speakerStarted: EventEmitter;

  speakerFinished: EventEmitter;

  speakerPaused: EventEmitter;

  speakerFailed: EventEmitter;


  constructor(speakerStarted: EventEmitter
    , speakerFinished: EventEmitter
    , speakerPaused: EventEmitter
    , speakerFailed: EventEmitter
    , audioLang: string
    , audioPitch: number
    , audioRate: number
    , audioVolume: number
    , voiceName: string
  ) {
    this.sprachSynthese =  window.speechSynthesis;
    this.speakerStarted = speakerStarted;
    this.speakerFinished = speakerFinished;
    this.speakerPaused = speakerPaused;
    this.speakerFailed = speakerFailed;
    this.audioLang = audioLang;
    this.audioPitch = audioPitch;
    this.audioRate = audioRate;
    this.audioVolume = audioVolume;
    this.voiceName = voiceName;
    this.stimme = this.getDefaultStimme();
    Logger.debugMessage("####constructor called");
  }

  getDefaultStimme(): SpeechSynthesisVoice {
    var namedMatch: SpeechSynthesisVoice;
    var langMatches: SpeechSynthesisVoice[] = [];
    var langDefaultMatch: SpeechSynthesisVoice;
    var defaultMatch: SpeechSynthesisVoice;

    var voices: SpeechSynthesisVoice[] = this.sprachSynthese.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === this.voiceName ||
        voices[i].lang === this.audioLang ||
        voices[i].default
      ) {
        Logger.debugMessage("Voice matched:" + voices[i].name + voices[i].lang);
        if (voices[i].name === this.voiceName) {
          namedMatch = voices[i];
        }
        if (voices[i].lang === this.audioLang &&
          voices[i].default
        ) {
          langDefaultMatch = voices[i];
        }
        if (voices[i].lang === this.audioLang) {
          langMatches.push(voices[i]);
        }
        if (voices[i].default) {
          defaultMatch = voices[i];
        }
      }
    }
    // Auswertung
    if (namedMatch) {
      return namedMatch;
    }
    if (langDefaultMatch) {
      return langDefaultMatch;
    }
    if (langMatches && langMatches.length > 0) {
      return langMatches[0];
    }
    if (defaultMatch) {
      return defaultMatch;
    }
    return voices[0];
  }

  erzeugeVorleser(text: string): SpeechSynthesisUtterance {
    Logger.debugMessage("erzeugeVorleser started");
    const vorleser: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);

    vorleser.onend = () => {
      this.speakerFinished.emit();
      Logger.debugMessage("Vorlesen beendet");
    }

    vorleser.onstart = () => {
      this.speakerStarted.emit();
      Logger.debugMessage("Vorlesen gestartet");
    }

    vorleser.onpause = () => {
      this.speakerPaused.emit();
      Logger.debugMessage("Pause mit Vorlesen");
    }

    vorleser.onerror = () => {
      this.speakerFailed.emit();
      Logger.errorMessage("Fehler beim Vorlesen");
    }

    vorleser.pitch = this.audioPitch;
    vorleser.rate = this.audioRate;
    vorleser.volume = this.audioVolume;
    vorleser.voice = this.stimme;
    vorleser.lang = this.audioLang;
    return vorleser;
  }

  textVorlesen(zuLesenderText: string) {
    if (zuLesenderText) {
      const texte: string[] = zuLesenderText.match(/(\S+\s){1,20}/g);

      texte.forEach(text => {
          const vorleser: SpeechSynthesisUtterance = this.erzeugeVorleser(text);
          Logger.infoMessage("speaker lang used:" + vorleser.lang);
          Logger.infoMessage("speaker voice used:" + vorleser.voice.name);
          Logger.infoMessage("speaker voice lang:" + vorleser.voice.lang);
          this.sprachSynthese.speak(vorleser);
        }
      );

    }
  }

}


