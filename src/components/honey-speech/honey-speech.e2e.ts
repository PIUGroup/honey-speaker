import {newE2EPage} from '@stencil/core/testing';
import {E2EElement, E2EPage} from "@stencil/core/testing/puppeteer/puppeteer-declarations";
import {Logger} from "../../libs/logger";

class TestLogger extends Logger {

}

describe('example', () => {

  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    TestLogger.enableLogging();
    page = await newE2EPage({html: `<honey-speech enable-logging audiolang="en" textids="3"></honey-speech><p id="3">test</p>`});
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
    const lang = await element.getProperty('audiolang');
    expect(lang).toEqual('en');
    await element.setProperty('audiolang', 'us');
    await page.waitForChanges();
    const value = await element.getProperty("audiolang")
    expect(value).toEqual( 'us');
  });

  it('fire event honeySpeakerStarted', async () => {

    // Property Wert lesen
    const stimmenAnzahl  = await page.$eval('honey-speech', () => {
     return speechSynthesis.getVoices().length;
    });
    if( stimmenAnzahl <1){
      TestLogger.logMessage("Keine Stimmen im Browser verfügbar -> Test übersprungen");
      return;
    }else{
      TestLogger.logMessage("Stimmen gefunden - Test wird ausgeführt");
    }
    const startedEvent = await page.spyOnEvent('honeySpeakerStarted');
    await element.setProperty('audiolang', 'us');
    await page.waitForChanges();
    await page.click('honey-speech');
    await page.waitForEvent('honeySpeakerStarted');
    expect(startedEvent).toHaveReceivedEvent();
  });

});



