export const WEB3 = {
    JSON_RPC_URL: 'https://public-01.testnet.thebifrost.io/rpc',
    CHAIN_ID: 49088,
    CHAIN_NAME: 'Bifrost Test',
    SCAN_TX: 'https://explorer.testnet.thebifrost.io/tx/',
    SCAN_ADDRESS: 'https://explorer.testnet.thebifrost.io/address/',
    SCAN_URL: 'https://explorer.testnet.thebifrost.io/',
    SYMBOL: 'BFC',
    GAME_CONTRACT_ADDRESS: '0xFBBD41170928061eC69d50cc569c802B23F447F5',
    RANDOM_JACKPOT_CONTRACT_ADDRESS: '0x154D8E66b5638f5A33A1CB7C45DEfff4F042a6dD',
    TICKET_JACKPOT_CONTRACT_ADDRESS: '0x3D0FCA2b701a30bBc02D29E8658970f5a0A1B4c0',
    TICKET_ADDRESS: '0xEB3A3ccffbF9A7f026A30Dc8B87ed67Dbbfcf7f0',
    GAME_ABI: [{
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint8',
                        name: 'poolId',
                        type: 'uint8',
                    },
                    {
                        internalType: 'string',
                        name: 'avatarUrl',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'countryCode',
                        type: 'string',
                    },
                    {
                        internalType: 'bool',
                        name: 'upOrDown',
                        type: 'bool',
                    },
                    {
                        internalType: 'string',
                        name: 'whiteLabelId',
                        type: 'string',
                    },
                ],
                internalType: 'struct UpVsDownGameV4.makeTradeStruct',
                name: 'userTrade',
                type: 'tuple',
            },
        ],
        name: 'makeTrade',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    }],
    JACKPOT_ABI: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_rounds",
                    "type": "uint256"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "deadline",
                    "type": "uint256"
                }
            ],
            "name": "playJackpot",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "rounds",
                    "type": "uint256"
                }
            ],
            "name": "PlayJackpot",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "winner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "rank",
                    "type": "uint256"
                }
            ],
            "name": "Jackpot",
            "type": "event"
        },
        ],
    TICKET_ABI: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        ]
}