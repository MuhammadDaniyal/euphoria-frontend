// import { ethers } from "ethers";
import abi from "../../contract/nft5.json"
import { errorToastify } from "../..//utils/toast";


export async function requestAccount(): Promise<any> {
  // console.log("Requesting account...");
  const contractAddress = "0x22D531ace682C77C2390eA34D5Dc919741a226d0";
  // const contractAddress = "0xa7102196764Aae31E20F873e15A54c3f7273C3C6"; last contract
  //const contractAddress = "0xC4793e13d9A008422e124c39580B6f855AB7b193";// main contract
  const contractABI = abi.abi;

  if ((window as any).ethereum) {
    // console.log("detected");
    try {
      const { ethereum } = window as any
      //   Account
      const account = await ethereum.request({ method: "eth_requestAccounts", });
      // const provide = new ethers.BrowserProvider(ethereum);
      // const signer = await provide.getSigner();
      // const contract = new ethers.Contract(contractAddress, contractABI, signer)

      //   Wallet balance
      const walletBalace = await (window as any).ethereum.request({
        method: "eth_getBalance",
        params: [account[0], "latest"],
      });
      ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      let wei = parseInt(walletBalace, 16);
      let balance = wei / 10 ** 18;

      return {
        walletAddress: account[0],
        walletBalance: balance.toFixed(2) + " ETH",
        // Contract: contract,
      };
    } catch (error) {
      //console.log("Error connecting...",error);
      if (error && (error as { reason: string }).reason) { errorToastify((error as { reason: string }).reason) }
      else if (error && (error as { message: string }).message) { errorToastify((error as { message: string }).message) }
        else { if (error) { errorToastify(String(error)) } }
    }
  } else {
    alert("Meta Mask not detected");
  }
}
