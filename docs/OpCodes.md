# OpCodes

Bitcoin Cash Script OP Codes are available on the `bitbox.Script` object.

#### Examples

      // list all op codes
      bitbox.Script.opcodes;
      // { OP_FALSE: 0,
      //   OP_0: 0,
      //   OP_PUSHDATA1: 76,
      //   OP_PUSHDATA2: 77,
      //   OP_PUSHDATA4: 78,
      //   OP_1NEGATE: 79,
      //   OP_RESERVED: 80,
      //   OP_TRUE: 81,
      //   OP_1: 81,
      //   OP_2: 82,
      //   OP_3: 83,
      //   OP_4: 84,
      //   ...
      // }

      // get the op code for a word
      bitbox.Script.opcodes.OP_SPLIT
      // 127
      bitbox.Script.opcodes.OP_NUM2BIN
      // 128
      bitbox.Script.opcodes.OP_BIN2NUM
      // 129

### Constants

| Word         | Opcode | Hex       | Inputs    | Outputs       | Description                                                                                             |
| ------------ | ------ | --------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| OP_0         | 0      | 0x00      | Nothing   | (empty value) | An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.) |
| OP_FALSE     | 0      | 0x00      | Nothing   | (empty value) | An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.) |
| N/A          | 1-75   | 0x01-0x4b | (special) | data          | The next opcode bytes is data to be pushed onto the stack                                               |
| OP_PUSHDATA1 | 76     | 0x4c      | (special) | data          | The next byte contains the number of bytes to be pushed onto the stack.                                 |
| OP_PUSHDATA2 | 77     | 0x4d      | (special) | data          | The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.      |
| OP_PUSHDATA4 | 78     | 0x4e      | (special) | data          | The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.     |
| OP_1NEGATE   | 79     | 0x4f      | Nothing.  | -1            | The number -1 is pushed onto the stack.                                                                 |
| OP_TRUE      | 81     | 0x51      | Nothing.  |               | The number 1 is pushed onto the stack.                                                                  |
| OP_1         | 81     | 0x51      | Nothing.  |               | The number 1 is pushed onto the stack.                                                                  |
| OP_2-OP_16   | 82-96  | 0x52-0x60 | Nothing.  | 2-16          | The number in the word name (2-16) is pushed onto the stack.                                            |

### Flow control

| Word      | Opcode | Hex  | Inputs                                                    | Outputs                                                   | Description                                                                                                                                                                            |
| --------- | ------ | ---- | --------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OP_NOP    | 97     | 0x61 | Nothing                                                   | Nothing                                                   | Does nothing.                                                                                                                                                                          |
| OP_IF     | 99     | 0x63 | <expression> if [statements]else [statements]]\* endif    | <expression> if [statements]else [statements]]\* endif    | If the top stack value is not False, the statements are executed. The top stack value is removed.                                                                                      |
| OP_NOTIF  | 100    | 0x64 | <expression> notif [statements]else [statements]]\* endif | <expression> notif [statements]else [statements]]\* endif | If the top stack value is False, the statements are executed. The top stack value is removed.                                                                                          |
| OP_ELSE   | 103    | 0x67 | <expression> if [statements]else [statements]]\* endif    | <expression> if [statements]else [statements]]\* endif    | If the preceding OP_IF or OP_NOTIF or OP_ELSE was not executed then these statements are and if the preceding OP_IF or OP_NOTIF or OP_ELSE was executed then these statements are not. |
| OP_ENDIF  | 104    | 0x68 | <expression> if [statements]else [statements]]\* endif    | <expression> if [statements]else [statements]]\* endif    | Ends an if/else block. All blocks must end, or the transaction is invalid. An OP_ENDIF without OP_IF earlier is also invalid.                                                          |
| OP_VERIFY | 105    | 0x69 | True / false                                              | Nothing / fail                                            | Marks transaction as invalid if top stack value is not true. The top stack value is removed.                                                                                           |
| OP_RETURN | 106    | 0x6a | Nothing                                                   | fail                                                      | Marks transaction as invalid.                                                                                                                                                          |

### Stack

