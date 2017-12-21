pragma solidity ^0.4.18;

contract Ownable {
    function owned() public { contractOwner = msg.sender; }
    address contractOwner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(msg.sender == contractOwner);
        _;
    }
}
