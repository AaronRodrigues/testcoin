var RewardsCoinBase = artifacts.require("RewardsCoinBase");

contract('RewardsCoinBase', function(accounts) {


  it("coinTypeFactoryAddress should be settable", async () => {
    var factoryAddress = 0x123;

    let instance = await RewardsCoinBase.deployed();
    await instance.setCoinTypeFactoryAddress(factoryAddress);
    assert.equal(await instance.coinTypeFactoryAddress(), factoryAddress , "factoryAddress wasn't set");
  });

  it("should create and send a coin", async () => {

    let instance = await RewardsCoinBase.deployed();
    //let initialBalance = await instance.balanceOf(accounts[1]).valueOf();
    let initialBalance = await instance.balanceOf.call(accounts[1]).then(function(balance) {return balance.toNumber();})
    await instance.createAndSendCoin(accounts[1]);
    //let endBalance = await instance.balanceOf(accounts[1]).valueOf();
    let endBalance = await instance.balanceOf.call(accounts[1]).then(function(balance) {return balance.toNumber();})

    assert.equal(initialBalance + 1, endBalance, "coin wasn't transfered");
  });
  //
  // try {
  //     await ownable.transferOwnership(other, { from: other });
  //     assert.fail('should have thrown before');
  //   } catch (error) {
  //     assertRevert(error);
  //   }

});
