const { ethers } = require("ethers");

// Carregue sua chave privada do ambiente
const privateKey = process.env.PRIVATE_KEY;

// Verifica se a chave privada está definida
if (!privateKey) {
    throw new Error("Por favor, defina a variável de ambiente PRIVATE_KEY com sua chave privada.");
}

// Conecte-se à Binance Smart Chain
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const wallet = new ethers.Wallet(privateKey, provider);

// Agora você pode usar o wallet para interagir com a BSC

async function checkBalance() {
    const balance = await wallet.getBalance(); // Obtém o saldo em wei
    console.log(`Saldo: ${ethers.utils.formatEther(balance)} BNB`); // Formata o saldo para BNB
}

// Chama a função para verificar o saldo
checkBalance().catch((error) => {
    console.error("Erro ao verificar o saldo:", error);
});

// Aqui você pode adicionar outras funções para interagir com contratos inteligentes, enviar transações, etc.

