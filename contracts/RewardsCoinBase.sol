pragma solidity ^0.4.18;

import "./Pausable.sol";
import "./ERC721Draft.sol";


contract RewardsCoinBase is Pausable, ERC721 {


function RewardsCoinBase() public {}


  address public coinTypeFactoryAddress;


  struct RewardsCoin {
    uint8 coinType;
  }


  RewardsCoin[] rewardsCoins;

   mapping (uint256 => address) public rewardsCoinIndexToOwner;
   mapping (address => uint256) ownershipTokenCount;
   mapping (uint256 => address) public rewardsCoinIndexToApproved;

   // add onlyOwner
  function setCoinTypeFactoryAddress(address addr) public {
          coinTypeFactoryAddress = addr;
  }

  // add onlyOwner
  function createAndSendCoin(address addr) public {
    var coinType = 1;
    var newCoinId = _createRewardsCoin(coinType);
    _transfer(owner, addr, newCoinId);
  }


  function _createRewardsCoin(uint8 _coinType) internal returns (uint)
  {
      RewardsCoin memory _rewardsCoin = RewardsCoin({
          coinType: _coinType
      });
      uint256 newRewardsCoinId = rewardsCoins.push(_rewardsCoin) - 1;

      // This will assign ownership, and also emit the Transfer event as
      // per ERC721 draft
      _transfer(0, owner, newRewardsCoinId);

      return newRewardsCoinId;
  }



  function implementsERC721() public pure returns (bool)
  {
      return true;
  }

  function totalSupply() public view returns (uint) {
      return rewardsCoins.length - 1;
  }

  function ownerOf(uint256 _tokenId) public view returns (address owner)
  {
      owner = rewardsCoinIndexToOwner[_tokenId];
      require(owner != address(0));
  }

  function _approve(uint256 _tokenId, address _approved) internal {
    rewardsCoinIndexToApproved[_tokenId] = _approved;
  }

  function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
    return rewardsCoinIndexToApproved[_tokenId] == _claimant;
  }

  function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
    return rewardsCoinIndexToOwner[_tokenId] == _claimant;
  }

  function balanceOf(address _owner) public view returns (uint256 count) {
    return ownershipTokenCount[_owner];
}

  function approve(address _to, uint256 _tokenId) public whenNotPaused
  {
      // Only an owner can grant transfer approval.
      require(_owns(msg.sender, _tokenId));

      // Register the approval (replacing any previous approval).
      _approve(_tokenId, _to);

      // Emit approval event.
      Approval(msg.sender, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) public whenNotPaused
  {
      // Check for approval and valid ownership
      require(_approvedFor(msg.sender, _tokenId));
      require(_owns(_from, _tokenId));

      // Reassign ownership (also clears pending approvals and emits Transfer event).
      _transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public whenNotPaused
  {
      // Safety check to prevent against an unexpected 0x0 default.
      require(_to != address(0));
      // You can only send your own cat.
      require(_owns(msg.sender, _tokenId));

      // Reassign ownership, clear pending approvals, emit Transfer event.
      _transfer(msg.sender, _to, _tokenId);
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
      ownershipTokenCount[_to]++;
      // transfer ownership
      rewardsCoinIndexToOwner[_tokenId] = _to;
      if (_from != address(0)) {
          ownershipTokenCount[_from]--;
          // clear any previously approved ownership exchange
          delete rewardsCoinIndexToApproved[_tokenId];
      }
      // Emit the transfer event.
      Transfer(_from, _to, _tokenId);
  }


}
