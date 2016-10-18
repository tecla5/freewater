var expect = chai.expect;
var should = chai.should();


describe('Compare Numbers', function() {
  it('one should equal 1', function(){
    expect(2).to.be.greaterThan(1);
  });
});


function isEven(num) {
  if (num%2 !== 0) return false;
  return true;
}


describe('Is Even Test', function() {
    it('Should always return a boolean', function() {
        expect(isEven(2)).to.be.a('boolean');
    });

    it('Calling isEven(76) sould return true.', function() {
        expect(isEven(76)).to.be.true;
    });

    it('Calling isEven(77) sould return false.', function() {
        expect(isEven(77)).to.be.false;
    });


});
