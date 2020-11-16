import {Logger} from "./logger";
import {Synthese} from "./sprachsynthese";

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

  onSpeakerResume: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;

  onSpeakerFailed: ((this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) | null;

  constructor(
    onSpeakerStarted: (ev: SpeechSynthesisEvent) => void
    , onSpeakerFinished: (ev: SpeechSynthesisEvent) => void
    , onSpeakerPaused: (ev: SpeechSynthesisEvent) => void
    , onSpeakerResume: (ev: SpeechSynthesisEvent) => void
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
    this.onSpeakerResume = (ev) => onSpeakerResume(ev);
    this.onSpeakerFailed = (ev) => onSpeakerFailed(ev);
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
    Logger.infoMessage("Found voices:" + JSON.stringify(voices));


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
    vorleser.onresume = this.onSpeakerResume;
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
      // Auftrennung in Textblöcken nach Sprachen.
      // const texte: string[] = zuLesenderText.match(/(\S+[\s.]){1,20}/g);

      const vorleser: SpeechSynthesisUtterance = this.erzeugeVorleser(zuLesenderText);
      Logger.infoMessage("speaker lang used:" + vorleser.lang);
      if (vorleser.voice) {
        Logger.infoMessage("speaker voice used:" + vorleser.voice.name);
        Logger.infoMessage("speaker voice lang:" + vorleser.voice.lang);
      } else {
        Logger.infoMessage("no voice matched for text: " + zuLesenderText);
      }
      Sprachausgabe.synthese.sprachSynthese.speak(vorleser);
    }
  }


  public pause(): void {
    Sprachausgabe.synthese.sprachSynthese.pause();
  }

  public resume(): void {
    Sprachausgabe.synthese.sprachSynthese.resume();
  }

  public cancel(): void {
    Sprachausgabe.synthese.sprachSynthese.cancel();
  }

}


