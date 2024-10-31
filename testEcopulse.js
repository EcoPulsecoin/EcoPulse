const { ethers } = require("ethers");
require('dotenv').config(); // Carrega as variáveis de ambiente

// Carrega a chave privada e a URL do nó do ambiente
const privateKey = process.env.PRIVATE_KEY;
const bscNodeUrl = process.env.BSC_NODE_URL;

console.log("Private Key:", privateKey);
console.log("BSC Node URL:", bscNodeUrl);

// Verifica se a chave privada e a URL do nó estão definidas
if (!privateKey) {
    throw new Error("Por favor, defina a variável de ambiente PRIVATE_KEY no arquivo .env.");
}
if (!bscNodeUrl) {
    throw new Error("Por favor, defina a variável de ambiente BSC_NODE_URL no arquivo .env.");
}

// Conecta-se à Binance Smart Chain usando a URL do nó
const provider = new ethers.providers.JsonRpcProvider(bscNodeUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Função para verificar o saldo
async function checkBalance() {
    const balance = await wallet.getBalance(); // Obtém o saldo em wei
    console.log(`Saldo: ${ethers.utils.formatEther(balance)} BNB`); // Formata o saldo para BNB
}

// Chama a função para verificar o saldo
checkBalance().catch((error) => {
    console.error("Erro ao verificar o saldo:", error);
});
