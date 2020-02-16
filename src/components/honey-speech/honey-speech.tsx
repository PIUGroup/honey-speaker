"use strict";

import {Component, Prop, h, Listen, Event, EventEmitter} from "@stencil/core";
import {Sprachausgabe} from "./speech-output"

@Component({
  tag: "honey-speech",
  styleUrl: "honey-speech.css",
  shadow: true
})
export class HoneySpeech {

  /**
   * An array with ids of DOM elements which inner text should be speech.
   */
  @Prop() textref: string;


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




  private getText(): string {
    if (this.textref) {
      return document.getElementById(this.textref).innerText;
    } else {
      return "Kein Text vorhanden, daher keine Ausgabe möglich."
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
    stimme.textVorlesen(this.getText());
  }

  render() {
    return <input type="image" src={"../../assets/img/Speaker_Icon.svg"} name="id-input"
                  title={"Vorlesen"}
                  height="36" width="113" alt="Symbol eines sprechenden Lautsprechers"></input>
  }
}
