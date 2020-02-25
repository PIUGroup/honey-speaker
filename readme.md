[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@huluvu424242/honey-speech)

# honey-speech

This component realize an speaker symbol button. Its can read a text of
DOM elements referenced by an list of ids via voice.

## installation

npm install --save honey-speech

## usage

```html
<script 
    type="module" 
    src='https://unpkg.com/@huluvu424242/honey-speech@0.0.9/dist/honey-speech/honey-speech.js'>
</script>
```
To the [demo site](https://funthomas424242.github.io/honey-speech-component/index.html)

[Vision of API (under construction)](src/components/honey-speech/readme.md)

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
<honey-speech textids="text1,text2"></honey-speech>
<p id="text1">fizz fizz fizz fizz</p>
<p id="text2">buzz buzz buzz buzz</p>
```
To the [live demo](https://funthomas424242.github.io/honey-speech-component/index.html)

## become an supporter

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## releaselog

### v0.0.10 unpublished

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