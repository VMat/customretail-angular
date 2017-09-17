import { Almundoexamv2Page } from './app.po';

describe('almundoexamv2 App', function() {
  let page: Almundoexamv2Page;

  beforeEach(() => {
    page = new Almundoexamv2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
