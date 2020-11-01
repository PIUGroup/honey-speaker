import {Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State} from "@stencil/core";
import {Sprachausgabe} from "../../libs/speech-output"
import {Logger} from "../../libs/log-helper";

@Component({
  tag: "honey-speech",
  styleUrl: "honey-speech.css",
  assetsDirs: ['assets'],
  shadow: true
})
export class HoneySpeech {

  sprachAusgabe: Sprachausgabe;


  /**
   * Host Element
   */
  @Element() hostElement: HTMLElement;

  /**
   * Id des Host Elements, falls nicht verfügbar wird diese generiert
   */
  @State() ident: string;

  /**
   * alt text for a11y
   * default: "Lautsprechersymbol zur Sprachausgabe"
   */
  @State() alttext: string;

  /**
   * title text for a11y = tooltip
   * default: Vorlesen
   */
  @State() titletext: string;


  /**
   * An comma separated list  with ids of DOM elements
   * which inner text should be speech.
   */
  @Prop() textids!: string;


  /**
   * icon width
   * default: 36
   */
  @Prop() iconwidth: string;

  /**
   * icon height, default: 36
   * @param iconheight
   * @default 36
   */
  @Prop() iconheight: string;

  /**
   * i18n language ident for Web Speech API: de-DE or en or de ...
   */
  @Prop() audiolang: string;

  /**
   * pitch for Web Speech API: default: 1
   */
  @Prop() audiopitch: number;

  /**
   * rate for Web Speech API: default 1
   */
  @Prop() audiorate: number;

  /**
   * volume for Web Speech API: default 1
   */
  @Prop() audiovolume: number;

  /**
   * voice name used of Web Speech API: default undefined
   */
  @Prop() voicename: string;

  // /**
  //  * An JSON Object with i18n text values separeted by language idents:
  //  * currently unused
  //  *
  //  * { "deDE" : { "error": "Fehler}, "en" : { "error" : "Error"}}
  //  */
  // @Prop() i18n: object;

  /**
   * Fired if the stimme is speaking.
   */
  @Event({bubbles: true, composed: true}) speakerStarted: EventEmitter<string>;

  /**
   * Fired if the stimme has finished with speaking.
   */
  @Event({bubbles: true, composed: true}) speakerFinished: EventEmitter<string>;

  /**
   * Fired if the stimme is paused with speaking.
   */
  @Event({bubbles: true, composed: true}) speakerPaused: EventEmitter<string>;

  /**
   * Fired if the stimme has failed to speak.
   */
  @Event({bubbles: true, composed: true}) speakerFailed: EventEmitter<string>;

  connectedCallback() {
    this.ident = this.hostElement.id ? this.hostElement.id : Math.random().toString(36).substring(7);
    this.titletext = this.hostElement.title ? this.hostElement.title : "Vorlesen";
    this.alttext = this.hostElement["alt"] ? this.hostElement["alt"] : "Lautsprechersymbol zur Sprachausgabe";
    if (!this.iconheight) this.iconheight = "500";
    if (!this.iconwidth) this.iconwidth = "500";
    if (!this.audiopitch) this.audiopitch = 1;
    if (!this.audiorate) this.audiorate = 1;
    if (!this.audiovolume) this.audiovolume = 1;

    this.sprachAusgabe = new Sprachausgabe(
      this.speakerStarted,
      this.speakerFinished,
      this.speakerPaused,
      this.speakerFailed,
      this.audiolang,
      this.audiopitch,
      this.audiorate,
      this.audiovolume,
      this.voicename
    );
  }

  private getTexte(): string[] {
    if (this.textids) {
      const refIds: string[] = this.textids.split(",");
      const texte: string[] = [];
      refIds.forEach(elementId => {
          const element: HTMLElement = document.getElementById(elementId);
          if (element) {
            texte.push(element.innerText);
          } else {
            Logger.errorMessage("text to speak not found of DOM element with id " + elementId);
          }
        }
      );
      return texte;
    } else {
      return ["Kein Text vorhanden, daher keine Ausgabe möglich."];
    }
  }

  @Listen('click', {capture: true})
  protected handleClick() {
    const texte: string[] = this.getTexte();

    texte.forEach(text =>
      this.sprachAusgabe.textVorlesen(text + " ")
    );
  }

  getId(): string {
    return this.ident;
  }

  render() {
    return (
      <Host
        title={this.titletext}
        alt={this.alttext}
      >
        <svg id={this.getId() + "-svg"} xmlns="http://www.w3.org/2000/svg"
             width={this.iconwidth} height={this.iconheight}
             class="speakerimage"
             viewBox="0 0 75 75">
          <path
            stroke-width="5" stroke-linejoin="round"
            d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
          />
          <path
            stroke="var(--speaker-color,black);" fill="none" stroke-width="5" stroke-linecap="round"
            d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
          />
        </svg>
      </Host>
    );
  }
}
