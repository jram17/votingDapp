import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './constants/constants';
import Login from './components/Login';
import Finished from './components/Finished';
import Connected from './components/Connected';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    if (account) {
      canVote();
      getCandidates();
      getRemainingTime();
      getCurrentStatus();
    }
  }, [account]);

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
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
        console.log("Metamask Connected: " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  async function vote() {
    try {
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const tx = await contractInstance.vote(number);
      await tx.wait();
      canVote();
    } catch (err) {
      console.error(err);
    }
  }

  async function canVote() {
    try {
      const signer = provider.getSigner(); 
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const voteStatus = await contractInstance.voters(await signer.getAddress());
      setCanVote(voteStatus);
    } catch (err) {
      console.error(err);
    }
  }

  async function getCandidates() {
    try {
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const candidatesList = await contractInstance.getAllVotersOfCandidates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber(),
        };
      });
      setCandidates(formattedCandidates);
    } catch (err) {
      console.error(err);
    }
  }

  async function getCurrentStatus() {
    try {
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const status = await contractInstance.getVotingStatus();
      setVotingStatus(status);
    } catch (err) {
      console.error(err);
    }
  }

  async function getRemainingTime() {
    try {
      const signer = provider.getSigner(); 
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const time = await contractInstance.getRemainingTime();
      setRemainingTime(parseInt(time, 16));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
      {votingStatus ? (isConnected ? (<Connected
                                        account={account}
                                        candidates={candidates}
                                        remainingTime={remainingTime}
            							number={number}
            							handleNumberChange={handleNumberChange}
            							voteFunction={vote}
            							showButton={CanVote}
          								/>) 
										: 
										(<Login connectWallet={connectToMetamask} />)
    				) : (<Finished />)}
    </div>
  );
}

export default App;
