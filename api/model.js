const Web3 = require('web3');
const fs = require('fs');

//----- Ganache -----
let url = "http://localhost:8545"

//----- Quorum -----
//let url = http://localhost:22000

var web3 = new Web3(new Web3.providers.HttpProvider(url));

//------- SmartContract ---------
var libreria_file = fs.readFileSync(`${__dirname}/abis/Libreria.json`);
let libreria_json = JSON.parse(libreria_file);
let libreria_abi = libreria_json["abi"];
let libreria_bytecode = libreria_json["bytecode"];

var contractAddress;

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
async function addLibro(contractAddress, account, password, titulo, autor) {

    await web3.eth.personal.unlockAccount(account, password, 600);
    let contractInstance = new web3.eth.Contract(libreria_abi, contractAddress);
    contractInstance.methods.addLibro(titulo,autor).send({from: account, gas: 1000000});

    return "Añadido";
}

//========================================
//             GET LIBROS
//========================================
async function getLibros(contractAddress, account, password) {

  await web3.eth.personal.unlockAccount(account, password, 600);
  let contractInstance = new web3.eth.Contract(libreria_abi, contractAddress);

  let cont = await contractInstance.methods.contLibros().call({from: account});
  let libros = new Map();

  for (let i = 0; i < cont; i++ ){
    let libro = await contractInstance.methods.getLibro(i).call({from: account});
    console.log(libro);
    libros.set(libro.titulo, {titulo: libro.titulo, autor: libro.autor});
  }

  let tmp;
  for (let [key, value] of libros.entries()) {
    tmp = value.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
    libros.set(key, tmp);
  }

  console.log(libros);

  return "Hola";

}