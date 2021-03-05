const Web3 = require('web3');
const fs = require('fs');
const path = require("path");

const dotenv = require('dotenv').config({
  path: path.join(__dirname,'.env_variables')
});


//----- Ganache -----
let url = "http://localhost:8545";
let red = "ganache";
//----- Quorum -----
//let url = "http://localhost:22000";
//let red = "quorum";

var web3 = new Web3(new Web3.providers.HttpProvider(url));

//------- SmartContract ---------
var library_file = fs.readFileSync(`${__dirname}/abis/Library.json`);
let library_json = JSON.parse(library_file);
let library_abi = library_json["abi"];
let library_bytecode = library_json["bytecode"];


module.exports = {
  createAccount: createAccount,
  deployContract: deployContract,
  addBook: addBook,
  getBooks: getBooks,
  reserveBook: reserveBook,
  getReserve: getReserve
}

//========================================
//            AUXILIAR
//========================================
async function getAccount() {
  var account;
  var password;

  if (red == "ganache") {
    var accounts = await web3.eth.personal.getAccounts();
    account = await web3.utils.toChecksumAddress(accounts[1]);
    password = "";

  } else {
    account = await web3.utils.toChecksumAddress(dotenv.parsed.ACCOUNT);
    password = dotenv.parsed.PASSWORD;
  }

  return {"account": account, "password": password };
}

//========================================
//          CREAR UNA CUENTA
//========================================
async function createAccount(password) {
    var accountAddress;
    await web3.eth.personal.newAccount(password).then(function (res) {
      accountAddress = res;
    });
    return accountAddress;
  }
  
  
//========================================
//          DESPLEGAR CONTRATO
//========================================
async function deployContract(account, password) {
    var contractAddress;
    await web3.eth.personal.unlockAccount(account, password, 600);
    let newContract = new web3.eth.Contract(library_abi);
  
    await newContract.deploy({ data: library_bytecode }).send({
      from: account,
      gas: web3.utils.toHex(3000000),
      gasPrice: '0'
    }).then(function (contract) {
      contractAddress = contract.options.address;
    });
  
    return contractAddress;
  }
  
//========================================
//          AÑADIR UN LIBRO
//========================================
async function addBook(tittle, author, editorial) {
    
  var contractAddress = dotenv.parsed.CONTRACT;
  var user = await getAccount();

  await web3.eth.personal.unlockAccount(user.account, user.password, 600);
  let contractInstance = new web3.eth.Contract(library_abi, contractAddress);

  var tx = await contractInstance.methods.addBook(tittle, author, editorial).send({from: user.account, gas: 1000000});

  return tx.transactionHash;
}

//========================================
//             GET LIBROS
//========================================
async function getBooks() {

  var contractAddress = dotenv.parsed.CONTRACT;
  var user = await getAccount();

  await web3.eth.personal.unlockAccount(user.account, user.password, 600);
  let contractInstance = new web3.eth.Contract(library_abi, contractAddress);

  let num = await contractInstance.methods.numberBooks().call({from: user.account});
  let books = new Map();

  for (let i = 0; i < num; i++ ){
    let book = await contractInstance.methods.getBook(i).call({from: user.account});
    books.set(i, {title: book.title, author: book.author, editorial: book.editorial});
  }

  let jsonBooks = {};  
  books.forEach((value, key) => {  
    jsonBooks[key] = value  
  });  

  return jsonBooks;

}


//========================================
//            RESERVAR LIBRO
//========================================
async function reserveBook(name, title) {

  var contractAddress = dotenv.parsed.CONTRACT;
  var user = await getAccount();

  await web3.eth.personal.unlockAccount(user.account, user.password, 600);
  let contractInstance = new web3.eth.Contract(library_abi, contractAddress);

  var date = new Date();
  var tx = await contractInstance.methods.reserveBook(name, title).send({from: user.account, gas: 1000000});

  return tx.transactionHash;
}


//========================================
//           OBTENER RESERVAS 
//========================================
async function getReserve() {

  var contractAddress = dotenv.parsed.CONTRACT;
  var user = await getAccount();

  await web3.eth.personal.unlockAccount(user.account, user.password, 600);
  let contractInstance = new web3.eth.Contract(library_abi, contractAddress);

  let event = await contractInstance.getPastEvents("BookReserve", {
    fromBlock: 0,
    toBlock: "latest"
  });

  let reserve = new Map();

  for (let i = 0; i < event.length; i++) {
    reserve.set(i, event[i].returnValues);
  }

  let jsonReserve = {};  
  reserve.forEach((value, key) => {  
    jsonReserve[key] = value
  });  

  return jsonReserve;
}