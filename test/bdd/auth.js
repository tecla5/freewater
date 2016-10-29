
//var chai = require('chai');
//var chaiHttp = require('chai-http');
//var server = require('../server/app');
var should = chai.should();

//chai.use(chaiHttp);


describe('User Authentication', function() {

    var home;


    beforeEach('Background:Given the user has an account on Gmail or Facebook.', function() {
      //browser.get('/');
      //this.skip();
      home = fixture('basic');
    });
    context('scenario: suceess', function() {

      it('Given the user login into free-water', function() {
      //console.debug(home, should, chai);

        var circle = Polymer.dom(home.root).querySelector('.circle');
        //assert.equal(circle.textContent, '1');
        circle.textContent.should.be.equal('1');
      });

      it('When user put correct email', function() {

        this.skip();

      });

      it('And password', function() {
        this.skip();
      });

      it('And user click on login', function() {
        this.skip();
      });

      it('Then the user should be authenticated', function() {
        this.skip();
      });

      it('And user should redirect to their dashboard-screen', function() {
        this.skip();
      });

    });

    context('scenario: bad credencials', function() {

        it('Given the user login into free-water', function() {
          this.skip();
        });

        it('When user put incorrect email', function() {
          this.skip();
        });

        it('And password', function() {
          this.skip();
        });


        it('And user click on login', function() {
          this.skip();
        });

        it('Then the user is advice of bad credentials', function() {
          this.skip();
        });

        it('And user the screen remains', function() {
          this.skip();
        });

    });


    describe('User Logout', function() {

        beforeEach('Given the user has been login', function() {
            this.skip();
        });

        it('Given the user have been login into free-water', function() {

        });

        it('When user click on menu And click on Logout', function() {

        });

        it('Then the user should Logout', function() {

        });

        it('And user should redirect to principal screen on free-water', function() {

        });

    });

});
