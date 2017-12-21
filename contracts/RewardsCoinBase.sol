pragma solidity ^0.4.18;

contract RewardsCoinBase {


address public coinTypeFactoryAddress;


function setCoinTypeFactoryAddress(address addr) public {
        coinTypeFactoryAddress = addr;
    }
}
