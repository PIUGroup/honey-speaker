import { newSpecPage } from '@stencil/core/testing';
import { HoneySpeech } from './honey-speech';
xdescribe('My Service', () => {


  it('should render my component', async () => {
    const page = await newSpecPage({
      components: [HoneySpeech],
      html: `<honey-speech textids="3"></honey-speech><p id="3">test</p>`,
    });
    expect(page.root).toEqualHtml(`
    <honey-speech>Success!</honey-speech>
  `);
  });

});

//
// it('should emit item toggled', async () => {
//   let eventSpy = jest.fn();
//   win.document.addEventListener('itemToggled', eventSpy);
//   element.querySelector('.toggle').click();
//   expect(eventSpy).toHaveBeenCalled();
// });
