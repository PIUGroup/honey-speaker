import {h} from "@stencil/core";

export class IconHelper {

  ident: string;
  width: string;
  height: string;

  constructor(ident: string, width: string, height: string) {
    this.ident = ident;
    this.width = width;
    this.height = height;
  }

  render() {
    return (
      <svg id={this.ident + "-svg"} xmlns="http://www.w3.org/2000/svg"
           width={this.width} height={this.height}
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
    );
  }
}
