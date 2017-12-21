var RewardsCoinBase = artifacts.require("RewardsCoinBase");

contract('RewardsCoinBase', function(accounts) {
  it("it should have a coin type factory address", async () => {
    var factoryAddress = 0x123;

    let instance = await RewardsCoinBase.deployed();
    await instance.setCoinTypeFactoryAddress(factoryAddress);
    assert.equal(await instance.coinTypeFactoryAddress(), factoryAddress , "factoryAddress wasn't set");

    // console.log(instance.coinTypeFactoryAddress.valueOf());
    // return RewardsCoinBase.deployed()
    // .then(function(instance) {
    //   return instance;
    // }).then(instance => {
    //   return instance.setCoinTypeFactoryAddress.call(factoryAddress);
    //   //console.log(instance.coinTypeFactoryAddress.valueOf());
    //   //return instance
    // })
    // .then(instance => {
    //   console.log(instance);
    //   // return assert.equal(instance.coinTypeFactoryAddress.valueOf(), factoryAddress , "factoryAddress wasn't set");
    // });
  });
});
