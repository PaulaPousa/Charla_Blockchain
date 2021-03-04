const Library = artifacts.require("Library");

module.exports = function (deployer) {
    deployer.deploy(Library);
};
