// This is the UI test file

const expect = chai.expect;
describe('Acme Managers Users Tests', () => {
  it('Has a heading', () => {
    expect(document.getElementsByTagName('h1').length).to.be.greaterThan(1);
  });
  it('Has a title', () => {
    expect(document.title).to.be.ok;
    expect(document.title.match(/\S/)).to.be.ok;
    expect(document.title.toUpperCase()).to.not.equal('TODO');
  });
  it('Has buttons', () => {
      expect($('button').length).to.be.greaterThan(0);
  });
  it('Has selects', () => {
      expect($('select').length).to.be.greaterThan(0);
  });
});

