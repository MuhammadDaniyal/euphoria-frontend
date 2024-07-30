// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
// // "viaIR": true

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/security/Pausable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract CustomNFTG is ERC721URIStorage, Pausable, Ownable {

//     using Counters for Counters.Counter;

//     // Constructor
//     constructor() ERC721("FYP", "FYP") Ownable(msg.sender) {
//         ownerOfCon = payable(msg.sender);
//     }

//     // Utility function for hashing strings
//     function kecak(string memory _value) public pure returns (bytes32) {
//         return keccak256(abi.encodePacked(_value));
//     }

//     Counters.Counter private _itemsSold;
//     Counters.Counter private _tokenIds;
//     Counters.Counter private _aucId;
//     Counters.Counter private _aucCl;

//     struct nftBids {
//         uint256 bidtime;
//         address useraddress;
//         uint256 bidAmount;
//     }

//     uint256 private _royaltyPercentage = 15; // Set royalty (15%)
//     uint256 listingPrice = 0.0000000000000025 ether;
//     uint256 votingFee = 0.0000000000000025 ether;
//     uint256 public constant VOTING_DURATION = 24 hours;
//     address payable ownerOfCon;
//     uint8 public constant statusOpen = 1;
//     uint8 public constant statusClose = 0;
//     uint32 public constant succed = 200;
//     uint32 public constant notfound = 404;
//     uint32 public constant failed = 5;
//     uint32 public constant aucsucc = 6;
//     uint32 public constant aucend = 7;

//      enum Result {
//         Approved,
//         NotApproved,
//         Pending
//     }

//     struct Voting {
//         address celebrity;
//         uint256 startTime;
//         uint256 votesFor;
//         uint256 votesAgainst;
//         bool active;
//         Result res;
//     }

//     struct Profile {
//         address add;
//         string name;
//         string info;
//         string Cimg;
//         string Pimg;
//         uint256 nftcost;
//     }

//     struct tokenData {
//         string name;
//         uint256 royality;
//         address HON;
//         address own;
//         address seller;
//         uint256 tokenId;
//         string Imagelink;
//         uint256 reservedPrice;
//         uint256 startAt;
//         uint256 endAt;
//         uint8 status;
//         uint256 highestBid;
//         address highestBidder;
//         string category;
//         string collection;
//     }

//     struct MarketItem {
//         uint256 tokenId;
//         address payable seller;
//         address payable owner;
//         uint256 price;
//         bool sold;
//         string category;
//         string Imagelink;
//     }

//     struct Collections {
//         address add;
//         string collection;
//         string cimg;
//         string pimg;
//         string category;
//         string description;
//     }

//     // Mappings for various data structures
//     mapping(address => mapping(string => Collections)) public collectiondata;
//     mapping(uint256 => mapping(address => nftBids)) public biddMap;
//     mapping(uint256 => address[]) public bidderAddresses;
//     mapping(uint256 => tokenData) public tokenIDInfo;
//     mapping(uint256 => mapping(address => uint256)) public biddingMap;
//     // voting
//     mapping(address => Voting) public votings;
//     mapping(address => mapping(address => bool)) public hasVoted;
//     address[] public allCelebrities;

//     address[] public addressList; // List of addresses used in collectiondata
//     string[] public collectionList; // List of collection names used in collectiondata

//     // Events
//     event NewHighestBid(address bidder, uint256 amount);
//     event AuctionEnded(address winner, uint256 amount);
//     event Time(uint256 ct, uint256 dt);
//     event Minted(string msg, uint256 indexed tokenId, address to);
//     event MarketItemCreated(uint256 indexed tokenId, address seller, address owner, uint256 price, bool sold);
//     event VotingStarted(address indexed celebrity);
//     event Voted(address indexed voter, address indexed celebrity, bool vote);
//     event VotingEnded(address indexed celebrity, bool approved);

//       modifier OnlyOwner{
//         require(msg.sender == votings[msg.sender].celebrity, "Only owner has access");
//         _;
//     }


//     // Function to set auction values for a token
//     function setAuctionvalues(uint256 _tokenId, uint256 _reservePrice, uint256 _endAt, uint256 _startAt, string memory _link, string memory _cat, string memory _col,string memory _name, uint256 _royal) public returns (uint32) {
//         _aucId.increment();
//         _aucCl.increment();
//         tokenIDInfo[_aucId.current()] = tokenData({
//             name:_name,
//             royality: _royal,
//             own: address(this),
//             HON: msg.sender,
//             seller: msg.sender,
//             tokenId: _tokenId,
//             Imagelink: _link,
//             reservedPrice: _reservePrice,
//             startAt: _startAt,
//             endAt: _endAt,
//             status: statusOpen,
//             highestBid: 0,
//             highestBidder: address(0),
//             category: _cat,
//             collection: _col
//         });

//         _transfer(msg.sender, address(this), _tokenId);
//         return succed;
//     }

//     function getListingPrice() public view returns (uint256) {
//         return listingPrice;
//     }

//     // Function to place a bid on a token
//     function placeBid(uint256 _tokenId) external payable returns (uint32) {
//         require(tokenIDInfo[_tokenId].status == statusOpen, "Auction already closed");
//         require(msg.value > tokenIDInfo[_tokenId].reservedPrice, "Amount should be greater than reserved price");

//         if (!isAuctionExpired(_tokenId)) {
//             uint256 HBA = tokenIDInfo[_tokenId].highestBid; // highest Bidding Amount
//             uint256 endingDate = tokenIDInfo[_tokenId].endAt;
//             uint256 startDate = tokenIDInfo[_tokenId].startAt;
//             address highestBidder = tokenIDInfo[_tokenId].highestBidder;
//             require(block.timestamp >= startDate, "Auction not yet Started");
//             require(msg.value > HBA, "Bid must be higher than current highest bid");
//             require(block.timestamp < endingDate, "Auction has ended");

//             if (highestBidder != address(0)) {
//                 // Refund the previous highest bidder
//                 payable(highestBidder).transfer(HBA);
//             }

//             tokenIDInfo[_tokenId].highestBidder = msg.sender;
//             tokenIDInfo[_tokenId].highestBid = msg.value;
//             biddingMap[_tokenId][msg.sender] += msg.value;
//             bidderAddresses[_tokenId].push(msg.sender);

//             biddMap[_tokenId][msg.sender] = nftBids({
//                 useraddress: msg.sender,
//                 bidAmount: msg.value,
//                 bidtime: block.timestamp
//             });

//             emit NewHighestBid(msg.sender, msg.value);
//             return succed;
//         } else {
//             endAuction(_tokenId);
//         }

//         return succed;
//     }

//     // Function to end an auction
//     function endAuction(uint256 _tokenId) public returns (uint32) {
//         tokenData storage tokenInfo = tokenIDInfo[_tokenId];
//         address ownerNFT = tokenInfo.seller;
//         require(ownerNFT == msg.sender, "only owner can end");

//         require(tokenIDInfo[_tokenId].status == statusOpen, "Auction already closed");
//         require(block.timestamp >= tokenInfo.endAt, "Auction not yet ended");

//         address highestBidder = tokenInfo.highestBidder;
//         uint256 highestBid = tokenInfo.highestBid;
//         uint256 reservePrice = tokenInfo.reservedPrice;

//         if (highestBid >= reservePrice) {
//             tokenInfo.own = highestBidder;
//             tokenInfo.seller = highestBidder;

//             // Transfer ownership of NFT to highest bidder
//             _transfer(address(this), highestBidder, _tokenId);

//             uint256 royalty = tokenIDInfo[_tokenId].royality;
//             uint256 Rvalue = highestBid * royalty / 100;
//             uint256 remaining = highestBid - Rvalue;

//             payable(ownerOfCon).transfer(listingPrice); // Transfer listing price to the owner of contract
//             payable(tokenInfo.HON).transfer(Rvalue); // Transfer royalty to the original owner
//             payable(ownerNFT).transfer(remaining); // Transfer remaining bid amount to the seller

//             tokenIDInfo[_tokenId].status = statusClose;
//             _itemsSold.increment();

//             emit AuctionEnded(highestBidder, highestBid);
//             return aucsucc;
//         } else {
//             tokenIDInfo[_tokenId].status = statusClose;
//             _transfer(address(this), ownerNFT, _tokenId);
//             return aucend;
//         }
//     }

//     // Function to create a collection
//     function createCollection(string memory _name, string memory _cimg, string memory _pimg, string memory _info, string memory _category) public returns (uint32) {
//         //function setcollectionsdata(string memory _collectionname , string memory _cimg , string memory _pimg ,string memory _description ,string memory _category) public returns (string memory ) {
 
//         address userAddress = msg.sender;
//         Collections storage collection = collectiondata[userAddress][_name];
//         collection.add = userAddress;
//         collection.collection = _name;
//         collection.cimg = _cimg;
//         collection.pimg = _pimg;
//         collection.category = _category;
//         collection.description = _info;

//         if (!addressExists(msg.sender)) {
//             addressList.push(msg.sender);
//         }

//         collectionList.push(_name);
//         return succed;
//     }

//     function getColl(address _add, uint8 _st, string memory _cat, string memory _col) public view returns (Collections[] memory) {

//         Collections[] memory tempItems = new Collections[](addressList.length * collectionList.length);
//         uint currentIndex = 0;

//         for (uint i = 0; i < addressList.length; i++) {
//             address addr = addressList[i];
            
//             for (uint j = 0; j < collectionList.length; j++) {
//                 string memory colName = collectionList[j];
//                 Collections storage currentItem = collectiondata[addr][colName];
                
//                 bool addCondition = (_st == 1 && currentItem.add == _add);
//                 bool addColCondition = (_st == 2 && currentItem.add == _add && compareStrings((tokenIDInfo[i + 1].collection) , _col) );
//                 // bool catColCondition = (_st == 3 && keccak256(abi.encodePacked(currentItem.collection)) == colHash && keccak256(abi.encodePacked(currentItem.category)) == catHash);

//                 if ((currentItem.add != address(0) && bytes(currentItem.collection).length != 0) && 
//                     (_st == 0 || addCondition || addColCondition )) {
//                     tempItems[currentIndex] = currentItem;
//                     currentIndex++;
//                 }
//             }
//         }

//         Collections[] memory items = new Collections[](currentIndex);
//         for (uint k = 0; k < currentIndex; k++) {
//             items[k] = tempItems[k];
//         }

//         return items;
//     }
   
//     // all  listed auction
//     function getListedAuction() public view returns (tokenData[] memory) {
//         uint256 itemCount = _aucId.current();
//         uint256 unsoldItemCount = _aucId.current() - _itemsSold.current();
//         uint256 currentIndex = 0;

//         tokenData[] memory items = new tokenData[](unsoldItemCount);

//         for (uint256 i = 0; i < itemCount; i++) {
//             if (tokenIDInfo[i + 1].status == statusOpen) {
                
//                 uint256 currentId = i + 1;
//                 tokenData storage currentItem = tokenIDInfo[currentId];
//                 items[currentIndex] = currentItem;
//                 currentIndex += 1;
//             }
//         }
//         return items;
//     }

//     function getUserlistedAuc(address _add, uint8 _st, string memory _col, string memory _cat) public view returns (tokenData[] memory) {
//         uint256 itemCount = _aucId.current();
//         uint256 currentIndex = 0;

//         tokenData[] memory items = new tokenData[](itemCount);
//         bytes32 colHash = keccak256(abi.encodePacked(_col));
//         bytes32 catHash = keccak256(abi.encodePacked(_cat));

//         for (uint256 i = 0; i < itemCount; i++) {
//             if (tokenIDInfo[i + 1].own == address(this)) {
//                 if (_st == 1 && tokenIDInfo[i + 1].seller != _add) {
//                     continue;
//                 }
//                 if (_st == 2 && (tokenIDInfo[i + 1].seller != _add && !compareStrings((tokenIDInfo[i + 1].collection) , _col))) {
//                     continue;
//                 }
//                 if (_st == 3 && (keccak256(abi.encodePacked(tokenIDInfo[i + 1].collection)) != colHash || keccak256(abi.encodePacked(tokenIDInfo[i + 1].category)) != catHash)) {
//                     continue;
//                 }
//                 uint256 currentId = i + 1;
//                 tokenData storage currentItem = tokenIDInfo[currentId];
//                 if (currentItem.seller != address(0) && bytes(currentItem.collection).length != 0) {
//                     items[currentIndex] = currentItem;
//                     currentIndex += 1;
//                 }
//             }
//         }

//         // Create an array with the exact number of matches
//         tokenData[] memory resultItems = new tokenData[](currentIndex);
//         for (uint256 j = 0; j < currentIndex; j++) {
//             resultItems[j] = items[j];
//         }

//         return resultItems;
//     }

//     //owned => non listed
//     function getOwnedNonAuc(address _add, uint8 _st, string memory _col, string memory _cat) public view returns (tokenData[] memory) {
//         uint256 itemCount = _aucId.current();
//         uint256 currentIndex = 0;

//         tokenData[] memory items = new tokenData[](itemCount);
//         bytes32 colHash = keccak256(abi.encodePacked(_col));
//         bytes32 catHash = keccak256(abi.encodePacked(_cat));

//         for (uint256 i = 0; i < itemCount; i++) {
//             if (tokenIDInfo[i + 1].own == _add ) {
//                 if (_st == 1 &&  !compareStrings((tokenIDInfo[i + 1].collection) , _col) ){
//                   continue;
//                 }
//                 if (_st == 2 && (keccak256(abi.encodePacked(tokenIDInfo[i + 1].collection)) != colHash || keccak256(abi.encodePacked(tokenIDInfo[i + 1].category)) != catHash)) {
//                   continue;
//                 }
//                 uint256 currentId = i + 1;
//                 tokenData storage currentItem = tokenIDInfo[currentId];
                
//                 if (currentItem.seller != address(0) && bytes(currentItem.collection).length != 0) {
//                     items[currentIndex] = currentItem;
//                     currentIndex += 1;
//                 }
//             }
//         }

//         return items;
//     }

//     function isAuctionExpired(uint256 _tokenId) public view returns (bool) {
//         return block.timestamp >= tokenIDInfo[_tokenId].endAt;
//     }

//     function mintandAuction (string memory tokenURI, uint256 _reservePrice, uint256 _endAt,uint256 _startAt, string memory _link,string memory _cat, string memory _col, string memory _name, uint256 _royal) payable public returns(uint32){
//         require(_reservePrice > 0, "Price must be at least 1 wei");
//         require(msg.value == listingPrice, "Must pay listing price");

//         require(msg.value>=listingPrice, "you have to pay listing fee");
//         _tokenIds.increment();
//         uint256 tokenId = _tokenIds.current();
//         _mint(msg.sender, tokenId);
//         _setTokenURI(tokenId, tokenURI);
//        //setAuctionvalues(tokenId, _reservePrice, _endAt,_startAt, _link,_cat,_col,_royal);
//        setAuctionvalues(tokenId, _reservePrice, _endAt,_startAt, _link,_cat,_col,_name,_royal);
        
//         return succed;
//     }

//     function getBidsForNFT(uint256 _tokenId) external view returns (address[] memory, uint256[] memory) {
//         address[] memory bidders = new address[](bidderAddresses[_tokenId].length);
//         uint256[] memory bidAmounts = new uint256[](bidderAddresses[_tokenId].length);

//         for (uint256 i = 0; i < bidderAddresses[_tokenId].length; i++) {
//             address bidder = bidderAddresses[_tokenId][i];
//             nftBids memory bidData = biddMap[_tokenId][bidder];
//             bidders[i] = bidData.useraddress;
//             bidAmounts[i] = bidData.bidAmount;
//         }

//         return (bidders, bidAmounts);
//     }
    
//     function addressExists(address _addr) public view returns (bool) {
//         for (uint i = 0; i < addressList.length; i++) {
//             if (addressList[i] == _addr) {
//                 return true;
//             }
//         }
//         return false;
//     }

//      function keccak256LowerCase(string memory str) public pure returns (bytes32) {
//         bytes memory bStr = bytes(str);
//         bytes memory bLower = new bytes(bStr.length);
//         for (uint i = 0; i < bStr.length; i++) {
//             // Uppercase characters (A-Z) are in the range 0x41-0x5A
//             if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) {
//                 // Convert to lowercase by adding 32 (0x20)
//                 bLower[i] = bytes1(uint8(bStr[i]) + 32);
//             } else {
//                 bLower[i] = bStr[i];
//             }
//         }
//         return keccak256(abi.encodePacked(bLower));
//     }

//     function compareStrings(string memory str1, string memory str2) public pure returns (bool) {
//         return keccak256LowerCase(str1) == keccak256LowerCase(str2);
//     }

//     function createVoting(address _celebrity) external payable{
//         require(msg.value>listingPrice,"insufficient balance to create for creating profile");
//         require(votings[_celebrity].celebrity==address(0),"Already applied for Profile");
//         require(votings[_celebrity].startTime == 0, "Voting already started");
//         votings[_celebrity] = Voting({
//             celebrity: _celebrity,
//             startTime: block.timestamp,
//             votesFor: 0,
//             votesAgainst: 0,
//             active: true,
//             res:Result.Pending
//         });
//         allCelebrities.push(_celebrity);
//         emit VotingStarted(_celebrity);
//     }

//     function vote(address _celebrity, bool _vote) payable external {
//         require(msg.value>votingFee, "Pay voting fee");
//         require(votings[msg.sender].res==Result.Approved,"you are not celeberity");
//         require(votings[_celebrity].active, "Voting session Expired");
//         require(!hasVoted[msg.sender][_celebrity], "Already voted");
//         require(block.timestamp <= votings[_celebrity].startTime + VOTING_DURATION, "Voting ended");

//         hasVoted[msg.sender][_celebrity] = true;

//         if (_vote) {
//             votings[_celebrity].votesFor += 1;
//         } else {
//             votings[_celebrity].votesAgainst += 1;
//         }

//         emit Voted(msg.sender, _celebrity, _vote);
//     }

//     function endVoting(address _celebrity) external OnlyOwner() returns (string memory){
//         require(votings[_celebrity].active, "Voting not active");
//         require(block.timestamp > votings[_celebrity].startTime + VOTING_DURATION, "Voting duration not ended");

//         votings[_celebrity].active = false;
//         bool approved = votings[_celebrity].votesFor > votings[_celebrity].votesAgainst;

//         approved ? votings[_celebrity].res=Result.Approved : votings[_celebrity].res=Result.NotApproved;

//         emit VotingEnded(_celebrity, approved);
//         return "voting end successfully";
//     }

//     function getVotingStatus(address _celebrity) external view returns (bool active, uint256 votesFor, uint256 votesAgainst, uint256 timeLeft, Result _res) {
//         Voting memory voting = votings[_celebrity];
//         active = voting.active;
//         votesFor = voting.votesFor;
//         votesAgainst = voting.votesAgainst;
//         timeLeft = voting.startTime + VOTING_DURATION > block.timestamp ? voting.startTime + VOTING_DURATION - block.timestamp : 0;
//         _res=voting.res;
//     }

//         function getAllActiveVotings() external view returns (address[] memory) {
//         uint256 activeCount = 0;
//         for (uint256 i = 0; i < allCelebrities.length; i++) {
//             if (votings[allCelebrities[i]].active) {
//                 activeCount++;
//             }
//         }

//         address[] memory activeVotings = new address[](activeCount);
//         uint256 index = 0;
//         for (uint256 i = 0; i < allCelebrities.length; i++) {
//             if (votings[allCelebrities[i]].active) {
//                 activeVotings[index] = allCelebrities[i];
//                 index++;
//             }
//         }

//         return activeVotings;
//     }
// }
