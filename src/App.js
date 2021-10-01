import { ethers, utils } from "ethers";
import "./App.css";
import NDToken from "./artifacts/contracts/Token.sol/NDToken.json";
const { formatUnits, parseUnits } = utils;
const tokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

function App() {
  //dectect if someone has an ethereum wallet
  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    //request the account
    console.log({ accounts });
    // log them out
    return accounts[0];
  }

  //get token balance
  async function getBalance() {
    const account = await connectWallet();
    //make request to the blockchain network
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, NDToken.abi, provider);
    const balance = await contract.balanceOf(account);
    console.log("balance:", formatUnits(balance, "ether"));
  }

  // send token
  async function sendCoins() {
    const account = "0xa2C0bD8f7CBB7794c069F9520c17e7d43b240d29";
    const amount = parseUnits("1000");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, NDToken.abi, signer);
    const translation = await contract.transfer(account, amount);
    await translation.wait();
    console.log(
      `${formatUnits(amount, "ether")} Coins successfully sent to account`
    );
  }
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={sendCoins}>Send Coin</button>
    </div>
  );
}

export default App;
