import Login from './components/Login';
import { contractAddress, contractAbi } from './constants/constants';
import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Connected from './components/Connected';

function App() {
  
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  console.log(account);
  useEffect( () => {
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      console.log("handler set");
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  },[]);

  async function handleAccountsChanged([newAddress]) {
    console.log("hit");
    if (newAddress) {
      setAccount(newAddress);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);

      }
      catch (err) {
        console.log(err);
      }
    } else {
      console.error("metamask is not installed in the browser");
    }
  }
  return (
    <div className="App">
      {isConnected ? (<Connected account={account} />) : (<Login connectWallet={connectToMetamask} />)}

    </div>
  );
}

export default App;
