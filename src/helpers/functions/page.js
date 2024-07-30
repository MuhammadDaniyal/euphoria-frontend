import abi from "../../contract/nft14.json"
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import { requestAccount as connectWallet } from "../ConnectWallet/connect"
import { NFTStorage, File } from 'nft.storage'
// const fs = require('fs')
const FormData = require('form-data')


// import fs from 'fs'
// import { fetch } from "nft.storage/dist/src/platform";

// import { env } from 'node:process';

// const contractAddress =env.NEXT_PUBLIC_CONTRACT_ADDRESS;
// const contractAddress = "0xa7102196764Aae31E20F873e15A54c3f7273C3C6";
//const contractAddress = "0xF2C344639Eb5D461C38Aa9fDC54FA6D4514fA522"; //original address // Taneer
//const contractAddress = "0x8fbAE3f486872c5B5AbBBFfcEdF707A7aE6E7FE8"; //original address // Rafay
// const contractAddress = "0x5b35c05b8b601824BE2690B1F06e79764191AD8C"; //original address // Hammad
// const contractAddress = "0x1261056220c5b1e49e6020c69716a0baa8bec8cf"; //original address // Hammad
// const contractAddress = "0xa150B6422BD12c496F4583bb225b58E16e838eE7"; //original address | Hammad | nft2.json
// const contractAddress = "0x056F7Aa7a194BEdeB0851F984b781234717584b8"; //original address | Hammad | nft3.json
//const contractAddress = "0xA3cE24Ef4c47727097497b6b36A43A4E1cDc7491"; //original address | Hammad | nft4.json
// const contractAddress = "0xEA75e03Cc2F9d253a04F0eD9d1A18a716601aC93"; //original address | Hammad | nft4.json
//const contractAddress = "0xBa822757E7B4cBE171343A04AA580A0D81560a38"; //original address | Hammad | nft5.json
// const contractAddress = "0xa1DCC67FEc4A143167e654ddd39B1478C393c1De"; //original address | Hammad | nft5.json
// const contractAddress = "0xaf99d56B9D423AdF575B96696E9829069dC9ba70"; //original address | Hammad | nft6.json
// const contractAddress = "0x5918ca900de2BfAD650c19BeDc869dE924d8B449"; //original address | Hammad | nft7.json
// const contractAddress = "0xd0fc695eDE5165014733C4aF66F95590ac9B2b3d"; //original address | Hammad | nft8.json
// const contractAddress = "0xFB241a47209dfC5Bff6C4b0cAf2EeA12105a9D2b"; //original address | Hammad | nft9.json
// const contractAddress = "0x294D57A40dBA49f4ABE597C3DE809073e1463D16"; //original address | taneer Chutiap | nft10.json
// const contractAddress = "0xaFb6b3Cd363f52bD0007bc2dEB68E661E85Ab66C"; //original address | Hammad | nft10.json
// const contractAddress = "0x26721A5B23fDD94DEA08fE53E28D44b21A8b9103"; //original address | Hammad | nft11.json
// const contractAddress = "0xB99e14127005a24366C053d9E78Cd8e69b189c2c"; //original address | Hammad | nft12.json
// const contractAddress = "0xb3283F89a58369756F84ab013a7dF7484f2664c0"; //original address | Hammad | nft12.json latest
// const contractAddress = "0xD8A7C049aE51Ab86b7E25b601D0042107894c754"; //original address | Hammad | nft12.json
const contractAddress = "0x9de056571aF6B01Ef92B4260B88Ac4a99956C100"; //original address | Daniyal | nft14.json

const contractABI = abi.abi;

// const _token ="e5a36600.071630b1b6704e90919c7684497baf29"
//sir token
// const _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyYjU1QjU0N2FBZWU4NmUzY2Q2NTVBMzY4YjkwNzk0MWI2M0MyMEEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMzA4ODE4Nzc2NiwibmFtZSI6IjJuZCJ9.nNWWYi4wckyctmnrzgxZZ1uMIvMvpp5gaq7uGD_54H4"
const _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBkNzk2ZDg4Y0Y1NDc1NDNBZkFCMmI3MGQxQjcxYTg2N2RENzcyNDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcxNjEyMTM5Nzg5NSwibmFtZSI6ImZ5cCJ9.8L3ibegBaVfpa3ptGFtT7Wzc53gyx0QFANFPNiFG7FM"

const pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMDhiN2E2OC01OGJlLTQ2YWItOTNlYS1mZmZlNzQzNmY0NmYiLCJlbWFpbCI6ImhhbW1hZC53YWhhYjUyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjYjQ5MGM0MGQzMGFjYzY4MjE5YiIsInNjb3BlZEtleVNlY3JldCI6IjhmNmE4YzM0MmMzMDc4ZjBiYTU2MWM5M2U4Y2ZmNGFkNmY1YjY4Y2IyMTgwODVkZWRiMDBlMzZlODdiMmVjMzMiLCJleHAiOjE3NTE4MDE5MTd9.cvshpUOwUEufR07wt-cPhWVTV5Fb13O4DukXzspleBE"




