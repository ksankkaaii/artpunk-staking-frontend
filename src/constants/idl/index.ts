export type ArtpunkStaking = {
  "version": "0.1.0",
  "name": "artpunk_staking",
  "instructions": [
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        },
        {
          "name": "bumpData",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpKey",
          "type": "u8"
        },
        {
          "name": "bumpSigner",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateAttribute",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "attribute",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenType",
          "type": "u8"
        },
        {
          "name": "attribute",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        },
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "retrieve",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "artpunk",
            "type": "u32"
          },
          {
            "name": "achivement",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "nfts",
            "type": {
              "array": [
                {
                  "defined": "NftInfo"
                },
                500
              ]
            }
          },
          {
            "name": "current",
            "type": "u32"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "bumpSigner",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "poolKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "NftInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "lastTime",
            "type": "u32"
          },
          {
            "name": "tokenType",
            "type": "u8"
          },
          {
            "name": "attribute",
            "type": "u8"
          },
          {
            "name": "reward",
            "type": "u64"
          },
          {
            "name": "totalReward",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidToken",
      "msg": "Invalid token"
    },
    {
      "code": 6001,
      "name": "InvalidAttribute",
      "msg": "Invalid token attribute"
    },
    {
      "code": 6002,
      "name": "TokenNotExist",
      "msg": "Token not exist"
    },
    {
      "code": 6003,
      "name": "AuthorityInvalid",
      "msg": "Authority is invalid"
    }
  ]
};

export const IDL: ArtpunkStaking = {
  "version": "0.1.0",
  "name": "artpunk_staking",
  "instructions": [
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        },
        {
          "name": "bumpData",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpKey",
          "type": "u8"
        },
        {
          "name": "bumpSigner",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateAttribute",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "attribute",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenType",
          "type": "u8"
        },
        {
          "name": "attribute",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        },
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "retrieve",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "poolSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "artpunk",
            "type": "u32"
          },
          {
            "name": "achivement",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "nfts",
            "type": {
              "array": [
                {
                  "defined": "NftInfo"
                },
                500
              ]
            }
          },
          {
            "name": "current",
            "type": "u32"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "bumpSigner",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "poolKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "NftInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "lastTime",
            "type": "u32"
          },
          {
            "name": "tokenType",
            "type": "u8"
          },
          {
            "name": "attribute",
            "type": "u8"
          },
          {
            "name": "reward",
            "type": "u64"
          },
          {
            "name": "totalReward",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidToken",
      "msg": "Invalid token"
    },
    {
      "code": 6001,
      "name": "InvalidAttribute",
      "msg": "Invalid token attribute"
    },
    {
      "code": 6002,
      "name": "TokenNotExist",
      "msg": "Token not exist"
    },
    {
      "code": 6003,
      "name": "AuthorityInvalid",
      "msg": "Authority is invalid"
    }
  ]
};
