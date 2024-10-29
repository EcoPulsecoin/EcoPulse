// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// Importa a implementação do token ERC20 da biblioteca OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EcoPulse is ERC20 {
    address public owner; // Armazena o endereço do proprietário
    uint256 public taxPercentage = 2; // 2% de taxa
    uint256 public burnPercentage = 1; // 1% dos tokens queimados
    mapping(address => bool) public isExcludedFromTax; // Mapeia endereços excluídos da taxa

    // Eventos para rastreamento
    event TaxPaid(address indexed from, uint256 amount); // Evento para taxas pagas
    event TokensBurned(address indexed from, uint256 amount); // Evento para tokens queimados
    event PreSaleStarted(uint256 endTime); // Evento para início da pré-venda
    event TokensDistributed(address indexed recipient, uint256 amount); // Evento para distribuição de tokens

    // Variáveis da pré-venda
    uint256 public preSaleEndTime;
    mapping(address => uint256) public contributions;

    // Modificador onlyOwner para restringir funções ao proprietário
    modifier onlyOwner() {
        require(msg.sender == owner, "Somente o proprietário pode executar esta funcao");
        _;
    }

    // Construtor do contrato
    constructor() ERC20("EcoPulse", "ECO") {
        owner = msg.sender; // Define o proprietário inicial como o criador do contrato
        _mint(address(this), 2000000 * 10 ** decimals()); // Mintar 2 milhões de tokens para a venda
        isExcludedFromTax[msg.sender] = true; // Excluir o criador do contrato das taxas
    }

    // Função para iniciar a pré-venda
    function startPreSale(uint256 duration) external onlyOwner {
        preSaleEndTime = block.timestamp + duration; // Define o tempo de término da pré-venda
        emit PreSaleStarted(preSaleEndTime); // Emitir evento de início da pré-venda
    }

    // Função de compra de tokens durante a pré-venda
    function buyTokens() external payable {
        require(block.timestamp < preSaleEndTime, "A pre-venda acabou");
        require(msg.value > 0, "Envie BNB para comprar tokens");

        uint256 tokensToTransfer = msg.value; // Defina a taxa de câmbio como desejado
        contributions[msg.sender] += tokensToTransfer;
    }

    // Função para finalizar a pré-venda e distribuir os tokens
    function finalizePreSale() external onlyOwner {
        require(block.timestamp >= preSaleEndTime, "A pre-venda ainda está em andamento");

        for (uint256 i = 0; i < getAllContributors().length; i++) { // Loop através de todos os contribuintes
            address account = getAllContributors()[i];
            uint256 amount = contributions[account];
            if (amount > 0) {
                _transfer(address(this), account, amount); // Transferir tokens para o contribuinte
                emit TokensDistributed(account, amount); // Emitir evento de distribuição de tokens
                contributions[account] = 0; // Zerar a contribuição após a transferência
            }
        }
    }

    // Função para retornar todos os contribuintes (para exemplo, pode ser otimizado)
    function getAllContributors() internal view returns (address[] memory) {
        // Implemente lógica para retornar todos os contribuintes
        // Isso pode ser armazenado em um array ou mapeamento dependendo da sua necessidade
    }

    // Função de transferência com lógica de taxa e queima
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount > 0, "O valor deve ser maior que zero");
        require(amount <= balanceOf(msg.sender), "Saldo insuficiente");

        uint256 tax = (amount * taxPercentage) / 100; // Calcula a taxa
        uint256 burnAmount = (amount * burnPercentage) / 100; // Calcula a quantidade a queimar
        uint256 transferAmount = amount - tax - burnAmount; // Quantidade a ser transferida

        require(transferAmount > 0, "Transferencia resultara em valor negativo");

        // Se a taxa for maior que zero e o remetente não estiver excluído da taxa
        if (tax > 0 && !isExcludedFromTax[msg.sender]) {
            _transfer(msg.sender, owner, tax); // Envia a taxa para o proprietário
            emit TaxPaid(msg.sender, tax); // Emitir evento de taxa paga
        }

        // Se houver tokens a serem queimados
        if (burnAmount > 0) {
            _burn(msg.sender, burnAmount); // Queimar tokens
            emit TokensBurned(msg.sender, burnAmount); // Emitir evento de tokens queimados
        }

        _transfer(msg.sender, recipient, transferAmount); // Transferir o restante
        return true; // Retorna verdadeiro se a transferência for bem-sucedida
    }

    // Função para excluir um endereço da taxa
    function excludeFromTax(address account) external onlyOwner {
        isExcludedFromTax[account] = true;
    }

    // Função para incluir um endereço na taxa
    function includeInTax(address account) external onlyOwner {
        isExcludedFromTax[account] = false;
    }

    // Função para alterar a porcentagem da taxa
    function setTaxPercentage(uint256 newTaxPercentage) external onlyOwner {
        taxPercentage = newTaxPercentage;
    }

    // Função para alterar a porcentagem da queima
    function setBurnPercentage(uint256 newBurnPercentage) external onlyOwner {
        burnPercentage = newBurnPercentage;
    }

    // Função para retirar BNB acumulado pelo dono
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance); // Retira o saldo acumulado em BNB
    }
}

