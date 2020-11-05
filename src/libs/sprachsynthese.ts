import {Logger} from "./logger";


export class Synthese {
  sprachSynthese: SpeechSynthesis;
  voices: SpeechSynthesisVoice[];

  constructor() {
    this.sprachSynthese = window.speechSynthesis;
    this.sprachSynthese.onvoiceschanged = () => {
      if (!this.voices || this.voices.length < 1) {
        this.voices = this.sprachSynthese.getVoices();
        Logger.debugMessage("voices changed to: " + this.voices.join(","));
      } else {
        Logger.debugMessage("voices alraedy initialized");
      }
    };
    Logger.debugMessage("call getVoices()");
    this.sprachSynthese.getVoices();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public cancel(): void {
    this.sprachSynthese.cancel();
  }
}