//   =======Connect Wallet===============
// export const connectWallet = async () => {

//     try {
//         const { ethereum } = window;
//         if (ethereum) {
//             acc = await ethereum.request({ method: "eth_requestAccounts" });
//             provide = new ethers.BrowserProvider(ethereum);
//             signer = await provide.getSigner();
//             contract = new ethers.Contract(contractAddress, contractABI, signer);

//             ethereum.on("accountsChanged", () => {
//                 window.location.reload();
//             });

//             ethereum.on("chainChanged", () => {
//                 window.location.reload();
//             });
//         } else {
//             // Handle the case when MetaMask is not present
//         }
//     } catch (error) {
//         const msg = "no metamask";
//         console.error("error ==> ", msg + error);
//     }
// };

// =============Data Without Metamask==========
export const dataWM = async () => {
  const network = "sepolia"
  // const api = process.env.INFURA_PROVIDER_API;
  const api = "dc6400cc63ff41a7ae7327966d3d230d";
  const Provider = new ethers.InfuraProvider(network, api);
  const tokenContract = new ethers.Contract(contractAddress, contractABI, Provider);
  return tokenContract;
}

export const getProvider = async () => {
  const network = "sepolia";
  // const api = process.env.INFURA_PROVIDER_API;
  const api = "dc6400cc63ff41a7ae7327966d3d230d";
  const Provider = new ethers.InfuraProvider(network, api);
  return Provider;
};

export const ContAdd = () => {
  return contractAddress;
}


export const getAdd = async () => {
  const acc = await window.ethereum.request({ method: "eth_requestAccounts" });
  return acc[0];
}

// helpers/functions/page.js

export const fetchUserProfiles = async () => {
  try {
    const response = await fetch(`https://euphoria-backend-production.up.railway.app/api/profile/names?status=accepted`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profiles');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    throw error;
  }
};

// export const dataWM = async () => {
//   const network = "optimism-sepolia"   //for testnet sepolia
//   const api = "aa31d7770b7844cea4c4ae58b4f0c3ba"

//   const ur = `https://${network}.infura.io/v3/${api}`;
//   const Provider = new ethers.JsonRpcProvider(ur)
//   const tokenContract = new ethers.Contract(contractAddress, contractABI, Provider);
//   // const Item = await con.tokenURI(bigInt);
//   return tokenContract;

// }


export const beautifyData = async (Item, Contract) => {
  const data = await Promise.all(Item.map(async ({ tokenId, seller, own, price: unformatedprice }) => {
    const tokenURI = await Contract.tokenURI(tokenId);
    const { name, desc: description } = await getImage(tokenURI)
    const price = ethers.formatEther(unformatedprice, "ether")

    return {
      name,
      price,
      description,
      seller,
      own,
      tokenId: Number(tokenId),
      tokenURI,
    }
  }))
  return data
}

// ===============To Ipfs Using APi=============


export const uploadImage = async (imageData, desc, _pri) => {
  const nftstorage = new NFTStorage({ token: _token })
  const { ipnft } = await nftstorage.store({
    image: new File([imageData], imageData.name, { type: imageData.type }),
    name: imageData.name,
    description: desc,
    price: _pri,
  })
  const url = `https://nftstorage.link/ipfs/${ipnft}/metadata.json`
  return url
}

export const toPinata = async (imageData, desc) => {

  try {
    const formData = new FormData();
    formData.append("file", imageData);
    const metadata = JSON.stringify({
      name: imageData.name,
      description: desc,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pinataJWT}`,
        },
        body: formData,
      }
    );
    const resData = await res.json();
    // console.log(resData);
    return resData
  } catch (error) {
    throw error;
  }

}

export const getpinata = async (val) => {
  try {
    const img = `https://jade-permanent-constrictor-490.mypinata.cloud/ipfs/${val.IpfsHash}`
    return img
  } catch (error) {
    throw error;
  }
}

export const uploadcoll = async (imageData, desc) => {
  const nftstorage = new NFTStorage({ token: _token })
  const { ipnft } = await nftstorage.store({
    image: new File([imageData], imageData.name, { type: imageData.type }),
    name: imageData.name,
    description: desc,
  })
  const url = `https://nftstorage.link/ipfs/${ipnft}/metadata.json`
  return url
}



export const getipfscoll = async (IPFSURL) => {
  try {
    if (IPFSURL != null) {
      const response = await fetch(IPFSURL)
      // console.log(response)
      const data = await response.json()
      const ipfsurl1 = data.image;
      const imgUrl1 = `https://nftstorage.link/ipfs/${ipfsurl1.replace('ipfs://', '')}`;

      const value = { image: imgUrl1, desc: data.description }
      return value;
    }
    else {
      throw new Error("No id Found");
    }
  } catch (error) {
    throw error;
  }
}

// ========xxxxxxxTo Ipfs xxxxxxxxx====

export const getImage = async (IPFSURL) => {
  try {
    if (IPFSURL != null) {
      const response = await fetch(IPFSURL)
      // console.log(response)
      const data = await response.json()
      const ipfsurl = data.image;
      const imgUrl = `https://nftstorage.link/ipfs/${ipfsurl.replace('ipfs://', '')}`;
      const value = { image: imgUrl, name: data.name, desc: data.description }
      return value;
    }
    else {
      throw new Error("No id Found");
    }
  } catch (error) {
    throw error;
  }
}


export const ContractFunc = async () => {
  // const account = await window.ethereum.request({ method: "eth_requestAccounts" })
  const provide = new ethers.BrowserProvider(window.ethereum);
  const signer = await provide.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer)
  window.ethereum.on("accountsChanged", () => {
    window.location.reload();
  });

  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });
  return contract;
}

