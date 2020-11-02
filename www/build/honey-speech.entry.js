import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d00a3863.js';

class Logger {
  static logMessage(message) {
    console.log(message);
  }
  static debugMessage(message) {
    console.debug(message);
  }
  static errorMessage(message) {
    console.error(message);
  }
  static infoMessage(message) {
    console.info(message);
  }
}

class Synthese {
  constructor() {
    this.sprachSynthese = window.speechSynthesis;
    this.sprachSynthese.onvoiceschanged = () => {
      if (!this.voices || this.voices.length < 1) {
        this.voices = this.sprachSynthese.getVoices();
        Logger.infoMessage("voices changed to: " + this.voices.join(","));
      }
      else {
        Logger.infoMessage("voices alraedy initialized");
      }
    };
    Logger.infoMessage("call getVoices()");
    this.sprachSynthese.getVoices();
  }
  getVoices() {
    return this.voices;
  }
}
class Sprachausgabe {
  constructor(onSpeakerStarted, onSpeakerFinished, onSpeakerPaused, onSpeakerFailed, audioLang, audioPitch, audioRate, audioVolume, voiceName) {
    this.onSpeakerStarted = onSpeakerStarted;
    this.onSpeakerFinished = onSpeakerFinished;
    this.onSpeakerPaused = onSpeakerPaused;
    this.onSpeakerFailed = onSpeakerFailed;
    this.audioLang = audioLang;
    this.audioPitch = audioPitch;
    this.audioRate = audioRate;
    this.audioVolume = audioVolume;
    this.voiceName = voiceName;
    this.stimme = undefined;
    Logger.infoMessage("####constructor finished");
  }
  getDefaultStimme() {
    var namedMatch;
    var langMatches = [];
    var langDefaultMatch;
    var defaultMatch;
    const voices = Sprachausgabe.synthese.getVoices();
    if (!voices)
      return null;
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === this.voiceName ||
        voices[i].lang === this.audioLang ||
        voices[i].default) {
        Logger.debugMessage("voice matched:" + voices[i].name + voices[i].lang);
        if (voices[i].name === this.voiceName) {
          namedMatch = voices[i];
        }
        if (voices[i].lang === this.audioLang &&
          voices[i].default) {
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
  erzeugeVorleser(text) {
    Logger.infoMessage("erzeugeVorleser started");
    const vorleser = new SpeechSynthesisUtterance(text);
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
  async textVorlesen(zuLesenderText) {
    if (!this.stimme) {
      this.stimme = this.getDefaultStimme();
      Logger.infoMessage("set default voice to " + this.stimme);
    }
    if (zuLesenderText) {
      const texte = zuLesenderText.match(/(\S+\s){1,20}/g);
      texte.forEach(text => {
        const vorleser = this.erzeugeVorleser(text);
        Logger.infoMessage("speaker lang used:" + vorleser.lang);
        if (vorleser.voice) {
          Logger.infoMessage("speaker voice used:" + vorleser.voice.name);
          Logger.infoMessage("speaker voice lang:" + vorleser.voice.lang);
        }
        else {
          Logger.infoMessage("no voice matched for text: " + zuLesenderText);
        }
        Sprachausgabe.synthese.sprachSynthese.speak(vorleser);
      });
    }
  }
}
Sprachausgabe.synthese = new Synthese();

const honeySpeechCss = ".speakerimage{background:var(--speaker-background, transparent);stroke:var(--speaker-color, blue);fill:var(--speaker-color, blue);padding:var(--speaker-padding, 5px);font-size:var(--speaker-font-size, medium);border:var(--speaker-border, 0);width:var(--speaker-width, 36px);height:var(--speaker-height, 36px)}";

const HoneySpeech = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.honeySpeakerStarted = createEvent(this, "honeySpeakerStarted", 7);
    this.honeySpeakerFinished = createEvent(this, "honeySpeakerFinished", 7);
    this.honeySpeakerPaused = createEvent(this, "honeySpeakerPaused", 7);
    this.honeySpeakerFailed = createEvent(this, "honeySpeakerFailed", 7);
  }
  connectedCallback() {
    // Properties initialisieren
    this.ident = this.hostElement.id ? this.hostElement.id : Math.random().toString(36).substring(7);
    this.titletext = this.hostElement.title ? this.hostElement.title : "Vorlesen";
    this.alttext = this.hostElement["alt"] ? this.hostElement["alt"] : "Lautsprechersymbol zur Sprachausgabe";
    if (!this.iconheight)
      this.iconheight = "500";
    if (!this.iconwidth)
      this.iconwidth = "500";
    if (!this.audiopitch)
      this.audiopitch = 1;
    if (!this.audiorate)
      this.audiorate = 1;
    if (!this.audiovolume)
      this.audiovolume = 1;
  }
  componentWillLoad() {
    this.sprachAusgabe = new Sprachausgabe(() => {
      this.honeySpeakerStarted.emit(this.ident);
      Logger.debugMessage("Vorlesen gestartet");
    }, () => {
      this.honeySpeakerFinished.emit(this.ident);
      Logger.debugMessage("Vorlesen beendet");
    }, () => {
      this.honeySpeakerPaused.emit(this.ident);
      Logger.debugMessage("Pause mit Vorlesen");
    }, () => {
      this.honeySpeakerFailed.emit(this.ident);
      Logger.errorMessage("Fehler beim Vorlesen");
    }, this.audiolang, this.audiopitch, this.audiorate, this.audiovolume, this.voicename);
  }
  getTexte() {
    if (this.textids) {
      const refIds = this.textids.split(",");
      const texte = [];
      refIds.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
          texte.push(element.innerText);
        }
        else {
          Logger.errorMessage("text to speak not found of DOM element with id " + elementId);
        }
      });
      return texte;
    }
    else {
      return ["Kein Text vorhanden, daher keine Ausgabe möglich."];
    }
  }
  onClick() {
    const texte = this.getTexte();
    texte.forEach(async (text) => await this.sprachAusgabe.textVorlesen(text + " "));
  }
  render() {
    return (h(Host, { title: this.titletext, alt: this.alttext }, h("svg", { id: this.ident + "-svg", xmlns: "http://www.w3.org/2000/svg", width: this.iconwidth, height: this.iconheight, class: "speakerimage", viewBox: "0 0 75 75" }, h("path", { "stroke-width": "5", "stroke-linejoin": "round", d: "M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" }), h("path", { stroke: "var(--speaker-color,black);", fill: "none", "stroke-width": "5", "stroke-linecap": "round", d: "M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" }))));
  }
  static get assetsDirs() { return ["assets"]; }
  get hostElement() { return getElement(this); }
};
HoneySpeech.style = honeySpeechCss;

export { HoneySpeech as honey_speech };
