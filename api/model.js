const Web3 = require('web3');
const fs = require('fs');
const path = require("path");

const dotenv = require('dotenv').config({
  path: path.join(__dirname,'.env_variables')
});



//----- Ganache -----
let url = "http://localhost:8545"
var accountAddress = "0x8fF973D270FD237126bD31C91dbBcaFeFFEDC9Ab";
var accountPassword = "";

//----- Quorum -----
/*let url = http://localhost:22000
var contractAddress = dotenv.parsed.CONTRACT;
var accountAddress = dotenv.parsed.ACCOUNT;
var accountPassword = dotenv.parsed.PASSWORD;*/

var web3 = new Web3(new Web3.providers.HttpProvider(url));


//------- SmartContract ---------
var libreria_file = fs.readFileSync(`${__dirname}/abis/Libreria.json`);
let libreria_json = JSON.parse(libreria_file);
let libreria_abi = libreria_json["abi"];
let libreria_bytecode = libreria_json["bytecode"];


module.exports = {
    crearCuenta: crearCuenta,
    desplegarContrato: desplegarContrato,
    addLibro: addLibro,
    getLibros: getLibros
}  

//========================================
//          CREAR UNA CUENTA
//========================================
async function crearCuenta(password) {
    var accountAddress;
    await web3.eth.personal.newAccount(password).then(function (res) {
      accountAddress = res;
    });
    return accountAddress;
  }
  
  
//========================================
//          DESPLEGAR CONTRATO
//========================================
async function desplegarContrato(account, password) {
    var contractAddress;
    await web3.eth.personal.unlockAccount(account, password, 600);
    let newContract = new web3.eth.Contract(libreria_abi);
  
    await newContract.deploy({ data: libreria_bytecode }).send({
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
async function addLibro(titulo, autor, editorial) {
    
  var contractAddress = dotenv.parsed.CONTRACT;

    await web3.eth.personal.unlockAccount(accountAddress, accountPassword, 600);
    let contractInstance = new web3.eth.Contract(libreria_abi, contractAddress);

    await contractInstance.methods.addLibro(titulo,autor,editorial).send({from: accountAddress, gas: 1000000});

    return "Libro añadido correctamente";
}

//========================================
//             GET LIBROS
//========================================
async function getLibros() {

  var contractAddress = dotenv.parsed.CONTRACT;

  await web3.eth.personal.unlockAccount(accountAddress, accountPassword, 600);
  let contractInstance = new web3.eth.Contract(libreria_abi, contractAddress);

  let cont = await contractInstance.methods.contLibros().call({from: accountAddress});
  let libros = new Map();

  for (let i = 0; i < cont; i++ ){
    let libro = await contractInstance.methods.getLibro(i).call({from: accountAddress});
    libros.set(i, {titulo: libro.titulo, autor: libro.autor, editorial: libro.editorial});
  }

  let jsonObject = {};  
  libros.forEach((value, key) => {  
      jsonObject[key] = value  
  });  

  return JSON.stringify(jsonObject);

}


//========================================
//            RESERVAR LIBRO
//========================================
async function reservarLibro(name, title) {

  
}