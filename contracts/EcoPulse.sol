// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol"; // Importa o Ownable corretamente
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // Importa a interface IERC20

contract EcoPulse is Ownable {
    string public name = "EcoPulse";
    string public symbol = "ECO";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public publicSaleAddress = 0x678588c560EC4CCbE2Fa0bF69b7E62A3Ce831985;
    address public projectFundingAddress = 0x5cFa3E73d534f768DC3a56E07505E39707A2b958;
    address public sustainabilityChallengesAddress = 0xBcec487543db5b306BB0b19002eABA4c2FA8cA80; // Endereço para sustentabilidade

    uint256 public preSaleStartTime;
    uint256 public preSaleEndTime;
    uint256 public tokenPriceBNBPreSale = 0.00035 ether; // Preço em BNB para pré-venda
    uint256 public tokenPriceUSDTPreSale = 201 * 10 ** 16; // 2.01 USDT em wei
    uint256 public tokenPriceBNBPublicSale = 0.01 ether; // Preço em BNB para venda pública
    uint256 public tokenPriceUSDTPublicSale = 575 * 10 ** 16; // 5.75 USDT em wei

    address public USDTContractAddress;
    mapping(address => uint256) public balances;
    bool public preSaleEnded = false;

    constructor(uint256 _totalSupply, address _USDTContractAddress) 
        Ownable(0xBcec487543db5b306BB0b19002eABA4c2FA8cA80) { // Passando o endereço do proprietário
        totalSupply = _totalSupply;
        USDTContractAddress = _USDTContractAddress;
        _distributeTokens();

        preSaleStartTime = 1738963200; // 6 de novembro de 2024
        preSaleEndTime = 1701388800;   // 1 de dezembro de 2024
    }

    function _distributeTokens() internal {
        uint256 distributionTokens = (totalSupply * 30) / 100;
        uint256 projectFundingTokens = (distributionTokens * 20) / 30;
        uint256 sustainabilityTokens = (distributionTokens * 5) / 30;

        balances[publicSaleAddress] = distributionTokens;
        balances[projectFundingAddress] = projectFundingTokens;
        balances[sustainabilityChallengesAddress] = sustainabilityTokens;
    }

    function buyTokensWithBNB() external payable {
        require(block.timestamp >= preSaleStartTime && block.timestamp <= preSaleEndTime, "Fora do periodo de pre-venda.");

        uint256 price = preSaleEnded ? tokenPriceBNBPublicSale : tokenPriceBNBPreSale;
        uint256 tokensToBuy = msg.value / price;
        require(tokensToBuy > 0, "Valor de compra insuficiente.");

        balances[msg.sender] += tokensToBuy;
    }

    function buyTokensWithUSDT(uint256 amount) external {
        require(block.timestamp >= preSaleStartTime && block.timestamp <= preSaleEndTime, "Fora do periodo de pre-venda.");

        uint256 price = preSaleEnded ? tokenPriceUSDTPublicSale : tokenPriceUSDTPreSale;
        uint256 tokensToBuy = amount / price;
        require(tokensToBuy > 0, "Valor de compra insuficiente.");

        IERC20(USDTContractAddress).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += tokensToBuy;
    }

    function endPreSale() external onlyOwner {
        require(block.timestamp > preSaleEndTime, "A pre-venda ainda esta ativa.");
        preSaleEnded = true;
    }

    function withdrawBNB() external onlyOwner {
        uint256 bnbBalance = address(this).balance;
        payable(publicSaleAddress).transfer(bnbBalance);
    }

    function withdrawUSDT() external onlyOwner {
        uint256 usdtBalance = IERC20(USDTContractAddress).balanceOf(address(this));
        IERC20(USDTContractAddress).transfer(publicSaleAddress, usdtBalance);
    }
}
