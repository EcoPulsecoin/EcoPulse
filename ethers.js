const { ethers } = require("ethers");

// Carregue sua chave privada do ambiente
const privateKey = process.env.PRIVATE_KEY;

// Conecte-se à Binance Smart Chain
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const wallet = new ethers.Wallet(privateKey, provider);

// Agora você pode usar o wallet para interagir com a BSC

