"use strict";

import {Component, Element, Event, EventEmitter, getAssetPath, h, Listen, Prop} from "@stencil/core";
import {Sprachausgabe} from "./speech-output"
import {Logger} from "./log-helper";

@Component({
  tag: "honey-speech",
  styleUrl: "honey-speech.css",
  assetsDirs: ['assets'],
  shadow: true
})
export class HoneySpeech {

  @Element() htmlElement: HTMLElement;


  /**
   * An comma separated list  with ids of DOM elements which inner text should be speech.
   */
  @Prop() textids!: string;

  /**
   * identifier prefix for input element
   * default: "honey-speech1"
   */
  @Prop({
    reflect: true,
    mutable: true
  }) ident: string;

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
   * icon source url
   * default: intern url "./assets/img/Speaker_Icon.svg"
   */
  @Prop() iconsrc: string;

  /**
   * iconbackground color
   */
  @Prop() iconbackground: string;

  /**
   * alt text for a11y
   * default: "Symbol eines sprechenden Lautsprechers"
   */
  @Prop() alttext: string;

  /**
   * title text for a11y
   * default: Vorlesen
   */
  @Prop() titletext: string;

  /**
   * i18n language ident: deDE or en or de ...
   */
  @Prop() langid: string;

  /**
   * An JSON Object with i18n text values separeted by language idents:
   *
   * { "deDE" : { "error": "Fehler}, "en" : { "error" : "Error"}}
   */
  @Prop() i18n: object;

  /**
   * Fired if the voice is speaking.
   */
  @Event() speakerStarted: EventEmitter;

  /**
   * Fired if the voice has finished with speaking.
   */
  @Event() speakerFinished: EventEmitter;

  /**
   * Fired if the voice is paused with speaking.
   */
  @Event() speakerPaused: EventEmitter;

  /**
   * Fired if the voice has failed to speak.
   */
  @Event() speakerFailed: EventEmitter;

  connectedCallback() {
    this.ident = this.htmlElement.id ? this.htmlElement.id : Math.random().toString(36).substring(7);
    if (!this.titletext) this.titletext = "Vorlesen";
    if (!this.alttext) this.alttext = "Symbol eines sprechenden Lautsprechers";

    if (!this.iconheight) this.iconheight = "36";
    if (!this.iconwidth) this.iconwidth = "36";
    if (!this.iconsrc) this.iconsrc = getAssetPath("./assets/img/Speaker_Icon.svg");
    // if (!this.iconstyle) this.iconstyle = "background-color:red";
  }

  componentDidLoad() {
    if (this.iconbackground) {
      const speaker: HTMLElement = this.htmlElement.shadowRoot.getElementById(this.getId() + "-input");
      speaker.style.backgroundColor = this.iconbackground;
    }
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
    const stimme: Sprachausgabe = new Sprachausgabe(
      this.speakerStarted,
      this.speakerFinished,
      this.speakerPaused,
      this.speakerFailed
    );
    const text = this.getTexte().join("\n");
    stimme.textVorlesen(text);
  }

  getId(): string {
    return this.ident;
  }

  render() {
    return (
      <input type="image"
             id={this.getId() + "-input"}
             name={this.getId() + "-input"}
             title={this.titletext}
             alt={this.alttext}
             src={this.iconsrc}
             height={this.iconheight}
             width={this.iconwidth}
             part={"buttonimage"}
      ></input>
    );
  }
}
