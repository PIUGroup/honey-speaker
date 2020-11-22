import {newE2EPage} from '@stencil/core/testing';
import {E2EElement, E2EPage} from "@stencil/core/testing/puppeteer/puppeteer-declarations";
import {Logger} from "../../libs/logger";

class TestLogger extends Logger {

}

describe('E2E: voiceless tests of speaker', () => {

  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    TestLogger.enableLogging();
    page = await newE2EPage({html: `<honey-speaker audiolang="en" textids="3"></honey-speaker><p id="3">audio text</p>`});
    element = await page.find('honey-speaker');
  });

  it('should render a component', async () => {
    expect(element).not.toBeNull();
  });

  it('renders correct styles', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('Has default a11y attributes', async () => {
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
    await element.click();
    // await page.waitForChanges();

    // check unpressed, pure version
    expect(element).toEqualAttribute('title', "Vorlesen");
    expect(element).toEqualAttribute('alt', "Symbol eines ausgeschaltenen Lautsprechers");

    // set to pressed, pure version
    await element.click();
    // await page.waitForChanges();

    // check pressed, pure version
    expect(element).toEqualAttribute('title', "Liest gerade vor");
    expect(element).toEqualAttribute('alt', "Symbol eines tönenden Lautsprechers");

  });

  it('has correct audio properties', async () => {
    // Property Wert setzen
    // await page.$eval('honey-speaker', (elm: any) => {
    //   elm.audiolang = 'us';
    // });
    const lang = await element.getProperty('audiolang');
    expect(lang).toEqual('en');
    await element.setProperty('audiolang', 'us');
    await page.waitForChanges();
    const value = await element.getProperty("audiolang")
    expect(value).toEqual( 'us');
  });





});



