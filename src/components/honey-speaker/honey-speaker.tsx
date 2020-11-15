import {Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch} from "@stencil/core";
import {Sprachausgabe} from "../../libs/sprachausgabe"
import {Logger} from "../../libs/logger";
import {Fileloader} from "../../libs/fileloader";
import {SpeakerOptions} from "./speaker-options";


@Component({
  tag: "honey-speaker",
  styleUrl: "honey-speaker.css",
  assetsDirs: ['assets'],
  shadow: true
})
export class HoneySpeaker {

  sprachAusgabe: Sprachausgabe;

  @State() options: SpeakerOptions = {
    disabledTitleText: "Vorlesen deaktiviert, da keine Texte verfügbar",
    pressedTitleText: "Liest gerade vor",
    unpressedTitleText: "Vorlesen",
    pressedAltText: "Symbol eines stummen Lautsprechers",
    unpressedAltText: "Symbol eines tönenden Lautsprechers"
  };

  /**
   * Host Element
   */
  @Element() hostElement: HTMLElement;

  /**
   * Id des Host Elements, falls nicht verfügbar wird diese generiert
   */
  ident: string;

  /**
   * true wenn das Tag ohne alt Attribute deklariert wurde
   */
  createAltText: boolean = false;

  /**
   * true wenn das Tag ohne title Attribut deklariert wurde
   */
  createTitleText: boolean = false;

  /**
   * taborder
   */
  taborder: string = "0";

  /**
   * texte to speech out
   */
  @State() texts: string[] = [];


  /**
   * if the toggle button is pressed
   */
  @State() isPressed: boolean = false;

  /**
   * use pure speaker symbol for silence state
   */
  @Prop() pure: boolean = false;

  /**
   * An comma separated list  with ids of DOM elements
   * which inner text should be speech.
   */
  @Prop({mutable: true}) textids: string;

  /**
   * An url to download an text file to speech.
   */
  @Prop({mutable: true}) texturl: string;

  /**
   * enable console logging
   */
  @Prop() verbose: boolean = false;


  /**
   * icon width
   */
  @Prop() iconwidth: string = "36";

  /**
   * icon height
   */
  @Prop() iconheight: string = "36";

  /**
   * i18n language ident for Web Speech API: de-DE or en or de ...
   */
  @Prop() audiolang: string = "de-DE";

  /**
   * pitch for Web Speech API
   */
  @Prop() audiopitch: number = 1;

  /**
   * rate for Web Speech API
   */
  @Prop() audiorate: number = 1;

  /**
   * volume for Web Speech API
   */
  @Prop() audiovolume: number = 1;

  /**
   * voice name used of Web Speech API
   */
  @Prop() voicename: string = undefined;


  /**
   * Fired if the voice is speaking.
   */
  @Event({bubbles: true, composed: true}) honeySpeakerStarted: EventEmitter<string>;

  /**
   * Fired if the voice has finished with speaking.
   */
  @Event({bubbles: true, composed: true}) honeySpeakerFinished: EventEmitter<string>;

  /**
   * Fired if the voice is paused with speaking.
   */
  @Event({bubbles: true, composed: true}) honeySpeakerPaused: EventEmitter<string>;

  /**
   * Fired if the voice is resumed after paused with speaking.
   */
  @Event({bubbles: true, composed: true}) honeySpeakerResume: EventEmitter<string>;

  /**
   * Fired if the voice has failed to speak.
   */
  @Event({bubbles: true, composed: true}) honeySpeakerFailed: EventEmitter<string>;

  public connectedCallback() {
    // States initialisieren
    this.ident = this.hostElement.id ? this.hostElement.id : Math.random().toString(36).substring(7);
    this.createTitleText = !this.hostElement.title;
    this.createAltText = !this.hostElement["alt"];
    this.taborder = this.hostElement.getAttribute("tabindex") ? (this.hostElement.tabIndex + "") : "0";
    // Properties auswerten
    Logger.toggleLogging(this.verbose);
  }


  public async componentWillLoad() {
    this.sprachAusgabe = new Sprachausgabe(
      () => {
        this.isPressed = true;
        this.honeySpeakerStarted.emit(this.ident);
        Logger.debugMessage("Vorlesen gestartet");
      },
      () => {
        this.isPressed = false;
        this.honeySpeakerFinished.emit(this.ident);
        Logger.debugMessage("Vorlesen beendet");
      },
      () => {
        this.isPressed = false;
        this.honeySpeakerPaused.emit(this.ident);
        Logger.debugMessage("Pause mit Vorlesen");
      },
      () => {
        this.isPressed = true;
        this.honeySpeakerResume.emit(this.ident);
        Logger.debugMessage("Fortsetzen mit Vorlesen");
      },
      (ev): void => {
        this.isPressed = false;
        this.honeySpeakerFailed.emit(this.ident);
        Logger.errorMessage("Fehler beim Vorlesen" + JSON.stringify(ev));
      },
      this.audiolang,
      this.audiopitch,
      this.audiorate,
      this.audiovolume,
      this.voicename
    );

    await this.updateTexte();
  }

  /**
   * Update speaker options
   * @param options : SpeakerOptions plain object to set the options
   */
  @Method()
  public async updateOptions( options: SpeakerOptions){
    for (let prop in options) {
      if( options.hasOwnProperty(prop) ){
        this.options[prop] = options[prop];
      }
    }
    this.options = {... this.options};
  }

  /**
   * paused the speaker
   */
  @Method()
  public async pauseSpeaker() {
    this.isPressed = true;
    this.sprachAusgabe.pause();
  }

