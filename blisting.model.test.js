var should = require('should'), 
    mongoose = require('mongoose'), 
    bListing = require('./server/models/blistings.server.model'),
    config = require('./server/config/config');

var blisting, id;

blisting =  {

    bodname: "Bodega at UF Innovate the Hub",
    bodaddress: { bodstreet: "University Ave",
		bodcity: "Gainesville",
		bodstate: "FL", 
		bodzip: "32601", 
		bodlat: 0, 
		bodlong: 1},
    boddescr: "Bodega for Innovation and Prototyping",
    bodimage: "logo.svg",
    bodurl: "http://www.lovedcommunity.com",
	Vendor: [{ venname: "Harvest Thyme",
		venmobile: "(352) 555-5555",
		venaddr: {"venstreet": "100 West West St. ",
		vencity: "Gainesville ",
		venstate: "FL ",
		venzip: "32609 ",
		venlat: 2,
		venlong: 3},
 		item: [{ itemname: "Wheat Wrap",
			itemdesc: "Delicious whole wheat vegan wrap",
			price: 5.99,
			itemexp: 35666,
			itemcode: "HT1"}],
		}],
};


describe('bListing Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when code and name provided', function(done){
      new bListing({
        boddescr: blisting.boddescr, 
        bodname: blisting.bodname
      }).save(function(err, blisting){
        should.not.exist(err);
        id = blisting._id;
        done();
      });
    });

    it('saves properly when all three properties provided', function(done){
      new bListing(blisting).save(function(err, blisting){
        should.not.exist(err);
        id = blisting._id;
        done();
      });
    });

    it('throws an error when bodega descr not provided', function(done){
      new bListing({
        boddescr: blisting.boddescr
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

    it('throws an error when bodega name not provided', function(done){
      new bListing({
        bodname: blisting.bodname
      }).save(function(err){
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function(done) {
    if(id) {
      bListing.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});
