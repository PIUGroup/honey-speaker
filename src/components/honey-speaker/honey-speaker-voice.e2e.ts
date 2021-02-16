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


  // (skipTests ? describe.skip : describe)('E2E: voice tests of speaker', () => {
  describe('E2E: voice tests of speaker', () => {

    let page: E2EPage;
    let element: E2EElement;

    beforeEach(async () => {
      TestLogger.enableLogging();
      page = await newE2EPage({html: `<honey-speaker verbose audiolang="en" textids="3"></honey-speaker><p id="3">test</p>`});
      element = await page.find('honey-speaker');
    });

    it('fire event honeySpeakerStarted', async () => {
      if(skipTests) return;

      const startedEvent = await page.spyOnEvent('honeySpeakerStarted');
      await element.setProperty('audiolang', 'us');
      await page.waitForChanges();
      await page.click('honey-speaker');
      await page.waitForEvent('honeySpeakerStarted');
      expect(startedEvent).toHaveReceivedEvent();
    });

    it('Has default a11y attributes', async () => {
      if(skipTests) return;

      // check unpressed, rich version
      expect(element).toEqualAttribute('title', "Vorlesen");
      expect(element).toEqualAttribute('alt', "Symbol eines angehaltenen, tönenden Lautsprechers");

      // set to press, rich version
      await page.click('honey-speaker');
      await page.waitForChanges();

      // check pressed, rich version
      expect(element).toEqualAttribute('title', "Liest gerade vor");
      expect(element).toEqualAttribute('alt', "Symbol eines tönenden Lautsprechers");

      // set to pure version
      element.setAttribute("pure",true);
      // set to unpressed
      await page.click('honey-speaker');
      await page.waitForChanges();

      // check unpressed, pure version
      expect(element).toEqualAttribute('title', "Vorlesen");
      expect(element).toEqualAttribute('alt', "Symbol eines ausgeschaltenen Lautsprechers");

      // set to pressed, pure version
      await page.click('honey-speaker');
      await page.waitForChanges();

      // check pressed, pure version
      expect(element).toEqualAttribute('title', "Liest gerade vor");
      expect(element).toEqualAttribute('alt', "Symbol eines tönenden Lautsprechers");

    });

  });
});

