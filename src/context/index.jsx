// import React, { createContext, useEffect, useState } from 'react'
// import abi from "@/contract/chai.json"
// import { ethers } from "ethers";
// import { listing_createNft, beautifyData, shortAdd, scientificToDecimal, dataWM } from "@/helpers/functions/page"

// export const Notecontext = createContext();

// const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; //nftMsrketPlace
// const contractABI = abi.abi;

// export const NftProvider = ({ children }) => {

//   const [data, setData] = useState({ Provider: {}, Signer: {}, Contract: {}, conState: false, Account: "" })

//   // useEffect(() => {
//   //   const connection = async () => {
//   //     await connectWallet();
//   //   }
//   //   connection()
//   // }, [])

//   const connectWallet = async () => {
//     //   const contractAddress = "0xc6BdCbb476B365C660513eC200f0436119C24fBF";
//     try {
//       const { ethereum } = window;
//       if (ethereum) {
//         const account = await ethereum.request({ method: "eth_requestAccounts" })
//         const provide = new ethers.BrowserProvider(ethereum);
//         const signer = await provide.getSigner();
//         const contract = new ethers.Contract(contractAddress, contractABI, signer)

//         ethereum.on("accountsChanged", () => {
//           window.location.reload();
//         });
//         ethereum.on("chainChanged", () => {
//           window.location.reload();
//         });
//         setData({ Provider: provide, Signer: signer, Contract: contract, conState: true, Account: account[0] })

//       }
//       else {
//         throw new Error({ message: "no metamask found", code: 404 })
//       }
//     } catch (error) {
//       console.log("error==>", error)
//       if (error && (error.reason)) { errorToastify(error.reason) }
//       else if (error && (error.message)) { errorToastify((error).message) }
//       else { if (error) { errorToastify(String(error)) } }
//       setData((prevState) => ({
//         ...prevState, // Spread the previous state
//         conState: false, // not connected
//       }));
//       throw error
//     }
//   }

//   // ===============================


//   const ContractFunc = async () => {
//     const account = await ethereum.request({ method: "eth_requestAccounts" })
//     const provide = new ethers.BrowserProvider(ethereum);
//     const signer = await provide.getSigner();
//     const contract = new ethers.Contract(contractAddress, contractABI, signer)
//     return contract;
//   }

//   const createSell = async (formData, imageData, setstepcount) => {
//     const con = await ContractFunc();

//     try {
//       const url = await listing_createNft(formData, imageData) // coming from ipfs
//       setstepcount(2)
//       const listingPrice = await con.getListingPrice()
//       const price = ethers.parseUnits(formData.price, "ether")
//       setstepcount(3)
//       const transaction = await con.createToken(url, price, { value: listingPrice.toString() })
//       setstepcount(4)
//       await transaction.wait();
//       return url

//     } catch (error) {
//       throw error
//     }
//   }

//   const Resell = async (TokenId, pri) => {
//     try {
//       const con = await ContractFunc();
//       const listingPrice = await con.getListingPrice();
//       const price = ethers.parseUnits(pri, "ether");

//       const trans = await con.resellToken(TokenId, price, { value: listingPrice.toString() });
//       await trans.wait();
//       return trans;

//     } catch (error) {
//       // console.error("(Resell) Error:", error);
//       throw error; // Re-throw the error to propagate it further if needed
//     }
//   };

//   const mylistednft = async () => {
//     try {
//       const con = await ContractFunc()
//       const res = await con.fetchItemsListed();
//       // const val = await beautifyData(res, con)
//       return res

//     } catch (error) {
//       throw error
//     }
//   }

//   const iboughtnft = async () => {
//     const con = await ContractFunc()
//     const res = await con.fetchMyNFTs();
//     // const val = await beautifyData(res, con)
//     return res
//   }

//   const Buynft = async (nft) => {
//     const con = await ContractFunc()
//     const price = ethers.parseEther((nft.price.toString()), "ether")
//     const res = await con.createMarketSale(nft.tokenId, { value: price })
//     await res.wait();
//   }

//   const listingprice = async () => {
//     const con = await ContractFunc()
//     const res = await con.getListingPrice();
//     const pri = ethers.formatEther(res, "ether")
//     return scientificToDecimal(pri)
//   }

//   const getNftBids = async (token) => {
//     try {
//       const con = await dataWM();
//       const res = await con.getBidsForNFT(token);
//       // const pri = ethers.formatEther(res, "ether")
//       return res;
//     } catch (error) {
//       throw new Error(error);
//     }
//   };

//   const myAuctionList = async () => {
//     try {
//       const con = await ContractFunc()
//       const res = await con.getMyAuctionList();
//       return res
//     } catch (error) {
//       throw new error(error)
//     }
//   }

//   const listedAuction = async () => {
//     try {
//       const con = await dataWM();
//       const res = await con.getAuctionList(0, "a", "b");
//       // const pri = ethers.formatEther(res, "ether")
//       return res;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   const withBid = async (tokenId) => {
//     try {
//       const con = await ContractFunc()
//       const res = await con.withdrawBid(tokenId);
//       return res
//     } catch (error) {
//       throw new error(error)
//     }
//   }

//   const endAuc = async (tokenId) => {
//     try {
//       const con = await ContractFunc()
//       const res = await con.endAuction(tokenId);
//       return res
//     } catch (error) {
//       throw new error(error)
//     }
//   }

//   const placeBid = async (tokenId, pri) => {
//     try {
//       const con = await ContractFunc()
//       const price = ethers.parseUnits(pri, "ether");
//       const res = await con.placeBid(tokenId, { value: price.toString() });
//       return res
//     } catch (error) {
//       throw new error(error)
//     }
//   }

//   const setAucVal = async (_tokenId, _reservePrice, _endAt) => {
//     try {
//       const con = await ContractFunc()
//       const res = await con.setAuctionvalues(_tokenId, _reservePrice, _endAt);
//       return res
//     } catch (error) {
//       throw new error(error)
//     }
//   }

//   return (
//     <Notecontext.Provider value={{ data, listingprice, Resell, connectWallet, createSell, mylistednft, shortAdd, Buynft, iboughtnft, getNftBids, myAuctionList, listedAuction, endAuc, withBid, placeBid, setAucVal }}>

//       {children}
//     </Notecontext.Provider>
//   )
// }
