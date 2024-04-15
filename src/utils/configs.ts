export const WEB3 = {
  JSON_RPC_URL: "https://sepolia.base.org/",
  CHAIN_ID: 84532,
  CHAIN_NAME: "Base Sepolia",
  SCAN_TX: "https://sepolia-explorer.base.org/tx/",
  SCAN_ADDRESS: "https://sepolia-explorer.base.org/address/",
  SCAN_URL: "https://sepolia-explorer.base.org/",
  SYMBOL: "ETH",
  ROUTER: {
    address: "0x76C22725a5F1cD88577929d58bBBbC8D007B17b4",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_factory",
            type: "address",
          },
          {
            internalType: "address",
            name: "_WETH",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "WETH",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenA",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenB",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountADesired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountBDesired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountAMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountBMin",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "addLiquidity",
        outputs: [
          {
            internalType: "uint256",
            name: "amountA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountB",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "liquidity",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountTokenDesired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountTokenMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountETHMin",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "addLiquidityETH",
        outputs: [
          {
            internalType: "uint256",
            name: "amountToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountETH",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "liquidity",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "factory",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveOut",
            type: "uint256",
          },
        ],
        name: "getAmountIn",
        outputs: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveOut",
            type: "uint256",
          },
        ],
        name: "getAmountOut",
        outputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
        ],
        name: "getAmountsIn",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
        ],
        name: "getAmountsOut",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenA",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenB",
            type: "address",
          },
        ],
        name: "getReserves",
        outputs: [
          {
            internalType: "uint256",
            name: "reserveA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveB",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenA",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenB",
            type: "address",
          },
        ],
        name: "pairFor",
        outputs: [
          {
            internalType: "address",
            name: "pair",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveB",
            type: "uint256",
          },
        ],
        name: "quote",
        outputs: [
          {
            internalType: "uint256",
            name: "amountB",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenA",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenB",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "liquidity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountAMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountBMin",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "removeLiquidity",
        outputs: [
          {
            internalType: "uint256",
            name: "amountA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountB",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "liquidity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountTokenMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountETHMin",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "removeLiquidityETH",
        outputs: [
          {
            internalType: "uint256",
            name: "amountToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountETH",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "liquidity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountTokenMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountETHMin",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "approveMax",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "removeLiquidityETHWithPermit",
        outputs: [
          {
            internalType: "uint256",
            name: "amountToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountETH",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenA",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenB",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "liquidity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountAMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountBMin",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "approveMax",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "removeLiquidityWithPermit",
        outputs: [
          {
            internalType: "uint256",
            name: "amountA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountB",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "swapETHForExactTokens",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOutMin",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "swapExactETHForTokens",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMin",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "swapExactTokensForETH",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMin",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "swapExactTokensForTokens",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountInMax",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "swapTokensForExactETH",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountInMax",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "path",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "swapTokensForExactTokens",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
  },

  ERC20: {
    usdt: "0x1F6b02688350a1aedEd79358FBe7D22036c5b73C",
    foc: "0x198028E8c21324De512F369dDF2D404c608034Db",
    eth: "0x4200000000000000000000000000000000000006",
    usdc: "0x79a91CdCBD808A4B01A2D29773a29d74B6e2DeD6",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
  WETH: {
    address: "0x4200000000000000000000000000000000000006",
    abi: [
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_oldAdmin",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_newAdmin",
            type: "address",
          },
        ],
        name: "AdminChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_oldAdmin",
            type: "address",
          },
        ],
        name: "AdminRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Deposit",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_spender",
            type: "address",
          },
        ],
        name: "SpenderUnwhitelisted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_spender",
            type: "address",
          },
        ],
        name: "SpenderWhitelisted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Withdrawal",
        type: "event",
      },
      {
        constant: true,
        inputs: [],
        name: "admin",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { internalType: "address", name: "_owner", type: "address" },
          { internalType: "address", name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "_spender", type: "address" },
          { internalType: "uint256", name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "_success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "_newAdmin", type: "address" },
        ],
        name: "changeAdmin",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "deposit",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "removeAdmin",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "_to", type: "address" },
          { internalType: "uint256", name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "_success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "_from", type: "address" },
          { internalType: "address", name: "_to", type: "address" },
          { internalType: "uint256", name: "_value", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "_success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "_spender", type: "address" },
        ],
        name: "unwhitelist",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "_spender", type: "address" },
        ],
        name: "whitelist",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "whitelisted",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
        name: "withdraw",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
  TOKEN_RECEIVER: {
    usdc: "0x3ad9e46304B7E7A0C66d874B9d478429003E70C8",
    foc: "0x3ad9e46304B7E7A0C66d874B9d478429003E70C8",
    eth: "0x3ad9e46304B7E7A0C66d874B9d478429003E70C8",
  },
};

export const zero = BigInt(0);
