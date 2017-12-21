pragma solidity ^0.4.18;

contract Ownable {
    address public contractOwner;

    function Ownable() public { contractOwner = msg.sender; }

    /**
    * @dev Allows the current owner to transfer control of the contract to a newOwner.
    * @param newOwner The address to transfer ownership to.
    */
    function transferOwnership(address newOwner) onlyOwner {
      if (newOwner != address(0)) {
          contractOwner = newOwner;
      }
    }
    

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
