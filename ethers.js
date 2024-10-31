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

// Endereço do contrato USDT
const usdtContractAddress = "0x524bC91Dc82d6b90EF29F76A3ECAaBAffFD490Bc";

// ABI do contrato USDT
const usdtABI = [
  // ABI do contrato USDT
  {
    "constant": true,
    "inputs": [],
    "name": "balanceOf",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Criar uma instância do contrato USDT
const usdtContract = new ethers.Contract(usdtContractAddress, usdtABI, wallet);

// Função para verificar saldo de BNB e USDT
async function checkBalances() {
    try {
        // Verificar saldo em BNB
        const bnbBalance = await wallet.getBalance();
        console.log(`Saldo: ${ethers.utils.formatEther(bnbBalance)} BNB`);

        // Verificar saldo em USDT
        const usdtBalance = await usdtContract.balanceOf(wallet.address);
        console.log(`Saldo USDT: ${ethers.utils.formatUnits(usdtBalance, 6)} USDT`); // USDT tem 6 casas decimais
    } catch (error) {
        console.error("Erro ao verificar os saldos:", error);
    }
}

// Chama a função para verificar os saldos
checkBalances().catch((error) => {
    console.error("Erro ao executar a função de verificação de saldos:", error);
});

// Aqui você pode adicionar outras funções para interagir com contratos inteligentes, enviar transações, etc.
