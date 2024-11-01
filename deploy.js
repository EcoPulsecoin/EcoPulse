// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    const EcoPulse = await ethers.getContractFactory("EcoPulse");
    const totalSupply = ethers.utils.parseUnits("2000000", 18); // Supondo que você tenha 2 milhões de tokens com 18 casas decimais
    const USDTContractAddress = "0x524bC91Dc82d6b90EF29F76A3ECAaBAffFD490Bc"; // Substitua pelo endereço real do contrato USDT

    const ecoPulse = await EcoPulse.deploy(totalSupply, USDTContractAddress);
    await ecoPulse.deployed();

    console.log("EcoPulse deployed to:", ecoPulse.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
