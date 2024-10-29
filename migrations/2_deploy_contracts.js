const EcoPulse = artifacts.require("EcoPulse");

module.exports = function(deployer) {
  deployer.deploy(EcoPulse);
};

