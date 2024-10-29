/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node.
 * For Binance Smart Chain, you will need to set the BSC node URL.
 */

// require('dotenv').config();
// const { MNEMONIC, BSC_NODE_URL } = process.env;

// const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Configuração para a Binance Smart Chain (BSC)
    bsc: {
      provider: () => new HDWalletProvider(MNEMONIC, BSC_NODE_URL), // Substitua BSC_NODE_URL pela URL do nó BSC
      network_id: 56,       // ID da rede Binance Smart Chain
      confirmations: 2,     // # de confirmações a esperar entre as implantações. (padrão: 0)
      timeoutBlocks: 200,   // # de blocos antes que a implantação expire (mínimo/padrão: 50)
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
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.21",      // Fetch exact version from solc-bin (default: truffle's version)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
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

