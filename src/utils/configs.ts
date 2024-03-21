export const WEB3 = {
    JSON_RPC_URL: 'https://ronin/rpc',
    CHAIN_ID: 2020,
    CHAIN_NAME: 'Ronin',
    SCAN_TX: 'https://app.roninchain.com/tx/',
    SCAN_ADDRESS: 'https://app.roninchain.com/address/',
    SCAN_URL: 'https://app.roninchain.com/',
    SYMBOL: 'RONIN',
    ERC20: {
        usdt: '0x067fbff8990c58ab90bae3c97241c5d736053f77',
        foc: '0xcBff9d27af2e13Df19C9082276764426DC50eFF7',
        eth: '0x29c6f8349a028e1bdfc68bfa08bdee7bc5d47e16',
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