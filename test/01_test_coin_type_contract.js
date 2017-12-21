var CoinTypeFactory = artifacts.require("CoinTypeFactory");

contract('CoinTypeFactory', function(accounts) {
  it("should return a coin type as a uint", function() {
    return CoinTypeFactory.deployed().then(function(instance) {
      return instance.getCoinType.call();
    }).then(function(coinType) {
      assert.equal(coinType.valueOf(), 1, "cointype wasn't one");
    });
  });
});