  /**
   * continue speaker after paused
   */
  @Method()
  public async resumeSpeaker() {
    this.isPressed = false;
    this.sprachAusgabe.resume();
  }

  /**
   * cancel the speaker
   */
  @Method()
  public async cancelSpeaker() {
    this.isPressed = false;
    this.sprachAusgabe.cancel();
  }

  /**
   * call the toggle speaker action
   */
  @Method()
  public async toggleSpeaker() {
    this.toggleAction();
  }

  protected hasNoTexts(): boolean {
    return (!this.texts
      || this.texts.length < 1
      || this.texts.filter(item => item.trim().length > 0).length < 1
    );
  }

  protected createNewTitleText(): string {
    if (this.hasNoTexts()) {
      return this.options.disabledTitleText;
    }
    if (this.isPressed) {
      return this.options.pressedTitleText;
    } else {
      return this.options.unpressedTitleText;
    }
  }

  protected getTitleText(): string {
    if (this.createTitleText) {
      return this.createNewTitleText();
    } else {
      return this.hostElement.title;
    }
  }

  protected createNewAltText(): string {
    if (this.isPressed) {
      return this.options.pressedAltText;
    } else {
      return this.options.unpressedAltText;
    }
  }

  protected getAltText(): string {
    if (this.createAltText) {
      return this.createNewAltText();
    } else {
      return this.hostElement.getAttribute("alt");
    }
  }

  protected loadDOMElementTexte(): void {
    if (this.textids) {
      const refIds: string[] = this.textids.split(",");
      refIds.forEach(elementId => {
        const element: HTMLElement = document.getElementById(elementId);
        if (element) {
          this.texts = [...this.texts, element.innerText];
        } else {
          Logger.errorMessage("text to speak not found of DOM element with id " + elementId);
        }
      });
    }
  }

  protected async loadAudioUrlText() {
    if (this.texturl) {
      Logger.debugMessage("audioURL: " + this.texturl);
      const audioData: string = await Fileloader.loadData(this.texturl);
      if (audioData) {
        this.texts = [...this.texts, audioData];
      }
      Logger.debugMessage('###Texte###' + this.texts);
    }
  }

  protected async updateTexte() {
    this.texts = [];
    this.loadDOMElementTexte();
    await this.loadAudioUrlText()
  }

  @Watch('textids')
  textidsChanged(newValue: string, oldValue: string) {
    Logger.debugMessage("textids changed from" + oldValue + " to " + newValue);
    this.updateTexte();
  }

  @Watch('texturl')
  async texturlChanged(newValue: string, oldValue: string) {
    this.texturl = newValue;
    Logger.debugMessage("texturl changed from" + oldValue + " to " + newValue);
    await this.updateTexte();
  }

  protected getTexte(): string[] {
    if (this.texts) {
      return this.texts;
    } else {
      return [];
    }
  }

  protected async textVorlesen(text: string) {
    this.isPressed = true;
    await this.sprachAusgabe.textVorlesen(text + " ")
  }

  protected toggleAction() {
    Logger.debugMessage("###TOGGLE TO" + this.isPressed);
    this.isPressed = !this.isPressed;
    if (this.isPressed) {
      const texte: string[] = this.getTexte();
      texte.forEach(async text => {
          // kein await nutzen, damit das vorlesen unterbrochen werden kann
          this.textVorlesen(text);
        }
      );
    } else {
      this.sprachAusgabe.cancel();
    }
  }

  @Listen('click', {capture: true})
  protected onClick(): void {
    if (this.hasNoTexts()) return;

    this.toggleAction();
  }

  @Listen('keydown', {capture: true})
  protected onKeyDown(ev: KeyboardEvent): void {
    if (this.hasNoTexts()) return;

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.toggleAction();
    }
  }


  public render() {
    Logger.debugMessage('##RENDER##');
    return (
      <Host
        title={this.getTitleText()}
        alt={this.getAltText()}
        role="button"
        tabindex={this.hasNoTexts() ? -1 : this.taborder}
        aria-pressed={this.isPressed ? "true" : "false"}
        disabled={this.hasNoTexts()}
      >
        {this.isPressed ? (
          <svg id={this.ident + "-svg"} xmlns="http://www.w3.org/2000/svg"
               width={this.iconwidth} height={this.iconheight}
               role="img"
               aria-label={this.getAltText()}
               class={this.hasNoTexts() ? "speakerimage-disabled" : "speakerimage"}
               viewBox="0 0 75 75">
            <path
              stroke-linejoin="round"
              d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z">
            </path>
            <path
              id="air"
              fill="none" stroke-linecap="round"
              d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6">

              <animate id="airanimation" attributeType="CSS" attributeName="opacity" from="1" to="0" dur="1s"
                       repeatCount="indefinite"/>

            </path>
          </svg>
        ) : (
          <svg id={this.ident + "-svg"} xmlns="http://www.w3.org/2000/svg"
               width={this.iconwidth} height={this.iconheight}
               role="img"
               aria-label={this.getAltText()}
               class={this.hasNoTexts() ? "speakerimage-disabled" : "speakerimage"}
               viewBox="0 0 75 75">
            <path
              stroke-linejoin="round"
              d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z">
            </path>
            {this.pure ? (
              <text id="eins" x="60%" y="55%">OFF</text>
            ) : (
              <path
                id="air"
                fill="none" stroke-linecap="round"
                d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6">
              </path>
            )}
          </svg>
        )}
      </Host>
    );
  }
}
