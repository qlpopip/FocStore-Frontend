export const WEB3 = {
    JSON_RPC_URL: 'https://public-01.testnet.thebifrost.io/rpc',
    CHAIN_ID: 49088,
    CHAIN_NAME: 'Bifrost Test',
    SCAN_TX: 'https://explorer.testnet.thebifrost.io/tx/',
    SCAN_ADDRESS: 'https://explorer.testnet.thebifrost.io/address/',
    SCAN_URL: 'https://explorer.testnet.thebifrost.io/',
    SYMBOL: 'BFC',
    ERC20: {
        usdt: '0x9e8FEaE3b313cd9928B685C20A46945fc25aBa15',
        foc: '0x0c527a41d011980e2a4Dd3A8df98831dba077016',
        eth: '0x6c93Cc0145c3cb5a3dBBb9190cc02c7A032E8A78',
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                ],
                name: 'transfer',
                outputs: [
                    {
                        internalType: 'bool',
                        name: '',
                        type: 'bool',
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ],
    },
    TOKEN_RECEIVER: {
        usdt: '0x3ad9e46304B7E7A0C66d874B9d478429003E70C8',
        foc: '0x3ad9e46304B7E7A0C66d874B9d478429003E70C8',
        eth: '0x3ad9e46304B7E7A0C66d874B9d478429003E70C8',
    }
}