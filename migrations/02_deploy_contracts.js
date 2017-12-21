var CoinTypeFactory = artifacts.require("CoinTypeFactory");
var RewardsCoinBase = artifacts.require("RewardsCoinBase")

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(CoinTypeFactory);
  deployer.deploy(RewardsCoinBase);
};
