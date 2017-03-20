var expect = chai.expect;
console.log('mocha testing');
describe('Acme Managers Users Tests', function() {
  this.enableTimeouts(true);
  it('Has a heading', function() {
    expect(document.getElementsByTagName('h1').length).to.be.greaterThan(1);
  });
  it('Has a title', function() {
    expect(document.title).to.be.ok;
    expect(document.title.match(/\S/)).to.be.ok;
    expect(document.title.toUpperCase()).to.not.equal('TODO');
  });
  it('Has buttons', function() {
    // setTimeout(function() {
      expect(document.getElementsByTagName('button').length).to.be.greaterThan(100);
    // }, 1000);
  });
  it('Has selects', function() {
    // setTimeout(function() {
      expect(document.getElementsByTagName('select').length).to.be.greaterThan(0);
    // }, 1000);
  });
});


