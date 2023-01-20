import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Kyc from "./artifacts/contracts/Kyc.sol/Kyc.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function App() {
  const address = "0x285C4DE1156716d847FA584D650eB627C7b1b517";
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [name, setName] = useState();
  const [aadhar, setAadhar] = useState();
  const [pan, setPan] = useState();
  const [organization, setOrganization] = useState();
  const [bankName, setBankName] = useState();
  const [vAddress, setVAddress] = useState();
  const [vAadhar, setVAadhar] = useState();
  const [vPan, setVPan] = useState();
  const [vBAddress, setVBAddress] = useState();
  const [Address, setAddress] = useState();
  const [rAddress, setRAddress] = useState();
  const [viewAddress, setViewAddress] = useState();
  const[index,setIndex]=useState();
  useEffect(() => {
    addWalletListener();
  }, []);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    window.ethereum.on("accountChanged", async function (accounts) {
      setAccount(account[0]);
      await web3Handler();
    });
    loadContract(signer);
  };
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  const loadContract = async (signer) => {
    setContract(new ethers.Contract(address, Kyc.abi, signer));
  };
  const style1 = {
    paddingLeft: "800px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };
  async function centralBank() {
    if (contract) {
      alert(await contract.centralBank());
    } else {
      alert("Please connect to wallet first");
    }
  }
  async function createUser() {
    if (contract) {
      try {
        await contract.createUser(name, aadhar, pan, organization);
      } catch (e) {
        if (e.message.search("User exists") != -1) {
          alert("User exists");
        } else if (e.message.search("Bank is not verified") != -1)
          alert("Bank is not verified");
        else alert("Something Wrong");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function createBank() {
    if (contract) {
      try {
        await contract.createBank(bankName);
      } catch (e) {
        if (e.message.search("Bank exists") != -1) {
          alert("Bank exists");
        } else alert("Something Wrong");
      }
    } else {
      alert("connect to wallet first");
    }
  }
  async function verifyBank() {
    if (contract) {
      try {
        await contract.verifyBank(vBAddress);
      } catch (e) {
        if (e.message.search("You are not permitted") != -1) {
          alert("You are not permitted");
        } else if (e.message.search("Bank Verified Already") != -1)
          alert("Bank Verified Already");
        else alert("Something Wrong");
      }
    } else {
      alert("Conect to wallet first");
    }
  }
  async function verifyUser() {
    if (contract) {
      try {
        await contract.verifyUser(vAddress, vAadhar, vPan);
      } catch (e) {
        if (e.message.search("You are not bank admin") != -1) {
          alert("You are not bank admin");
        } else if (e.message.search("Bank is not verified") != -1)
          alert("Bank is not verified");
        else if (e.message.search("User doesnot exist") != -1)
          alert("User doesnot exist");
        else alert("Something Wrong");
      }
    } else {
      alert("Conect to wallet first");
    }
  }
  async function updateUser() {
    if (contract) {
      try {
        await contract.updateUser(name, aadhar, pan);
      } catch (e) {
        if (e.message.search("User doesnot exist") != -1) {
          alert("User doesnot exist");
        } else alert("Something Wrong");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function acceptRequest() {
    if (contract) {
      try {
        await contract.acceptRequest(Address);
      } catch (e) {
        if (e.message.search("You are not bank admin") != -1) {
          alert("You are not bank admin");
        } else if (e.message.search("Bank not verified") != -1)
          alert("Bank not verified");
        else if (e.message.search("User doesnot exist") != -1)
          alert("User doesnot exist");
        else if (e.message.search("Not Verified") != -1) alert("Not Verified");
        else alert("Something Wrong");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function rejectRequest() {
    if (contract) {
      try {
        await contract.acceptRequest(rAddress);
      } catch (e) {
        if (e.message.search("You are not bank admin") != -1) {
          alert("You are not bank admin");
        } else if (e.message.search("Bank not verified") != -1)
          alert("Bank not verified");
        else if (e.message.search("User doesnot exist") != -1)
          alert("User doesnot exist");
        else if (e.message.search("Not Verified") != -1) alert("Not Verified");
        else alert("Something Wrong");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function checkStatus() {
    if (contract) {
      try {
        alert(await contract.checkStatus());
      } catch (e) {
        if (e.message.search("User doenot exist") != -1) {
          alert("User doenot exist");
        } else alert("Something wrong");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function viewData() {
    if (contract) {
      try {
        alert(await contract.viewData(viewAddress));
      } catch (e) {
        if (e.message.search("Bank doesnot exist") != -1) {
          alert("Bank doesnot exist");
        } else if (e.message.search("User doenot exist") != -1)
          alert("User doenot exist");
        else alert("Something Wrong");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function viewRequest() {
    if (contract) {
      try {
      alert(await contract.viewRequest());
      } catch (e) {
        if (e.message.search("Bank doesnot exist") != -1) {
          alert("Bank doesnot exist");
        } else alert("Something Wrong");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function verifiedBanks(){
    if(contract){
      alert(await contract.verifiedBanks(index));
    }else{
      alert("Connect to wallet first");
    }
  }
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>KYC</h1>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={web3Handler}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <br></br>
      <br></br>
      <br></br>
      <Button onClick={centralBank} >Central Bank</Button>
      <br></br>
      <br></br>
      <Button onClick={checkStatus}>Check Status</Button>
      <br></br>
      <br></br>
      <Button onClick={viewRequest}>View Request</Button>
      <br></br>
      <br></br>
      <Button onClick={createBank} >Create Bank</Button>
      <input
        onChange={(e) => setBankName(e.target.value)}
        placeholder="Enter Bank Name" style={{ marginLeft: "10px" }}
      />
      <br></br>
      <br></br>
      <Button onClick={verifyBank}>Verify Bank</Button>
      <input
        onChange={(e) => setVBAddress(e.target.value)}
        placeholder="Enter Address" style={{ marginLeft: "10px" }}
      />
      <br></br>
      <br></br>
      <Button onClick={createUser}>Create user</Button>
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name" style={{ marginLeft: "10px" }}
      />

      <input onChange={(e) => setPan(e.target.value)} placeholder="Enter Pan" style={{ marginLeft: "10px" }}/>
      <input
        onChange={(e) => setAadhar(e.target.value)}
        placeholder="Enter Aadhar" style={{ marginLeft: "10px" }}
      />
      <input
        onChange={(e) => setOrganization(e.target.value)}
        placeholder="Enter Organization" style={{ marginLeft: "10px" }}
      />
      <br></br>
      <br></br>
      <Button onClick={updateUser}>Update user</Button>
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name" style={{ marginLeft: "10px" }}
      />
      <input
        onChange={(e) => setAadhar(e.target.value)}
        placeholder="Enter Aadhar" style={{ marginLeft: "10px" }}
      />
      <input onChange={(e) => setPan(e.target.value)} placeholder="Enter Pan" style={{ marginLeft: "10px" }} />
      <br></br>
      <br></br>
      <Button onClick={verifyUser}>Verify User</Button>
      <input
        onChange={(e) => setVAddress(e.target.value)}
        placeholder="Enter Address" style={{ marginLeft: "10px" }}
      />
      <input
        onChange={(e) => setVAadhar(e.target.value)}
        placeholder="Enter Aadhar" style={{ marginLeft: "10px" }}
      />
      <input
        onChange={(e) => setVPan(e.target.value)}
        placeholder="Enter Pan" style={{ marginLeft: "10px" }}
      />
      <br></br>
      <br></br>
      <Button onClick={acceptRequest}>Accept Request</Button>
      <input
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address" style={{ marginLeft: "10px" }}
      />
      
      <br></br>
      <br></br>
      <Button onClick={rejectRequest}>Reject Request</Button>
      <input
        onChange={(e) => setRAddress(e.target.value)}
        placeholder="Enter address" style={{ marginLeft: "10px" }}
      />
      <br></br>
      <br></br>
      <Button onClick={viewData}>View Data</Button>
      <input
        onChange={(e) => setViewAddress(e.target.value)}
        placeholder="Enter address" style={{ marginLeft: "10px" }}
      />
     
      <br></br>
      <br></br>
      <Button onClick={verifiedBanks}>View Verified Banks</Button>
      <input
        onChange={(e) => setIndex(e.target.value)}
        placeholder="Enter Index" style={{ marginLeft: "10px" }}
      />
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
