// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Obtém o contrato
    const EcoPulse = await ethers.getContractFactory("EcoPulse");
    
    // Implanta o contrato
    const ecoPulse = await EcoPulse.deploy(); // Não passe parâmetros desnecessários
    
    // Aguarde a transação ser minerada
    await ecoPulse.deployed();

    console.log("Contrato EcoPulse implantado em:", ecoPulse.address);
}

// Executa a função principal
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