| Word            | Opcode | Hex  | Inputs              | Outputs            | Description                                                                            |
| --------------- | ------ | ---- | ------------------- | ------------------ | -------------------------------------------------------------------------------------- |
| OP_TOALTSTACK   | 107    | 0x6b | x1                  | (alt)x1            | Puts the input onto the top of the alt stack. Removes it from the main stack.          |
| OP_FROMALTSTACK | 108    | 0x6c | (alt)x1             | x1                 | Puts the input onto the top of the main stack. Removes it from the alt stack.          |
| OP_IFDUP        | 115    | 0x73 | x                   | x / x x            | If the top stack value is not 0, duplicate it.                                         |
| OP_DEPTH        | 116    | 0x74 | Nothing             | <Stack size>       | Puts the number of stack items onto the stack.                                         |
| OP_DROP         | 117    | 0x75 | x                   | Nothing            | Removes the top stack item.                                                            |
| OP_DUP          | 118    | 0x76 | x                   | x x                | Duplicates the top stack item.                                                         |
| OP_NIP          | 119    | 0x77 | x1 x2               | x2                 | Removes the second-to-top stack item.                                                  |
| OP_OVER         | 120    | 0x78 | x1 x2               | x1 x2 x1           | Copies the second-to-top stack item to the top.                                        |
| OP_PICK         | 121    | 0x79 | xn ... x2 x1 x0 <n> | xn ... x2 x1 x0 xn | The item n back in the stack is copied to the top.                                     |
| OP_ROLL         | 122    | 0x7a | xn ... x2 x1 x0 <n> | ... x2 x1 x0 xn    | The item n back in the stack is moved to the top.                                      |
| OP_ROT          | 123    | 0x7b | x1 x2 x3            | x2 x3 x1           | The top three items on the stack are rotated to the left.                              |
| OP_SWAP         | 124    | 0x7c | x1 x2               | x2 x1              | The top two items on the stack are swapped.                                            |
| OP_TUCK         | 125    | 0x7d | x1 x2               | x2 x1 x2           | The item at the top of the stack is copied and inserted before the second-to-top item. |
| OP_2DROP        | 109    | 0x6d | x1 x2               | Nothing            | Removes the top two stack items.                                                       |
| OP_2DUP         | 110    | 0x6e | x1 x2               | x1 x2 x1 x2        | Duplicates the top two stack items.                                                    |
| OP_3DUP         | 111    | 0x6f | x1 x2 x3            | x1 x2 x3 x1 x2 x3  | Duplicates the top three stack items.                                                  |
| OP_2OVER        | 112    | 0x70 | x1 x2 x3 x4         | x1 x2 x3 x4 x1 x2  | Copies the pair of items two spaces back in the stack to the front.                    |
| OP_2ROT         | 113    | 0x71 | x1 x2 x3 x4 x5 x6   | x3 x4 x5 x6 x1 x2  | The fifth and sixth items back are moved to the top of the stack.                      |
| OP_2SWAP        | 114    | 0x72 | x1 x2 x3 x4         | x3 x4 x1 x2        | Swaps the top two pairs of items.                                                      |

### Splice

| Word      | Opcode | Hex  | Inputs        | Outputs | Description                                                                    |
| --------- | ------ | ---- | ------------- | ------- | ------------------------------------------------------------------------------ |
| OP_CAT    | 126    | 0x7e | x1 x2         | out     | Concatenates two strings                                                       |
| OP_SUBSTR | 127    | 0x7f | in begin size | out     | Returns a section of a string                                                  |
| OP_LEFT   | 128    | 0x80 | in size       | out     | Keeps only characters left of the specified point in a string.                 |
| OP_RIGHT  | 129    | 0x81 | in size       | out     | Keeps only characters right of the specified point in a string.                |
| OP_SIZE   | 130    | 0x82 | in            | in size | Pushes the string length of the top element of the stack (without popping it). |

### Bitwise logic

| Word           | Opcode | Hex  | Inputs | Outputs        | Description                                             |
| -------------- | ------ | ---- | ------ | -------------- | ------------------------------------------------------- |
| OP_INVERT      | 131    | 0x83 | in     | out            | Flips all of the bits in the input.                     |
| OP_AND         | 132    | 0x84 | x1 x2  | out            | Boolean and between each bit in the inputs.             |
| OP_OR          | 133    | 0x85 | x1 x2  | out            | Boolean or between each bit in the inputs.              |
| OP_XOR         | 134    | 0x86 | x1 x2  | out            | Boolean exclusive or between each bit in the inputs.    |
| OP_EQUAL       | 135    | 0x87 | x1 x2  | True / false   | Returns 1 if the inputs are exactly equal, 0 otherwise. |
| OP_EQUALVERIFY | 136    | 0x88 | x1 x2  | Nothing / fail | Same as OP_EQUAL, but runs OP_VERIFY afterward.         |

