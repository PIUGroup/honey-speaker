import { newE2EPage } from '@stencil/core/testing';
import {Logger} from "../../libs/log-helper";

describe('example', () => {

  // beforeEach(async () => {
  //   // page = await newE2EPage({ html: `<callback-test></callback-test>`});
  //   // elm = await page.find('callback-test');
  //   Logger.disableLogging();
  // });

  it('should render a foo-component', async () => {
    const page = await newE2EPage();
    await page.setContent(`<honey-speech textids="3"></honey-speech><p id="3">test</p>`);
    const el = await page.find('honey-speech');
    expect(el).not.toBeNull();
  });

  it('renders correct styles', async () => {
    const page = await newE2EPage();

    await page.setContent('<honey-speech textids="3"></honey-speech><p id="3">test</p>');
    const element = await page.find('honey-speech');
    expect(element).toHaveClass('hydrated');
  });

  it('has a11y attributes', async () => {
    const page = await newE2EPage();

    await page.setContent('<honey-speech textids="3"></honey-speech><p id="3">test</p>');
    const element = await page.find('honey-speech');
    expect(element).toEqualAttribute('title', 'Vorlesen');
  });

  it('fire events', async () => {
    const page = await newE2EPage();

    await page.setContent('<honey-speech id="speaker1" textids="3"></honey-speech><p id="3">test</p>');
    const element = await page.find('honey-speech');
    const startedEvent = await page.spyOnEvent('honeySpeakerStarted');
    element.click();
    await page.waitForChanges();
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
