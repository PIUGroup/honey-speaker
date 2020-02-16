"use strict";

import {Component, Prop, h, Listen} from "@stencil/core";
import {Sprachausgabe} from "./speech-output"

@Component({
  tag: "honey-speech",
  styleUrl: "honey-speech.css",
  shadow: true
})
export class HoneySpeech {

  /**
   * The id of text element to speech
   */
  @Prop() textref: string;

  private getText(): string {
    if (this.textref) {
      return document.getElementById(this.textref).innerText;
    } else {
      return "Kein Text vorhanden, daher keine Ausgabe möglich."
    }
  }


  @Listen('click', {capture: true})
  protected handleClick() {
    const stimme: Sprachausgabe = new Sprachausgabe();
    stimme.textVorlesen(this.getText());
  }

  render() {
    // return <button class="buttonimage" ></button>;
    return <input type="image" src={"../../assets/img/Speaker_Icon.svg"} name="id-input"
                  title={"Vorlesen"}
                  height="36" width="113" alt="Symbol eines sprechenden Lautsprechers"></input>
  }
}
