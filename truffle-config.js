require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const { MNEMONIC, BSC_NODE_URL } = process.env; // Obtém a frase-semente e a URL do nó BSC

const HDWalletProvider = require('@truffle/hdwallet-provider'); // Importa o HDWalletProvider

module.exports = {
  networks: {
    // Configuração para a Binance Smart Chain (BSC)
    bsc: {
      provider: () => new HDWalletProvider(MNEMONIC, BSC_NODE_URL), // Cria um provedor com a frase-semente e a URL do nó BSC
      network_id: 56,       // ID da rede Binance Smart Chain
      confirmations: 2,     // Número de confirmações a esperar entre as implantações (padrão: 0)
      timeoutBlocks: 200,   // Número de blocos antes que a implantação expire (mínimo/padrão: 50)
      skipDryRun: true      // Pular execução seca antes das migrações? (padrão: false para redes públicas)
    },
    
    // Para desenvolvimento local com Ganache
    development: {
      host: "127.0.0.1",    // Localhost
      port: 8545,           // Porta padrão do Ganache
      network_id: "*",      // Qualquer rede
    }
  },

  mocha: {
    // timeout: 100000 // Descomente e ajuste se precisar de mais tempo para os testes
  },

  compilers: {
    solc: {
      version: "0.8.21",      // Fetch exact version from solc-bin (default: truffle's version)
      // settings: {          // Veja a documentação do Solidity para orientações sobre otimização e evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Configuração do Truffle DB (opcional)
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};