export const listingprice = async () => {
  const con = await ContractFunc()
  const res = await con.getListingPrice();
  const pri = ethers.formatEther(res, "ether")
  return scientificToDecimal(pri)
}

export const getNftBids = async (token) => {
  try {
    const con = await dataWM();
    const res = await con.getBidsForNFT(token);
    // const pri = ethers.formatEther(res, "ether")
    return res;
  } catch (error) {
    throw (error);
  }
};

export const getNftHis = async (token) => {
  try {
    const con = await dataWM();
    const res = await con.getHisForNFT(token);
    // const pri = ethers.formatEther(res, "ether")
    return res;
  } catch (error) {
    throw (error);
  }
};



export const ownAuctionList = async (_add, _st, _cat, _col) => {
  try {
    const con = await ContractFunc()
    const res = await con.getOwnedNonAuc(_add, _st, _cat, _col);
    return res
  } catch (error) {
    throw (error)
  }
}

export const listedAuction = async () => {
  try {
    const con = await dataWM();
    // const res = await con.getListedAuction();
    const res = await con.getALLAuction();
    // const pri = ethers.formatEther(res, "ether")
    return res;
  } catch (error) {
    throw (error);
  }
}

export const allAuction = async () => {
  try {
    const con = await dataWM();
    const res = await con.getALLAuction();
    // const pri = ethers.formatEther(res, "ether")
    return res;
  } catch (error) {
    throw (error);
  }
}

export const idAuc = async (_id) => {
  try {
    const con = await ContractFunc();
    const res = await con.getWithId(_id);
    // const pri = ethers.formatEther(res, "ether")
    return res;
  } catch (error) {
    console.log("Error", String(error))
    throw (error);
  }
}

export const userListedAuc = async (_add, _st, _cat, _col) => {
  try {
    const con = await ContractFunc();
    //getUserlistedAuc
    const res = await con.getUserlistedAuc(_add, _st, _cat, _col);
    // console.log("response=====>",res)
    // const pri = ethers.formatEther(res, "ether")
    return res;
  } catch (error) {
    throw (error);
  }
}


export const userAllAuc = async (_add) => {
  try {
    const con = await ContractFunc();
    const res = await con.getUserAllAuc(_add);
    // console.log("response=====>",res)
    // const pri = ethers.formatEther(res, "ether")
    return res;
  } catch (error) {
    throw (error);
  }
}

export const withBid = async (tokenId) => {
  try {
    const con = await ContractFunc()
    const res = await con.withdrawBid(tokenId);
    return res
  } catch (error) {
    throw new error(error)
  }
}

export const endAuc = async (tokenId) => {
  try {
    const con = await ContractFunc()
    const res = await con.endAuction(tokenId);
    return res
  } catch (error) {

    throw (error)
  }
}

export const placeBid = async (tokenId, bidValue, pri) => {
  try {
    console.log("valuesss==>", pri)
    console.log(2)
    const con = await ContractFunc()
    const price = ethers.parseUnits(((scientificToDecimal(roundNum(pri))).toString()), "ether");
    const Bprice = ethers.parseUnits(((scientificToDecimal(roundNum(bidValue))).toString()), "ether");
    console.log("Bid Value==>", Bprice)
    console.log("Bid Value with service fee==>", price)
    const res = await con.placeBid(tokenId, Bprice, { value: price.toString() });
    await res.wait()
    return res
  } catch (error) {
    throw error
  }
}

