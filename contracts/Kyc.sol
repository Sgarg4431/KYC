// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct User {
    address addUser;
    string name;
    string status;
    uint256 pan;
    uint256 aadhar;
    bool verified;
}
struct Bank {
    address addr;
    string name;
    bool verifiedBank;
    address[] requests;
}

contract Kyc {
    User[] private users;
    Bank[] private banks;
    address public centralBank;
    Bank[] public verifiedBanks;

    constructor() {
        centralBank = msg.sender;
    }

    event bankCreated(string x);
    event bankVerified(string x);
    event userCreated(string x);
    event userUpdate(string x);
    event userVerified(string x);
    event activated(string x);
    event rejected(string x);

    function existBank(address add) internal view returns (int256) {
        for (uint256 i = 0; i < banks.length; i++) {
            if (banks[i].addr == add) {
                return int256(i);
            }
        }
        return -1;
    }

    function existVerifiedBank(address add) internal view returns (int256) {
        for (uint256 i = 0; i < verifiedBanks.length; i++) {
            if (verifiedBanks[i].addr == add) {
                return int256(i);
            }
        }
        return -1;
    }

    function existUser(address add) internal view returns (int256) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].addUser == add) {
                return int256(i);
            }
        }
        return -1;
    }

    function createBank(string memory _name) external {
        require(existBank(msg.sender) == -1, "Bank exists");
        Bank memory bank;
        bank.addr = msg.sender;
        bank.name = _name;
        banks.push(bank);
        emit bankCreated("Bank Created Successfully");
    }

    function verifyBank(address addBank) external {
        require(msg.sender == centralBank, "You are not permitted");
        require(existVerifiedBank(msg.sender) == -1, "Bank Verified Already");
        int256 index = existBank(addBank);
        banks[uint256(index)].verifiedBank = true;
        verifiedBanks.push(banks[uint256(index)]);
        emit bankVerified("Bank verified successfully by centeral Bank");
    }

    function createUser(
        string memory _name,
        uint256 _pan,
        uint256 _aadhar,
        address organization
    ) external {
        require(existUser(msg.sender) == -1, "User exists");
        User memory user;
        user.name = _name;
        user.pan = _pan;
        user.aadhar = _aadhar;
        user.addUser = msg.sender;
        user.status = "pending";
        users.push(user);
        require(existVerifiedBank(organization) != -1, "Bank is not verified");
        int256 index = existBank(organization);
        banks[uint256(index)].requests.push(msg.sender);
        emit userCreated("User created and lined for KYC");
    }

    function updateUser(
        string memory _name,
        uint256 _aadhar,
        uint256 _pan
    ) external {
        require(existUser(msg.sender) != -1, "User doesnot exist");
        int256 index = existUser(msg.sender);
        users[uint256(index)].name = _name;
        users[uint256(index)].aadhar = _aadhar;
        users[uint256(index)].pan = _pan;
        emit userUpdate("User information updated");
    }

    function verifyUser(
        address _addr,
        uint256 _aadhar,
        uint256 _pan
    ) public returns (string memory) {
        require(existBank(msg.sender) != -1, "You are not bank admin");
        require(existVerifiedBank(msg.sender) != -1, "Bank is not verified");
        require(existUser(_addr) != -1, "User doesnot exist");
        
        int256 index = existUser(_addr);
        if (
            users[uint256(index)].addUser == _addr &&
            users[uint256(index)].aadhar == _aadhar &&
            users[uint256(index)].pan == _pan
        ) {
            users[uint256(index)].verified = true;
            return "Verified";
        } else {
            emit userVerified("Information provided is wrong");
            return "Fake User";
        }
    }

    function acceptRequest(address _add) external {
        require(existBank(msg.sender) != -1, "You are not bank admin");
        require(
            banks[uint256(existBank(msg.sender))].verifiedBank == true,
            "Bank not verified"
        );
        require(existUser(_add) != -1, "User doesnot exist");
        int256 index = existUser(_add);
        require(users[uint256(index)].verified == true, "Not Verified");
        users[uint256(index)].status = "Activated";
        emit activated("KYC status Activated");
    }

    function rejectRequest(address _add) external {
        require(existBank(msg.sender) != -1, "You are not bank admin");
        require(
            banks[uint256(existBank(msg.sender))].verifiedBank == true,
            "Bank not verified"
        );
        require(existUser(_add) != -1, "User doesnot exist");
        int256 index = existUser(_add);
        users[uint256(index)].status = "Rejected";
        emit rejected("KYC request rejected");
    }

    function checkStatus() external view returns (string memory) {
        require(existUser(msg.sender) != -1, "User doenot exist");
        int256 index = existUser(msg.sender);
        return users[uint256(index)].status;
    }

    function viewRequest() external view returns (address[] memory) {
        require(existBank(msg.sender) != -1, "Bank doesnot exist");
        int256 index = existBank(msg.sender);
        return banks[uint256(index)].requests;
    }

    function viewData(address a) external view returns (User memory) {
        require(existBank(msg.sender) != -1, "Bank doesnot exist");
        require(existUser(a) != -1, "User doenot exist");
        int256 index = existUser(a);
        return users[uint256(index)];
    }
}
