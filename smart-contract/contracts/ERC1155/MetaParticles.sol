// SPDX-License-Identifier: MIT

/*
███████ ██████   █████  ██████  ███████ ██       █████  ██████  ███████
██      ██   ██ ██   ██ ██   ██ ██      ██      ██   ██ ██   ██ ██
███████ ██████  ███████ ██   ██ █████   ██      ███████ ██████  ███████
     ██ ██      ██   ██ ██   ██ ██      ██      ██   ██ ██   ██      ██
███████ ██      ██   ██ ██████  ███████ ███████ ██   ██ ██████  ███████


███████ ██████   ██████  ██  ██ ███████ ███████
██      ██   ██ ██      ███ ███ ██      ██
█████   ██████  ██       ██  ██ ███████ ███████
██      ██   ██ ██       ██  ██      ██      ██
███████ ██   ██  ██████  ██  ██ ███████ ███████
*/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
// import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MetaParticles is
    ERC1155,
    AccessControl,
    ReentrancyGuard,
    ERC1155Burnable,
    ERC1155Supply
{
    // using Strings for uint256;

    // TOKEN TYPES
    uint256 public constant PARTICLE = 0;
    uint256 public constant ATOM = 1;
    uint256 public constant MOLECULE = 2;

    // ROLES
    /* bytes32 public constant USER_ROLE = keccak256("USER_ROLE"); */
    /*     bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE"); */
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // VARIABLES
    bytes32 public merkleRoot;
    mapping(address => bool) public whitelistClaimed;
    mapping(uint256 => string) private _uris;
    string public hiddenMetadataUri;
    uint256 public cost;
    uint256 public maxSupply;
    uint256 public maxMintAmountPerTx;
    bool public paused = true;
    bool public whitelistMintEnabled = false;
    bool public revealed = false;

    constructor(
        uint256 _cost,
        uint256 _maxSupply,
        uint256 _maxMintAmountPerTx,
        string memory _hiddenMetadataUri
    )
        ERC1155(
            "https://ipfs.io/ipfs/Qmf7YbHu7krH657ErDRs5xezwXqmb7AHLMCbCLrY1hf25x/{id}.json"
        )
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());

        /*   _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); */
        /*   _grantRole(URI_SETTER_ROLE, msg.sender); */
        /*   _grantRole(PAUSER_ROLE, msg.sender); */
        /*   _grantRole(MINTER_ROLE, msg.sender); */

        cost = _cost;
        maxSupply = _maxSupply;
        maxMintAmountPerTx = _maxMintAmountPerTx;
        setHiddenMetadataUri(_hiddenMetadataUri);
        /*    _mint(msg.sender, PARTICLE, 10000, "");
        _mint(msg.sender, ATOM, 0, "");
        _mint(msg.sender, MOLECULE, 0, ""); */
    }

    /*     function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    } */
    /*
    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return (_uris[_tokenId]);
    }

    function setTokenUri(uint256 _tokenId, string memory _uri)
        public
        onlyRole(URI_SETTER_ROLE)
    {
        require(bytes(_uris[_tokenId]).length == 0, "Cannot set uri twice");
        _uris[_tokenId] = _uri;
    } */

    modifier mintCompliance(uint256 _mintAmount, uint256 _tokenId) {
        require(
            _mintAmount > 0 && _mintAmount <= maxMintAmountPerTx,
            "Invalid mint amount!"
        );
        require(
            totalSupply(_tokenId) + _mintAmount <= maxSupply,
            "Max supply exceeded!"
        );
        _;
    }

    modifier mintPriceCompliance(uint256 _mintAmount) {
        require(msg.value >= cost * _mintAmount, "Insufficient funds!");
        _;
    }

    // WIP
    function whitelistMint(
        uint256 _tokenId,
        uint256 _mintAmount,
        bytes32[] calldata _merkleProof
    )
        public
        payable
        mintCompliance(_mintAmount, _tokenId)
        mintPriceCompliance(_mintAmount)
    {
        // Verify whitelist requirements
        require(whitelistMintEnabled, "The whitelist sale is not enabled!");
        require(!whitelistClaimed[_msgSender()], "Address already claimed!");
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid proof!"
        );

        whitelistClaimed[_msgSender()] = true;
        // _safeMint(_msgSender(), _mintAmount); TODO
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    function setRevealed(bool _state) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revealed = _state;
    }

    function setCost(uint256 _cost) public onlyRole(DEFAULT_ADMIN_ROLE) {
        cost = _cost;
    }

    function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        maxMintAmountPerTx = _maxMintAmountPerTx;
    }

    function setHiddenMetadataUri(string memory _hiddenMetadataUri)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        hiddenMetadataUri = _hiddenMetadataUri;
    }

    function setPaused(bool _state) public onlyRole(PAUSER_ROLE) {
        paused = _state;
    }

    function setMerkleRoot(bytes32 _merkleRoot)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        merkleRoot = _merkleRoot;
    }

    function setWhitelistMintEnabled(bool _state)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        whitelistMintEnabled = _state;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        require(!paused, "The contract is paused!");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function withdraw() public onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
        // This will pay 5% of the initial sale.
        // =============================================================================
        (bool hs, ) = payable(0x41077189D7E8f90680824d384D0DA501b3e7f33b).call{
            value: (address(this).balance * 5) / 100
        }("");
        require(hs);
        // =============================================================================

        // This will transfer the remaining contract balance to the owner.
        // Do not remove this otherwise you will not be able to withdraw the funds.
        // =============================================================================
        (bool os, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(os);
        // =============================================================================
    }
}