### Arithmetic

| Word                  | Opcode | Hex  | Inputs    | Outputs        | Description                                                                 |
| --------------------- | ------ | ---- | --------- | -------------- | --------------------------------------------------------------------------- |
| OP_1ADD               | 139    | 0x8b | in        | out            | 1 is added to the input.                                                    |
| OP_1SUB               | 140    | 0x8c | in        | out            | 1 is subtracted from the input.                                             |
| OP_2MUL               | 141    | 0x8d | in        | out            | The input is multiplied by 2.                                               |
| OP_2DIV               | 142    | 0x8e | in        | out            | The input is divided by 2.                                                  |
| OP_NEGATE             | 143    | 0x8f | in        | out            | The sign of the input is flipped.                                           |
| OP_ABS                | 144    | 0x90 | in        | out            | The input is made positive.                                                 |
| OP_NOT                | 145    | 0x91 | in        | out            | If the input is 0 or 1, it is flipped. Otherwise the output will be 0.      |
| OP_0NOTEQUAL          | 146    | 0x92 | in        | out            | Returns 0 if the input is 0. 1 otherwise.                                   |
| OP_ADD                | 147    | 0x93 | a b       | out            | a is added to b.                                                            |
| OP_SUB                | 148    | 0x94 | a b       | out            | b is subtracted from a.                                                     |
| OP_MUL                | 149    | 0x95 | a b       | out            | a is multiplied by b.                                                       |
| OP_DIV                | 150    | 0x96 | a b       | out            | a is divided by b.                                                          |
| OP_MOD                | 151    | 0x97 | a b       | out            | Returns the remainder after dividing a by b.                                |
| OP_LSHIFT             | 152    | 0x98 | a b       | out            | Shifts a left b bits, preserving sign.                                      |
| OP_RSHIFT             | 153    | 0x99 | a b       | out            | Shifts a right b bits, preserving sign.                                     |
| OP_BOOLAND            | 154    | 0x9a | a b       | out            | If both a and b are not "" (null string), the output is 1. Otherwise 0.     |
| OP_BOOLOR             | 155    | 0x9b | a b       | out            | If a or b is not "" (null string), the output is 1. Otherwise 0.            |
| OP_NUMEQUAL           | 156    | 0x9c | a b       | out            | Returns 1 if the numbers are equal, 0 otherwise.                            |
| OP_NUMEQUALVERIFY     | 157    | 0x9d | a b       | Nothing / fail | Same as OP_NUMEQUAL, but runs OP_VERIFY afterward.                          |
| OP_NUMNOTEQUAL        | 158    | 0x9e | a b       | out            | Returns 1 if the numbers are not equal, 0 otherwise.                        |
| OP_LESSTHAN           | 159    | 0x9f | a b       | out            | Returns 1 if a is less than b, 0 otherwise.                                 |
| OP_GREATERTHAN        | 160    | 0xa0 | a b       | out            | Returns 1 if a is greater than b, 0 otherwise.                              |
| OP_LESSTHANOREQUAL    | 161    | 0xa1 | a b       | out            | Returns 1 if a is less than or equal to b, 0 otherwise.                     |
| OP_GREATERTHANOREQUAL | 162    | 0xa2 | a b       | out            | Returns 1 if a is greater than or equal to b, 0 otherwise.                  |
| OP_MIN                | 163    | 0xa3 | a b       | out            | Returns the smaller of a and b.                                             |
| OP_MAX                | 164    | 0xa4 | a b       | out            | Returns the larger of a and b.                                              |
| OP_WITHIN             | 165    | 0xa5 | x min max | out            | Returns 1 if x is within the specified range (left-inclusive), 0 otherwise. |

### Crypto

