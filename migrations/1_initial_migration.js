const EcoPulse = artifacts.require("EcoPulse");

module.exports = function (deployer) {
    // Definindo o total supply do token EcoPulse (2 milhões)
    const totalSupply = web3.utils.toWei("2000000", "ether"); // Total supply de 2 milhões de tokens

    // Endereço do contrato USDT que será usado para as transações
    const usdtContractAddress = "0x524bC91Dc82d6b90EF29F76A3ECAaBAffFD490Bc"; // Exemplo de endereço USDT

    // Executando o deploy do contrato EcoPulse
    deployer.deploy(EcoPulse, totalSupply, usdtContractAddress);
};
