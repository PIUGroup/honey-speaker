[![Build Status](https://travis-ci.org/Huluvu424242/honey-speaker.svg?branch=master)](https://travis-ci.org/Huluvu424242/honey-speaker)
![Github CI](https://github.com/Huluvu424242/honey-speaker/workflows/Github%20CI/badge.svg)
[![npm](https://img.shields.io/npm/v/@huluvu424242/honey-speaker.svg)](https://www.npmjs.com/package/@huluvu424242/honey-speaker)
[![npm](https://img.shields.io/npm/dm/@huluvu424242/honey-speaker.svg)](https://www.npmjs.com/package/@huluvu424242/honey-speaker)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@huluvu424242/honey-speaker)
[![Donate with paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/huluvu424242)
![Keybase BTC](https://img.shields.io/keybase/btc/huluvu424242)
# honey-speaker 
This component realize an speaker symbol button. Its can read a text of
DOM elements referenced by an list of ids via voice.

## installation

npm install --save honey-speaker

## usage

```html
<script 
    type="module" 
    src='https://unpkg.com/@huluvu424242/honey-speaker@0.0.18/dist/honey-speaker/honey-speaker.js'>
</script>
```
To the [demo site](https://huluvu424242.github.io/honey-speaker/index.html)

[Vision of API (under construction)](src/components/honey-speaker/readme.md)

## demo

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="docs/index.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<honey-speaker textids="text1,text2"></honey-speaker>
<p id="text1">fizz fizz fizz fizz</p>
<p id="text2">buzz buzz buzz buzz</p>
```
To the [live demo](https://huluvu424242.github.io/honey-speaker/index.html)

## become an supporter

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## releaselog

### v0.0.19 unpublished

* bug and feature description

### v0.0.18 published at 2020-11-22

* [issue 43](https://github.com/Huluvu424242/honey-speaker/issues/42) minor bugfixing and refactoring


### v0.0.17 published at 2020-11-16

* [issue 39](https://github.com/Huluvu424242/honey-speaker/issues/39) text splitting removed


### v0.0.16 published at 2020-11-15

* [issue 35](https://github.com/Huluvu424242/honey-speaker/issues/35) change host classes depends of disabled or enabled
* [issue 33](https://github.com/Huluvu424242/honey-speaker/issues/33) A11y config properties added
* [issue 32](https://github.com/Huluvu424242/honey-speaker/issues/32) sync method call and symbol fixed


### v0.0.15 published at 2020-11-08 

* [issue 26](https://github.com/Huluvu424242/honey-speaker/issues/26) method pause and resume added
* [issue 25](https://github.com/Huluvu424242/honey-speaker/issues/25) remove dependency of rxjs -> use fetch of es6
* [issue 24](https://github.com/Huluvu424242/honey-speaker/issues/24) remove subscription and use async/await pairs
* [issue 23](https://github.com/Huluvu424242/honey-speaker/issues/23) mutable attributes textids and texturl


### v0.0.14 published at 2020-11-06

* [issue 17](https://github.com/Huluvu424242/honey-speaker/issues/17) reading text from url added


### v0.0.13 published at 2020-11-06

* initializing of voices fixed
* [issue 2](https://github.com/Huluvu424242/honey-speaker/issues/2) e2e tests fixed
* css support of ::part removed (to complex for end user)
* a11y: tabindex=0, keydown: space and enter, role="button", alt text, svg role="img"
* speaker realized as toggle button
* custom css attribute names changed

### v0.0.12 published at 2020-02-29

* docu and demo urls fixed

### v0.0.11 published at 2020-02-29

* support of voice parameter

### v0.0.10 published at 2020-02-28

* support for large texts added
* defined css variables supported
* css ::part supported for speakerpane 
* svg embed - no extra assets needed
* sizeable via css
* color of background, stroke and fill css styleable 
* ident property computed from id attribute or random if absent 
* example added
* stencil/core removed from bundle again (no storybook support at now)
 
### v0.0.9 published at 2020-02-23

* stencil/core added to bundle

### v0.0.8

* readme updated
* icon color blue
* background color attribute added

### v0.0.7

* first working version with icon.
* support of id list of speaker texts.

### v0.0.2 - v0.0.6 

* try to publish assets with component to npmjs.com but failed.

### v0.0.1

* setup project based at https://github.com/ionic-team/stencil-component-starter rating-stencil-component

## internet links

* https://auth0.com/blog/creating-web-components-with-stencil/
* https://www.twilio.com/blog/2018/02/creating-and-publishing-web-components-with-stencil.html
* https://stenciljs.com/docs/introduction
* https://css-tricks.com/styling-a-web-component/
* https://meowni.ca/posts/part-theme-explainer/


## warranty

no warranty

## license

MIT License

## technology used

* [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
* [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements)
* [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
* [Shadow Parts](https://developer.mozilla.org/de/docs/Web/CSS/::part)


## browser support

### Web Speech API

Firefox

Maybe you must via about:config set media.webspeech.synth.enabled to true 

Generell

* [Can I use with browsers?](https://caniuse.com/#feat=speech-synthesis)

### Custom Elements

* [Can I use with browsers?](https://caniuse.com/#feat=mdn-api_window_customelements)

### CSS Custom Properties

* [Can I use with browsers?](https://caniuse.com/#search=css%20custom%20properties)

### Shadow Parts

Firefox

Maybe you must via about:config set the layout.css.shadow-parts.enabled to true.

Generell 

* [Can I use with browsers?](https://caniuse.com/#feat=mdn-css_selectors_part)
