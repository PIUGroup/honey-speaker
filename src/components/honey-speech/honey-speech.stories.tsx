"use strict";

// import {HoneySpeech} from "./honey-speech";
import {HoneySpeech} from "../../../dist/collection/components/honey-speech/honey-speech";

export default {
  title: 'Honey Speech Examples',
  component: HoneySpeech,
  includeStories: ["simpleStory", "complexStory"]
};

export const  simpleStory= () =>
  '<honey-speech textids="ok-button" titletext="Buttontext vorlesen"></honey-speech>' +
'<button id="ok-button" type="submit">OK</button>';

export const complexStory = () =>
  '<div>' +
  '<honey-speech textids="text1,text2" titletext="Alle vorlessen"></honey-speech>' +
  '<p id="text1">Das ist der erste Text</p><honey-speech textids="text1" titletext="Text1 vorlesen"></honey-speech>' +
  '<p id="text2">Das ist der zweite Text</p><honey-speech textids="text2" titletext="Text2 vorlesen"></honey-speech>' +
  '</div>'
;
//
//
// export const Heading = () => '<h1>Hello World</h1>';
//
// export const Button = () => {
//   const btn = document.createElement('button');
//   btn.type = 'button';
//   btn.innerText = 'Hello Button';
//   btn.addEventListener('click', e => console.log(e));
//   return btn;
// };
//
//
// export const withText = () => '<button class="btn">Hello World</button>';
//
// export const withEmoji = () => {
//   const button = document.createElement('button');
//   button.innerText = '😀 😎 👍 💯';
//   return button;
// };
