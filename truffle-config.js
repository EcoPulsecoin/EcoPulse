require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const HDWalletProvider = require('@truffle/hdwallet-provider'); // Importa o HDWalletProvider

const { PRIVATE_KEY, BSC_NODE_URL } = process.env; // Obtém a chave privada e a URL do nó BSC

// Verifica se as variáveis de ambiente estão definidas
if (!PRIVATE_KEY || !BSC_NODE_URL) {
  throw new Error("Por favor, defina as variáveis de ambiente PRIVATE_KEY e BSC_NODE_URL no arquivo .env");
}

module.exports = {
  networks: {
    // Configuração para a Binance Smart Chain (BSC) Mainnet
    bsc: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, BSC_NODE_URL), // Cria o provedor usando a chave privada e URL da BSC
      network_id: 56,       // ID da rede Binance Smart Chain
      confirmations: 2,     // Número de confirmações a esperar entre as implantações (padrão: 0)
      timeoutBlocks: 200,   // Número de blocos antes que a implantação expire (mínimo/padrão: 50)
      skipDryRun: true      // Pular execução seca antes das migrações? (padrão: false para redes públicas)
    },
    
    // Configuração para a Binance Smart Chain Testnet
    bsc_testnet: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, 'https://rpc.ankr.com/bsc_testnet'), // Para Testnet
      network_id: 97,       // ID da rede Binance Smart Chain Testnet
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    
    // Configuração para desenvolvimento local com Ganache
    development: {
      host: "127.0.0.1",    // Localhost
      port: 8545,           // Porta padrão do Ganache
      network_id: "*",      // Qualquer rede (útil para desenvolvimento local)
    }
  },

  mocha: {
    // timeout: 100000 // Descomente e ajuste se precisar de mais tempo para os testes
  },

  compilers: {
    solc: {
      version: "0.8.21", // Especifica a versão do Solidity para o compilador
    }
  },
};
