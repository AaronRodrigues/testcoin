var RewardsCoinBase = artifacts.require("RewardsCoinBase");

contract('RewardsCoinBase', function(accounts) {


  it("coinTypeFactoryAddress should be settable", async () => {
    var factoryAddress = 0x123;

    let instance = await RewardsCoinBase.deployed();
    await instance.setCoinTypeFactoryAddress(factoryAddress);
    assert.equal(await instance.coinTypeFactoryAddress(), factoryAddress , "factoryAddress wasn't set");
  });

  it("should create and send a coin", async () => {
    let initialBalance =  await web3.fromWei(web3.eth.getBalance(accounts[1])).valueOf();
    console.log(initialBalance);

    let instance = await RewardsCoinBase.deployed();
    await instance.createAndSendCoin(accounts[1]);
    let endBalance = await web3.fromWei(web3.eth.getBalance(accounts[1])).valueOf();
    assert.equal(initialBalance, endBalance, "coin wasn't transfered");
  });
  //
  // try {
  //     await ownable.transferOwnership(other, { from: other });
  //     assert.fail('should have thrown before');
  //   } catch (error) {
  //     assertRevert(error);
  //   }

});