export const setAucVal = async (_tokenId, _reservePrice, _endAt) => {
  try {
    const con = await ContractFunc()
    const res = await con.setAuctionvalues(_tokenId, _reservePrice, _endAt);
    return res
  } catch (error) {
    throw (error)
  }
}
//address _add, uint8 _st, string memory _col, string memory _cat
export const userListedAuction = async (_add, _st, _col, _cat) => {
  try {
    const con = await ContractFunc()
    const res = await con.getUserlistedAuc(_add, _st, _col, _cat);
    return res
  } catch (error) {
    throw (error)
  }
}

export const mintAuc = async (_tokenURI, _reservePrice, _endAt, _startAt, _name, _link, _cat, _col, _royal, _type) => {
  try {
    const con = await ContractFunc()
    const val = await listingprice();
    console.log(_tokenURI, _reservePrice, _endAt, _link, _cat, _col, _royal, _type)

    const res = await con.mintandAuction(_tokenURI, priceEth(_reservePrice), _endAt, _startAt, _link, _cat, _col, _name, (_royal).toString(), _type, { value: priceEth(scientificToDecimal(Number(val))) });

    await res.wait()
    return res
  } catch (error) {
    // console.log("mintAuc==>",error)
    throw error
  }
}


// function setAuctionvalues(uint256 _tokenId, uint256 _reservePrice, uint256 _endAt, uint256 _startAt, string memory _link, string memory _cat, string memory _col,string memory _name, uint256 _royal) public returns (uint32) {
export const reAuc = async (_tokenId, _reservePrice) => {
  try {
    const con = await ContractFunc()
    const val = await listingprice();
    const dates = getCTDates();
    const currentEpoch = toEpochtime_S(dates.currentDate);
    const tomorrowEpoch = toEpochtime_E(dates.tomorrowDate);


    const Auc = await con.setReAuctionvalues(_tokenId, priceEth((_reservePrice)), tomorrowEpoch, currentEpoch, true, { value: priceEth(scientificToDecimal(Number(val))) });
    return Auc;
  } catch (error) {
    throw error
  }


}



export const createCollection = async (_name, _Cimg, _Pimg, _desc, _cat) => {
  try {
    const con = await ContractFunc()
    const res = await con.createCollection(_name, _Cimg, _Pimg, _desc, _cat);
    await res.wait()
    return res
  } catch (error) {
    // console.log("mintAuc==>",error)
    console.log("error function==>", error)
    throw error
  }
}

export const getCollection = async (_add, _st, _cat, _col) => {
  try {
    const con = await ContractFunc()
    const res = await con.getColl(_add, _st, _cat, _col);
    // await res.wait();
    return res
  } catch (error) {
    // console.log("mintAuc==>",error)
    console.log("error function==>", error)
    throw error
  }
}

export const setVoting = async () => {
  try {
    const con = await ContractFunc()
    const val = await listingprice()
    const res = await con.createVoting({ value: priceEth(scientificToDecimal(Number(val))) });
    // await res.wait();
    return res
  } catch (error) {
    // console.log("mintAuc==>",error)
    console.log("error function==>", error)
    throw error
  }

}

export const getVotingDur = async () => {
  try {
    const con = await ContractFunc()
    const res = await con.getVotingDuration();
    // await res.wait();
    return res
  } catch (error) {
    // console.log("mintAuc==>",error)
    console.log("error Dur function==>", error)
    throw error
  }

}

export const activeVoting = async () => {
  try {
    const con = await ContractFunc()
    const res = await con.getAllActiveVotings();
    // await res.wait();
    return res
  } catch (error) {
    console.log("error function==>", error)
    throw error
  }
}

export const singleVoting = async (_address) => {
  try {
    const con = await ContractFunc()
    const res = await con.getVotingStatus(_address);
    // await res.wait();
    return res
  } catch (error) {
    console.log("error function==>", error)
    throw error
  }
}

export const Vote = async (_add, _cast) => {
  try {
    const con = await ContractFunc()
    const val = await listingprice()
    const res = await con.vote(_add, _cast, { value: priceEth(scientificToDecimal(Number(val))) });
    return res
  } catch (error) {
    console.log("error Vote==>", error)
    throw error
  }
}

export const endVote = async (add) => {
  try {
    const con = await ContractFunc()
    // const add = await getAdd()
    const res = await con.endVoting(add);
    return res
  } catch (error) {
    console.log("error endVote==>", error)
    throw error
  }
}


