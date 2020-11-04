import {newE2EPage} from '@stencil/core/testing';
import {E2EElement, E2EPage} from "@stencil/core/testing/puppeteer/puppeteer-declarations";

describe('example', () => {

  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({html: `<honey-speech audiolang="en" textids="3"></honey-speech><p id="3">test</p>`});
    element = await page.find('honey-speech');
  });

  it('should render a component', async () => {
    expect(element).not.toBeNull();
  });

  it('renders correct styles', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('has a11y attributes', async () => {
    expect(element).toEqualAttribute('title', 'Vorlesen');
    expect(element).toEqualAttribute('alt', 'Lautsprechersymbol zur Sprachausgabe');
  });

  it('has correct audio properties', async () => {
    // Property Wert setzen
    // await page.$eval('honey-speech', (elm: any) => {
    //   elm.audiolang = 'us';
    // });
    await element.setProperty('audiolang', 'us');
    await page.waitForChanges();
    const value = await element.getProperty("audiolang")
    expect(value).toEqual( 'us');
  });

  it('fire events', async () => {

    // Property Wert lesen
    const stimmenAnzahl  = await page.$eval('honey-speech', () => {
     return speechSynthesis.getVoices().length;
    });
    if( stimmenAnzahl <1){
      console.log("Keine Stimmen im Browser verfügbar -> Test übersprungen");
      return;
    }else{
      console.log("Stimmen gefunden - Test wird ausgeführt");
    }
    const startedEvent = await page.spyOnEvent('honeySpeakerStarted');
    await element.setProperty('audiolang', 'us');
    await page.waitForChanges();
    await page.click('honey-speech');
    await page.waitForEvent('honeySpeakerStarted');
    expect(startedEvent).toHaveReceivedEvent();
  });

});


// xdescribe('honey-speech', () => {
//
//
//   it('renders changes to the name data', async () => {
//     const page = await newE2EPage();
//
//     await page.setContent('<honey-speech></honey-speech>');
//     const component = await page.find('honey-speech');
//     const element = await page.find('honey-speech >>> div');
//     expect(element.textContent).toEqual(`Hello, World! I'm `);
//
//     component.setProperty('first', 'James');
//     await page.waitForChanges();
//     expect(element.textContent).toEqual(`Hello, World! I'm James`);
//
//     component.setProperty('last', 'Quincy');
//     await page.waitForChanges();
//     expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);
//
//     component.setProperty('middle', 'Earl');
//     await page.waitForChanges();
//     expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
//   });
// });
