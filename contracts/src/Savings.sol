// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract Savings {
    error OnlyOwnerAllowed();
    error LockNotExpired();

    uint256 public immutable startTime;
    uint256 public immutable lockupDuration;
    address public owner;

    constructor(address _owner, uint256 _lockupDuration) {
        owner = _owner;
        startTime = block.timestamp;
        lockupDuration = _lockupDuration;
    }

    function switchOwner(address _owner) public onlyOwner {
        owner = _owner;
    }

    function withdraw(uint256 amt) public onlyOwner {
        if (block.timestamp <= startTime + lockupDuration) {
            revert LockNotExpired();
        }

        payable(owner).transfer(amt);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwnerAllowed();
        _;
    }

    receive() external payable { }
}