export function shortAdd(add) {
  let text = add;
  let a = text.substring(0, 5)
  let b = text.substring(text.length - 4, text.length);
  let result = a + "..." + b
  return result;
}
// ====================TOAST==============
// import React from "react";
// ==========Pending=======
export const pend = (data) => {
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
  toast.promise(resolveAfter3Sec, { pending: `${data} in process`, });
}
// ==========Success========
export const succ = (data) => {
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 100));
  toast.promise(resolveAfter3Sec, { success: `${data} 👌`, });
};
// ==========DEni=======
export const deni = (data) => {
  const resolveAfter3Sec = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Transaction Failed 🤯')), 100));

  const customErrorFunction = () => {
    return `${data}`;
  };

  toast.promise(resolveAfter3Sec, {
    error: customErrorFunction()
  });
};

export const TopCreator = async (nfts) => {
  const creators = nfts.reduce((creatorObject, nft) => {
    (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);
    return creatorObject;
  }, {});

  const topCreators = Object.entries(creators).map((creator) => {
    const seller = creator[0];
    const sum = creator[1].reduce((total, item) => total + Number(item.price), 0);
    const sumDecimal = scientificToDecimal(sum);
    return { seller, sum: sumDecimal };
  });

  // Sort the results based on the sum of prices (descending order)
  const sortedTopCreators = topCreators.sort((a, b) => b.sum - a.sum);

  return sortedTopCreators;


}

export const scientificToDecimal = function (num) {
  var nsign = Math.sign(num);
  //remove the sign
  num = Math.abs(num);
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    var zero = '0',
      parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
      e = parts.pop(), //store the exponential part
      l = Math.abs(e), //get the number of zeros
      sign = e / l,
      coeff_array = parts[0].split('.');
    if (sign === -1) {
      l = l - coeff_array[0].length;
      if (l < 0) {
        num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
      }
      else {
        num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
      }
    }
    else {
      var dec = coeff_array[1];
      if (dec)
        l = l - dec.length;
      if (l < 0) {
        num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
      } else {
        num = coeff_array.join('') + new Array(l + 1).join(zero);
      }
    }
  }

  return nsign < 0 ? '-' + num : num;
};

export const st = new Map([
  ["tokenId", 0],
  ["seller", 1],
  ["owner", 2],
  ["price", 3]
]);

export const formatEth = (BigInt) => {
  // const price = ethers.parseUnits(_reservePrice, "ether")
  // console.log("typeof bigint",BigInt)
  if (typeof (BigInt) == "undefined") return 0
  const price = ethers.formatEther(BigInt, "ether")
  return price
}

export const priceEth = (BigInt) => {
  // console.log("11111")
  const price = ethers.parseUnits((BigInt).toString(), "ether")
  // console.log("22222")
  // const price = ethers.formatEther(BigInt, "ether")
  return price
}

export function toEpochtime_S(dateString) {
  const date = new Date(dateString);
  date.setHours(0, 0, 1, 0);
  const epochTime = date.getTime() / 1000;
  return epochTime;
}

export function toEpochtime_E(dateString) {
  const date = new Date(dateString);
  // date.setHours(23, 59, 59, 0);
  date.setHours(23, 59, 59, 0);
  const epochTime = date.getTime() / 1000;
  return epochTime;
}

// const axios = require('axios')
export function getCTDates() {
  const today = new Date();

  // Format the current date as YYYY-MM-DD
  const formattedToday = today.toISOString().split('T')[0];

  // Create a new date object for tomorrow by adding one day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));

  // Format the tomorrow date as YYYY-MM-DD
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];

  return {
    currentDate: formattedToday,
    tomorrowDate: formattedTomorrow
  };
}

export const pinFileToIPFS = async (file, name, desc) => {
  // console.log("File", file)
  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMDhiN2E2OC01OGJlLTQ2YWItOTNlYS1mZmZlNzQzNmY0NmYiLCJlbWFpbCI6ImhhbW1hZC53YWhhYjUyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0Y2JmM2RmMzFlZjc1NTRjZTFjZSIsInNjb3BlZEtleVNlY3JldCI6IjM5ZjBjOTA5MmNiZDZhZmZjNTViMjllMzczNGU4YWMwNTc4OWEyNDkzNWUyOGIwMjYzYTBlMGQ2NGMzODdiOGUiLCJpYXQiOjE3MTYxMTkwMjZ9.y86GihP7ubqiem3-YKZD1_Pb9PqcVprIoSkOkat8uWk";
  // const JWT ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMDhiN2E2OC01OGJlLTQ2YWItOTNlYS1mZmZlNzQzNmY0NmYiLCJlbWFpbCI6ImhhbW1hZC53YWhhYjUyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMTRiN2E0MmE4YjQ1MmUwODZmNCIsInNjb3BlZEtleVNlY3JldCI6Ijg2ZWVjYWY2YjA0ZDhkZjRmOTZlZjdhNDU0YjdmZjY1ODZhNzQ4YTBjMjVjMjU5ZjU1ZTk1ZDJjOGEzMDg4YjgiLCJpYXQiOjE3MTYxMTIxMDF9.-A2rupRA5xF8r__rie3rec1fLXL6n29gIaee1wNCQFA";
  const formData = new FormData();
  // const src = "path/to/file.png";

  // const file = fs.createReadStream(src)
  formData.append('file', file)

  const pinataMetadata = JSON.stringify({
    name: { name },
    description: { desc }
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', pinataOptions);

  try {
    // console.log("uploading")
    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      }
    );
    // console.log("converting")
    const resData = await res.json();
    // console.log("response", resData);
  } catch (error) {
    console.log(error);
  }
}

