import {EventEmitter} from "@stencil/core";
import {Logger} from "./log-helper";

class Synthese {
  sprachSynthese: SpeechSynthesis;
  voices: SpeechSynthesisVoice[];

  constructor() {
    this.sprachSynthese = window.speechSynthesis;
    this.sprachSynthese.onvoiceschanged = () => {
      if (!this.voices || this.voices.length < 1) {
        this.voices = this.sprachSynthese.getVoices();
        Logger.infoMessage("voices changed to: " + this.voices.join(","));
      } else {
        Logger.infoMessage("voices alraedy initialized");
      }
    };
    Logger.infoMessage("call getVoices()");
    this.sprachSynthese.getVoices();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
}


export class Sprachausgabe {

  static synthese: Synthese = new Synthese();

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
    this.speakerStarted = speakerStarted;
    this.speakerFinished = speakerFinished;
    this.speakerPaused = speakerPaused;
    this.speakerFailed = speakerFailed;
    this.audioLang = audioLang;
    this.audioPitch = audioPitch;
    this.audioRate = audioRate;
    this.audioVolume = audioVolume;
    this.voiceName = voiceName;
    this.stimme = undefined;
    Logger.infoMessage("####constructor finished");
  }

  protected getDefaultStimme(): SpeechSynthesisVoice {
    var namedMatch: SpeechSynthesisVoice;
    var langMatches: SpeechSynthesisVoice[] = [];
    var langDefaultMatch: SpeechSynthesisVoice;
    var defaultMatch: SpeechSynthesisVoice;

    const voices = Sprachausgabe.synthese.getVoices();
    if(!voices) return null;
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === this.voiceName ||
        voices[i].lang === this.audioLang ||
        voices[i].default
      ) {
        Logger.debugMessage("voice matched:" + voices[i].name + voices[i].lang);
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

  protected erzeugeVorleser(text: string): SpeechSynthesisUtterance {
    Logger.infoMessage("erzeugeVorleser started");
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

  public async textVorlesen(zuLesenderText: string) {
    if (!this.stimme) {
      this.stimme = this.getDefaultStimme();
      Logger.infoMessage("set default voice to " + this.stimme);
    }
    if (zuLesenderText) {
      const texte: string[] = zuLesenderText.match(/(\S+\s){1,20}/g);

      texte.forEach(text => {
          const vorleser: SpeechSynthesisUtterance = this.erzeugeVorleser(text);
          Logger.infoMessage("speaker lang used:" + vorleser.lang);
          if (vorleser.voice) {
            Logger.infoMessage("speaker voice used:" + vorleser.voice.name);
            Logger.infoMessage("speaker voice lang:" + vorleser.voice.lang);
          } else {
            Logger.infoMessage("no voice matched for text: " + zuLesenderText);
          }
          Sprachausgabe.synthese.sprachSynthese.speak(vorleser);
        }
      );

    }
  }

}


