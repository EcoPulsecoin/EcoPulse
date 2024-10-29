const Web3 = require('web3').default; // Importando Web3
const web3 = new Web3('http://127.0.0.1:8545'); // Conectando ao Ganache

async function main() {
    // Listar contas disponíveis
    const accounts = await web3.eth.getAccounts();
    console.log("Available Accounts: ", accounts);

    // Verificando saldo da primeira conta
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(`Balance of account ${accounts[0]}: ${web3.utils.fromWei(balance, 'ether')} ETH`);

    // Função para transferir ETH
    await transferEther(accounts[0], accounts[1], 0.1);

    // Função para verificar saldo de uma conta específica
    await checkBalance(accounts[1]);

    // Placeholder para interagir com um contrato inteligente
    await interactWithContract(accounts[0]);
}

// Função para transferir ETH
async function transferEther(from, to, amount) {
    const tx = {
        from: from,
        to: to,
        value: web3.utils.toWei(amount.toString(), 'ether'),
    };

    const receipt = await web3.eth.sendTransaction(tx);
    console.log(`Transaction successful with hash: ${receipt.transactionHash}`);
}

// Função para verificar saldo
async function checkBalance(account) {
    const balance = await web3.eth.getBalance(account);
    console.log(`New balance of account ${account}: ${web3.utils.fromWei(balance, 'ether')} ETH`);
}

// Placeholder para interagir com um contrato inteligente
async function interactWithContract(account) {
    // Aqui você pode adicionar a lógica para interagir com seu contrato inteligente
    console.log(`Interacting with contract as account ${account}...`);
    // Exemplo: await contract.methods.yourMethod().send({ from: account });
}

main();