| Word                   | Opcode | Hex  | Inputs                                                                       | Outputs        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------ | ---- | ---------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OP_RIPEMD160           | 166    | 0xa6 | in                                                                           | hash           | The input is hashed using RIPEMD-160.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| OP_SHA1                | 167    | 0xa7 | in                                                                           | hash           | The input is hashed using SHA-1.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| OP_SHA256              | 168    | 0xa8 | in                                                                           | hash           | The input is hashed using SHA-256.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| OP_HASH160             | 169    | 0xa9 | in                                                                           | hash           | The input is hashed twice: first with SHA-256 and then with RIPEMD-160.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| OP_HASH256             | 170    | 0xaa | in                                                                           | hash           | The input is hashed two times with SHA-256.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| OP_CODESEPARATOR       | 171    | 0xab | Nothing                                                                      | Nothing        | All of the signature checking words will only match signatures to the data after the most recently-executed OP_CODESEPARATOR.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| OP_CHECKSIG            | 172    | 0xac | sig pubkey                                                                   | True / false   | The entire transaction's outputs, inputs, and script (from the most recently-executed OP_CODESEPARATOR to the end) are hashed. The signature used by OP_CHECKSIG must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| OP_CHECKSIGVERIFY      | 173    | 0xad | sig pubkey                                                                   | Nothing / fail | Same as OP_CHECKSIG, but OP_VERIFY is executed afterward.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| OP_CHECKMULTISIG       | 174    | 0xae | x sig1 sig2 ... <number of signatures> pub1 pub2 <number of public keys>     | True / False   | Compares the first signature against each public key until it finds an ECDSA match. Starting with the subsequent public key, it compares the second signature against each remaining public key until it finds an ECDSA match. The process is repeated until all signatures have been checked or not enough public keys remain to produce a successful result. All signatures need to match a public key. Because public keys are not checked again if they fail any signature comparison, signatures must be placed in the scriptSig using the same order as their corresponding public keys were placed in the scriptPubKey or redeemScript. If all signatures are valid, 1 is returned, 0 otherwise. Due to a bug, one extra unused value is removed from the stack. |
| OP_CHECKMULTISIGVERIFY | 175    | 0xaf | x sig1 sig2 ... <number of signatures> pub1 pub2 ... <number of public keys> | Nothing / fail | Same as OP_CHECKMULTISIG, but OP_VERIFY is executed afterward.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### Locktime

| Word                   | Opcode | Hex  | Inputs | Outputs  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------ | ---- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OP_CHECKLOCKTIMEVERIFY | 177    | 0xb1 | x      | x / fail | Marks transaction as invalid if the top stack item is greater than the transaction's nLockTime field, otherwise script evaluation continues as though an OP_NOP was executed. Transaction is also invalid if 1. the stack is empty; or 2. the top stack item is negative; or 3. the top stack item is greater than or equal to 500000000 while the transaction's nLockTime field is less than 500000000, or vice versa; or 4. the input's nSequence field is equal to 0xffffffff. The precise semantics are described in BIP 0065. |
| OP_CHECKSEQUENCEVERIFY | 178    | 0xb2 | x      | x / fail | Marks transaction as invalid if the relative lock time of the input (enforced by BIP 0068 with nSequence) is not equal to or longer than the value of the top stack item. The precise semantics are described in BIP 0112.                                                                                                                                                                                                                                                                                                         |

### Pseudo-words

| Word             | Opcode | Hex  | Description                                          |
| ---------------- | ------ | ---- | ---------------------------------------------------- |
| OP_PUBKEYHASH    | 253    | 0xfd | Represents a public key hashed with OP_HASH160.      |
| OP_PUBKEY        | 254    | 0xfe | Represents a public key compatible with OP_CHECKSIG. |
| OP_INVALIDOPCODE | 255    | 0xff | Matches any opcode that is not yet assigned.         |

### Reserved words

| Word         | Opcode | Hex  | When Used                                                               |
| ------------ | ------ | ---- | ----------------------------------------------------------------------- |
| OP_RESERVED  | 80     | 0x50 | Transaction is invalid unless occuring in an unexecuted OP_IF branch    |
| OP_VER       | 98     | 0x62 | Transaction is invalid unless occuring in an unexecuted OP_IF branch    |
| OP_VERIF     | 101    | 0x65 | Transaction is invalid even when occuring in an unexecuted OP_IF branch |
| OP_VERNOTIF  | 102    | 0x66 | Transaction is invalid even when occuring in an unexecuted OP_IF branch |
| OP_RESERVED1 | 137    | 0x89 | Transaction is invalid unless occuring in an unexecuted OP_IF branch    |
| OP_RESERVED2 | 138    | 0x8a | Transaction is invalid unless occuring in an unexecuted OP_IF branch    |
| OP_NOP1      | 176    | 0xb0 | The word is ignored. Does not mark transaction as invalid.              |
| OP_NOP4      | 179    | 0xb3 | The word is ignored. Does not mark transaction as invalid.              |
| OP_NOP10     | 185    | 0xb9 | The word is ignored. Does not mark transaction as invalid.              |
