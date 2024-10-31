// SPDX-License-Identifier: MIT
// @custom:dev-run-script
// Este script é usado para implantar o contrato EcoPulse, iniciar a pré-venda e permitir interações com o contrato.

const { ethers } = require("hardhat");

async function main() {
    // Obtém o contrato EcoPulse
    const EcoPulse = await ethers.getContractFactory("EcoPulse");

    // Implanta o contrato
    const ecoPulse = await EcoPulse.deploy();
    await ecoPulse.deployed();

    console.log("Contrato EcoPulse implantado na:", ecoPulse.address);

    // Inicia a pré-venda por um período de 7 dias (7 * 24 * 60 * 60 segundos)
    const duration = 7 * 24 * 60 * 60; // 7 dias
    const startTx = await ecoPulse.startPreSale(duration);
    await startTx.wait();
    console.log("Pré-venda iniciada por um período de 7 dias.");

    // Exemplo de compra de tokens
    const [buyer] = await ethers.getSigners(); // Pega o primeiro endereço da lista de signatários

    // Simula a compra de tokens durante a pré-venda
    const amountToSend = ethers.utils.parseEther("1"); // Envia 1 BNB
    console.log(`Tentando comprar tokens enviando ${ethers.utils.formatEther(amountToSend)} BNB...`);
    
    const buyTx = await buyer.sendTransaction({
        to: ecoPulse.address,
        value: amountToSend,
    });
    await buyTx.wait();
    console.log("Tokens comprados com sucesso!");

    // Verifica o saldo do comprador após a compra
    const buyerBalance = await ecoPulse.balanceOf(buyer.address);
    console.log(`Saldo de tokens do comprador: ${ethers.utils.formatEther(buyerBalance)} ECO`);

    // Finaliza a pré-venda
    console.log("Finalizando a pré-venda...");
    const finalizeTx = await ecoPulse.finalizePreSale();
    await finalizeTx.wait();
    console.log("Pré-venda finalizada e tokens distribuídos aos contribuintes.");

    // Retira BNB acumulado (se houver)
    console.log("Retirando BNB acumulado...");
    const withdrawTx = await ecoPulse.withdrawBNB();
    await withdrawTx.wait();
    console.log("BNB retirado com sucesso.");
}

// Captura erros e exibe na saída do console
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
