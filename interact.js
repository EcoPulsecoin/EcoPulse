const Web3 = require('web3').default; // Certifique-se de usar a propriedade .default se necessário
const EcoPulseABI = require('./build/contracts/EcoPulse.json'); // Ajuste o caminho para o EcoPulse.json
const web3 = new Web3('https://bsc-dataseed.binance.org/'); // URL do nó da Binance Smart Chain

const contractAddress = '0xSeuEndereçoDoContratoAqui'; // Substitua pelo endereço real do seu contrato
const accountAddress = '0xSeuEndereçoDaContaAqui'; // Substitua pelo endereço da conta que você deseja consultar

const contract = new web3.eth.Contract(EcoPulseABI.abi, contractAddress); // Utilize o ABI do contrato

// Exemplo de chamada para totalSupply
async function getTotalSupply() {
    try {
        const totalSupply = await contract.methods.totalSupply().call();
        console.log("Total Supply:", totalSupply.toString()); // Converta para string para uma melhor legibilidade
    } catch (error) {
        console.error("Erro ao chamar totalSupply:", error);
    }
}

// Exemplo de chamada para balanceOf
async function getBalanceOf() {
    try {
        const balance = await contract.methods.balanceOf(accountAddress).call();
        console.log("Balance:", balance.toString()); // Converta para string para uma melhor legibilidade
    } catch (error) {
        console.error("Erro ao chamar balanceOf:", error);
    }
}

// Executando as funções
getTotalSupply();
getBalanceOf();
