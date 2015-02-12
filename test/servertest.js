'use strict';

require('../server');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

var time = function() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  return h + ':' + m;
};

describe('http server', function() {
  var server = 'localhost:3000';
  it('should return the time', function(done) {
    chai.request(server)
      .get('/time')
      .end(function(err, res) {
        var now = time();
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('the current time is: ' + now + '\n');
        done();
      });
  });

  it('should return the name in the URL', function(done) {
    chai.request(server)
      .get('/greet/tricia')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello tricia\n');
        done();
      });
  });

  it('should have a default route', function(done) {
    chai.request(server)
      .get('/random_route')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('did not hit a route\n');
        done();
      });
  });
});