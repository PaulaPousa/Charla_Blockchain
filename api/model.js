const Web3 = require('web3');
const fs = require('fs');
const path = require("path");

const dotenv = require('dotenv').config({
  path: path.join(__dirname,'.env_variables')
});



//----- Ganache -----
let url = "http://localhost:8545"
var accountAddress = "0x23752F5C8265FBb76781F2747DACC16c2cD010A1";
var accountPassword = "";

//----- Quorum -----
/*let url = http://localhost:22000
var contractAddress = dotenv.parsed.CONTRACT;
var accountAddress = dotenv.parsed.ACCOUNT;
var accountPassword = dotenv.parsed.PASSWORD;*/

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
  reserveBook: reserveBook
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

  await web3.eth.personal.unlockAccount(accountAddress, accountPassword, 600);
  let contractInstance = new web3.eth.Contract(library_abi, contractAddress);

  var tx = await contractInstance.methods.addBook(tittle, author, editorial).send({from: accountAddress, gas: 1000000});

  return tx.transactionHash;
}

//========================================
//             GET LIBROS
//========================================
async function getBooks() {

  var contractAddress = dotenv.parsed.CONTRACT;

  await web3.eth.personal.unlockAccount(accountAddress, accountPassword, 600);
  let contractInstance = new web3.eth.Contract(library_abi, contractAddress);

  let num = await contractInstance.methods.numberBooks().call({from: accountAddress});
  let books = new Map();

  for (let i = 0; i < num; i++ ){
    let book = await contractInstance.methods.getBook(i).call({from: accountAddress});
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
async function reserveBook(user, title) {

  var contractAddress = dotenv.parsed.CONTRACT;

  await web3.eth.personal.unlockAccount(accountAddress, accountPassword, 600);
  let contractInstance = new web3.eth.Contract(library_abi, contractAddress);

  var date = Date.now();
  var tx = await contractInstance.methods.reserveBook(user, title, date.toString()).send({from: accountAddress, gas: 1000000});

  return tx.transactionHash;
}
