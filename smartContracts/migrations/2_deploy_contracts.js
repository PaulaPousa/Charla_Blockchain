const Libreria = artifacts.require("Libreria");

module.exports = function (deployer) {
    deployer.deploy(Libreria);
};