// export const tohrd = (epoch) => {
//   const date = new Date(Number(epoch) * 1000); // Convert epoch time to milliseconds
// return date.toLocaleString();}

// export const tohrd = (epoch) => {
//   const date = new Date(epoch * 1000); // Convert epoch time to milliseconds

//   // Extract time
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   const seconds = date.getSeconds().toString().padStart(2, '0');
//   const time = `${hours}: ${minutes}: ${seconds}`;

//   // Extract date
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//   const year = date.getFullYear();
//   const formattedDate = `${day}:${month}:${year}`;

//   return `${formattedDate} ${time}`;
// }


export const tohrd = (epoch) => {
  const nowInSeconds = Math.floor(Date.now() / 1000); // Get current epoch time in seconds
  const remainingTimeInSeconds = epoch - nowInSeconds;

  if (remainingTimeInSeconds <= 0) {
    return "End";
  }

  const hours = Math.floor(remainingTimeInSeconds / 3600);
  const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
  const seconds = remainingTimeInSeconds % 60;

  return `${hours} : ${minutes} : ${seconds}`;

}


export function tohrdd(endEpochTimeInSeconds) {
  const nowInSeconds = Math.floor(Date.now() / 1000); // Get current epoch time in seconds
  const remainingTimeInSeconds = endEpochTimeInSeconds - nowInSeconds;

  if (remainingTimeInSeconds <= 0) {
    return "End";
  }

  const days = Math.floor(remainingTimeInSeconds / (3600 * 24));
  const hours = Math.floor((remainingTimeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
  const seconds = remainingTimeInSeconds % 60;

  // return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`;
  return ({ days: days, hours: hours, minutes: minutes, seconds: seconds });
}


// export const grpsell = (items) => {
//   const groupedItems = items.reduce((acc, item) => {
//     const { seller } = item;
//     console.log("seller==>",seller)
//     if (!acc[seller]) {
//       acc[seller] = [];
//     }
//     acc[seller].push(item);
//     return acc;
//   }, {});

//   // Convert object to array and flatten
//   return Object.values(groupedItems).flat();
// };
// iterate upto the whole array 
// export function grpsell(nftArray) {
//   // Step 1: Use reduce to group objects by seller
//   const groupedBySeller = nftArray.reduce((acc, item) => {
//     if (!acc[item.seller]) {
//       acc[item.seller] = [];
//     }
//     acc[item.seller].push(item);
//     return acc;
//   }, {});

//   // Step 2: Convert the grouped object to an array of objects (if needed)
//   const resultArray = Object.entries(groupedBySeller).map(([seller, items]) => ({
//     seller,
//     items
//   }));
//   // console.log("result array==>",resultArray)

//   // Step 3: Optionally, sort the result array by seller if necessary
//   // resultArray.sort((a, b) => a.seller.localeCompare(b.seller));

//   return resultArray;
// }

//iterate upto the length off array but return 4 items
// export function grpsell(nftArray) {
//   // Step 1: Use reduce to group objects by seller
//   const groupedBySeller = nftArray.reduce((acc, item) => {
//     if (!acc[item.seller]) {
//       acc[item.seller] = [];
//     }
//     if (acc[item.seller].length < 4) {
//       acc[item.seller].push(item);
//     }
//     return acc;
//   }, {});

//   // Step 2: Convert the grouped object to an array of objects
//   const resultArray = Object.entries(groupedBySeller).map(([seller, items]) => ({
//     seller,
//     items
//   }));

//   return resultArray;
// }
// iterate with four element
// export function grpsell1(nftArray) {
//   // Step 1: Use reduce to group objects by seller with a limit of 4 items per seller
//   const groupedBySeller = nftArray.reduce((acc, item) => {
//     if (!acc[item.seller]) {
//       acc[item.seller] = [];
//     }
//     if (acc[item.seller].length < 4) {
//       acc[item.seller].push(item);
//     }
//     return acc;
//   }, {});

//   // Step 2: Convert the grouped object to an array of objects
//   const resultArray = Object.entries(groupedBySeller).map(([seller, items]) => ({
//     seller,
//     items
//   }));

//   return resultArray;
// }


// export function grpsell(nftArray) {
//   // Step 1: Use reduce to group objects by collection and seller with a limit of 4 items per seller
//   const groupedByCollectionAndSeller = nftArray.reduce((acc, item) => {
//     if (!acc[item.collection]) {
//       acc[item.collection] = {};
//     }
//     if (!acc[item.collection][item.seller]) {
//       acc[item.collection][item.seller] = [];
//     }
//     if (acc[item.collection][item.seller].length < 4) {
//       acc[item.collection][item.seller].push(item);
//     }
//     return acc;
//   }, {});

//   // Step 2: Convert the grouped object to an array of objects, with separate objects for each collection-seller pair
//   const resultArray = [];

//   for (const [collection, sellers] of Object.entries(groupedByCollectionAndSeller)) {
//     for (const [seller, items] of Object.entries(sellers)) {
//       resultArray.push({
//         collection,
//         seller,
//         items
//       });
//     }
//   }

//   return resultArray;
// }
// group with seller and collection
// export function grpsell(nftArray) {
//   const groupedByCollectionAndSeller = nftArray.reduce((acc, item) => {
//     if (!acc[item.collection]) {
//       acc[item.collection] = {};
//     }
//     if (!acc[item.collection][item.seller]) {
//       acc[item.collection][item.seller] = {
//         items: [],
//         category: item.category, // Assign category here
//       };
//     }
//     if (acc[item.collection][item.seller].items.length < 4) {
//       acc[item.collection][item.seller].items.push(item);
//     }
//     return acc;
//   }, {});

//   // Convert the grouped object to an array of objects, with each group containing the sum of reservedPrice
//   const resultArray = [];

//   for (const [collection, sellers] of Object.entries(groupedByCollectionAndSeller)) {
//     for (const [seller, { items, category }] of Object.entries(sellers)) {
//       const reservedPriceSum = items.reduce((sum, item) => sum + Number(formatEth(item.reservedPrice)), 0);
//       const price = (reservedPriceSum);
//       resultArray.push({
//         collection,
//         seller,
//         price,
//         category, // Include category outside items array
//         items,
//       });
//     }
//   }

//   return resultArray;
// }

export function grpsell(nftArray) {
  const groupedByCollectionAndHON = nftArray.reduce((acc, item) => {
    if (!acc[item.collection]) {
      acc[item.collection] = {};
    }
    if (!acc[item.collection][item.HON]) {
      acc[item.collection][item.HON] = {
        items: [],
        category: item.category, // Assign category here
      };
    }
    if (acc[item.collection][item.HON].items.length < 4) {
      acc[item.collection][item.HON].items.push(item);
    }
    return acc;
  }, {});

  // Convert the grouped object to an array of objects, with each group containing the sum of reservedPrice
  const resultArray = [];

  for (const [collection, HONS] of Object.entries(groupedByCollectionAndHON)) {
    for (const [HON, { items, category }] of Object.entries(HONS)) {
      const reservedPriceSum = items.reduce((sum, item) => sum + Number(formatEth(item.reservedPrice)), 0);
      const price = reservedPriceSum;
      resultArray.push({
        collection,
        seller: HON,
        price,
        category, // Include category outside items array
        items,
      });
    }
  }

  return resultArray;
}



// export function grpsell(nftArray) {
//   // Step 1: Use reduce to group objects by collection and seller with a limit of 4 items per seller
//   const groupedByCollectionAndSeller = nftArray.reduce((acc, item) => {
//     if (!acc[item.collection]) {
//       acc[item.collection] = {};
//     }
//     if (!acc[item.collection][item.seller]) {
//       acc[item.collection][item.seller] = [];
//     }
//     if (acc[item.collection][item.seller].length < 4) {
//       acc[item.collection][item.seller].push(item);
//     }
//     return acc;
//   }, {});

//   // Step 2: Convert the grouped object to an array of objects, with separate objects for each collection-seller pair
//   const resultArray = [];

//   for (const [collection, sellers] of Object.entries(groupedByCollectionAndSeller)) {
//     for (const [seller, items] of Object.entries(sellers)) {
//       // console.log(99)
//       const reservedPriceSum = items.reduce((sum, item) => sum + Number(formatEth(item.reservedPrice)), 0);
//       const price = reservedPriceSum;
//       // console.log(97)
//       resultArray.push({
//         collection,
//         seller,
//         price,
//         items
//       });
//     }
//   }

//   return resultArray;
// }

export function grpsell_c(nftArray) {
  const groupedByCollectionAndHON = nftArray.reduce((acc, item) => {
    if (!acc[item.collection]) {
      acc[item.collection] = {};
    }
    if (!acc[item.collection][item.HON]) {
      acc[item.collection][item.HON] = [];
    }
    if (acc[item.collection][item.HON].length < 4) {
      acc[item.collection][item.HON].push(item);
    }
    return acc;
  }, {});

  // Convert the grouped object to an array of objects, with each group containing the sum of reservedPrice
  const resultArray = [];

  for (const [collection, hons] of Object.entries(groupedByCollectionAndHON)) {
    for (const [HON, items] of Object.entries(hons)) {
      const price = items.reduce((sum, item) => sum + Number(formatEth(item.reservedPrice)), 0);
      resultArray.push({
        collection,
        HON,
        price,
        items
      });
    }
  }

  return resultArray;
}


// export function grpsell_c(nftArray) {
//   const groupedByCollectionAndHON = nftArray.reduce((acc, item) => {
//     if (!acc[item.collection]) {
//       acc[item.collection] = {};
//     }
//     if (!acc[item.collection][item.HON]) {
//       acc[item.collection][item.HON] = [];
//     }
//     if (acc[item.collection][item.HON].length < 4) {
//       acc[item.collection][item.HON].push(item);
//     }
//     return acc;
//   }, {});

//   // Convert the grouped object to an array of objects, with each group containing the sum of reservedPrice
//   const resultArray = [];

//   for (const [collection, hons] of Object.entries(groupedByCollectionAndHON)) {
//     for (const [HON, items] of Object.entries(hons)) {
//       const reservedPriceSum = items.reduce((sum, item) => sum + Number(formatEth(item.reservedPrice)), 0);
//       resultArray.push({
//         collection,
//         HON,
//         reservedPriceSum,
//         items
//       });
//     }
//   }

//   return resultArray;
// }

export function grpsell1(nftArray, sellerName) {
  // Step 1: Filter the nftArray to include only items where the seller matches sellerName
  const filteredNftArray = nftArray.filter(item => item.seller === sellerName);

  // Step 2: Use reduce to group objects by collection and seller with a limit of 4 items per seller
  const groupedByCollectionAndSeller = filteredNftArray.reduce((acc, item) => {
    if (!acc[item.collection]) {
      acc[item.collection] = {};
    }
    if (!acc[item.collection][item.seller]) {
      acc[item.collection][item.seller] = [];
    }
    if (acc[item.collection][item.seller].length < 4) {
      acc[item.collection][item.seller].push(item);
    }
    return acc;
  }, {});

  // Step 3: Convert the grouped object to an array of objects, with separate objects for each collection-seller pair
  const resultArray = [];

  for (const [collection, sellers] of Object.entries(groupedByCollectionAndSeller)) {
    for (const [seller, items] of Object.entries(sellers)) {
      const reservedPriceSum = items.reduce((sum, item) => sum + Number(formatEth(item.reservedPrice)), 0);
      const price = reservedPriceSum;
      resultArray.push({
        collection,
        seller,
        price,
        items
      });
    }
  }

  return resultArray;
}



export function filterDataBySellerAndCollection(data, seller, collection) {
  return data.filter((item) => item.seller === seller && item.collection === collection);
}

export function filterDataByHonAndCollection(data, Hon, collection) {
  // console.log("Hon==>", Hon)
  return data.filter((item) => item.HON === Hon && item.collection === collection);
}

export const sthm = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours} hours ${minutes} minutes ${remainingSeconds} seconds`;
};

export const rTime = (epochTime) => {
  const currentTime = Date.now() / 1000; // current time in seconds
  const diffInSeconds = currentTime - epochTime;

  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2419200) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 29030400) {
    const months = Math.floor(diffInSeconds / 2419200);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 29030400);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
};


export function mergeArrays(collectionGroups, sicols, address) {
  const collectionMap = new Map();
  collectionGroups.forEach(group => {
    collectionMap.set(group.collection, group);
  });

  sicols.forEach(sicol => {
    if (!collectionMap.has(sicol.collection)) {
      const newItem = {
        own: "not available",
        seller: sicol.add,
        tokenId: "not available",
        Imagelink: sicol.cimg,
        reservedPrice: "not available",
        startAt: "not available",
        endAt: "not available",
        status: "not available",
        highestBid: "not available",
        highestBidder: "not available",
        royality: "not available",
        HON: address,
        category: sicol.category,
        collection: sicol.collection
      };

      const newCollectionGroup = {
        collection: sicol.collection,
        seller: sicol.add,
        price: "0",
        items: [newItem]
      };

      collectionGroups.push(newCollectionGroup);
      collectionMap.set(sicol.collection, newCollectionGroup);
    }
  });

  return collectionGroups;
}

export const roundNum = (num) => {
  return parseFloat((Number(num)).toFixed(10));
};


