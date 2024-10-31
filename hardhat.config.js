// Importa o Hardhat Toolbox
require('@nomicfoundation/hardhat-toolbox'); // Use o Hardhat Toolbox
require('dotenv').config(); // Para usar variáveis de ambiente

module.exports = {
    solidity: "0.8.21", // Defina a versão do Solidity que você está usando
    networks: {
        bsc_testnet: {
            url: process.env.BSC_TESTNET_URL || "https://data-seed-prebsc-1-s1.binance.org:8545/",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
        }
    }
};
