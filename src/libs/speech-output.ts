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


  onSpeakerStarted: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;

  onSpeakerFinished: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;

  onSpeakerPaused: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;

  onSpeakerFailed: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;

  constructor(onSpeakerStarted: (ev: SpeechSynthesisEvent) => void
    , onSpeakerFinished: (ev: SpeechSynthesisEvent) => void
    , onSpeakerPaused: (ev: SpeechSynthesisEvent) => void
    , onSpeakerFailed: (ev: SpeechSynthesisEvent) => void
    , audioLang: string
    , audioPitch: number
    , audioRate: number
    , audioVolume: number
    , voiceName: string
  ) {
    this.onSpeakerStarted = (ev) => onSpeakerStarted(ev);
    this.onSpeakerFinished = (ev) => onSpeakerFinished(ev);
    this.onSpeakerPaused = (ev) => onSpeakerPaused(ev);
    this.onSpeakerFailed = function (ev) {
      Logger.errorMessage('###' + ev['error']);
      onSpeakerFailed(ev);
    };
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
    if (!voices) return null;
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

    vorleser.onend = this.onSpeakerFinished;
    vorleser.onstart = this.onSpeakerStarted;
    vorleser.onpause = this.onSpeakerPaused;
    vorleser.onerror = this.onSpeakerFailed;

    vorleser.pitch = this.audioPitch;
    vorleser.rate = this.audioRate;
    vorleser.volume = this.audioVolume;
    vorleser.voice = this.stimme;
    vorleser.lang = this.audioLang;
    return vorleser;
  }

  public textVorlesen(zuLesenderText: string) {
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


