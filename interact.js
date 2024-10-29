const Web3 = require('web3').default; // Importa o Web3
// Importa a ABI do contrato EcoPulse
const contractABI = require('./build/contracts/EcoPulse.json').abi;
// Conectar ao nó da Binance Smart Chain
const web3 = new Web3('https://bsc-dataseed.binance.org/');

// Endereço do seu contrato (substitua pelo seu endereço real)
const contractAddress = '0x1234567890abcdef1234567890abcdef12345678'; // Substitua pelo seu endereço real

// Cria uma instância do contrato
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Função para interagir com o contrato
async function interactWithContract() {
  const accounts = await web3.eth.getAccounts(); // Obtém as contas conectadas (se usando MetaMask)
  const account = accounts[0]; // Usa a primeira conta

  // Exemplo: Chamada da função totalSupply
  try {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log('Total Supply:', totalSupply.toString());
  } catch (error) {
    console.error('Erro ao chamar totalSupply:', error);
  }

  // Exemplo: Chamada da função balanceOf para obter o saldo do usuário
  try {
    const balance = await contract.methods.balanceOf(account).call();
    console.log('Saldo do usuário:', balance.toString());
  } catch (error) {
    console.error('Erro ao chamar balanceOf:', error);
  }

  // Exemplo: Transferindo tokens
  const recipient = '0x404fE53D4667fee1AF3086802550EF729567a920'; // Seu endereço
  const amount = web3.utils.toWei('10', 'ether'); // Quantidade de tokens a transferir (ajuste conforme a unidade do seu token)

  try {
    const transferResult = await contract.methods.transfer(recipient, amount).send({ from: account });
    console.log('Transferência realizada:', transferResult);
  } catch (error) {
    console.error('Erro na transferência:', error);
  }

  // Exemplo: Aprovando um gasto de tokens
  const spender = '0x404fE53D4667fee1AF3086802550EF729567a920'; // Seu endereço
  const allowanceAmount = web3.utils.toWei('5', 'ether'); // Quantidade a ser aprovada

  try {
    const approvalResult = await contract.methods.approve(spender, allowanceAmount).send({ from: account });
    console.log('Aprovação realizada:', approvalResult);
  } catch (error) {
    console.error('Erro na aprovação:', error);
  }
}

// Executa a função
interactWithContract();

