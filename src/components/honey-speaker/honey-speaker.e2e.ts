import {newE2EPage} from '@stencil/core/testing';
import {E2EElement, E2EPage} from "@stencil/core/testing/puppeteer/puppeteer-declarations";
import {Logger} from "../../libs/logger";

class TestLogger extends Logger {

}

describe('E2E Wrapper: voice tests of speaker', () => {


  const skippen = async () => {
    // Property Wert lesen
    const page = await newE2EPage({html: `<honey-speaker verbose audiolang="en" textids="3"></honey-speaker><p id="3">test</p>`});
    const stimmenAnzahl = await page.$eval('honey-speaker', () => {
      return speechSynthesis.getVoices().length;
    });
    // return true || stimmenAnzahl < 1;
    return stimmenAnzahl ? stimmenAnzahl < 1 : true;
  }

  let skipTests: boolean;
  beforeAll(async () => {
    skipTests = await skippen();
  });


  (skipTests ? xdescribe : describe)('E2E: voice tests of speaker', () => {

    let page: E2EPage;
    let element: E2EElement;

    beforeEach(async () => {
      TestLogger.enableLogging();
      page = await newE2EPage({html: `<honey-speaker verbose audiolang="en" textids="3"></honey-speaker><p id="3">test</p>`});
      element = await page.find('honey-speaker');
    });

    it('fire event honeySpeakerStarted', async () => {
      const startedEvent = await page.spyOnEvent('honeySpeakerStarted');
      await element.setProperty('audiolang', 'us');
      await page.waitForChanges();
      await page.click('honey-speaker');
      await page.waitForEvent('honeySpeakerStarted');
      expect(startedEvent).toHaveReceivedEvent();
    });

  });
});

