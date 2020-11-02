import { newE2EPage } from '@stencil/core/testing';

describe('example', () => {
  it('should render a foo-component', async () => {
    const page = await newE2EPage();
    await page.setContent(`<honey-speech textids="3"></honey-speech><p id="3">test</p>`);
    const el = await page.find('honey-speech');
    expect(el).not.toBeNull();
  });

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<honey-speech textids="3"></honey-speech><p id="3">test</p>');
    const element = await page.find('honey-speech');
    expect(element).toHaveClass('hydrated');
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
