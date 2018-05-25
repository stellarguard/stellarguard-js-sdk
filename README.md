# stellarguard-js-sdk

JavaScript SDK for StellarGuard.me

## Installation

`npm install @stellarguard/sdk --save` or `yarn add @stellarguard/sdk`

## Usage

```js
var StellarGuardSdk = require('@stellarguard/sdk');
StellarGuardSdk.useTestNetwork(); // or StellarGuardSdk.usePublicNetwork();

if(StellarGuardSdk.hasStellarGuard(account)) {
  StellarGuardSdk.submitTransaction(transaction)
    .then(function(result) {
      console.log(result.url); // https://test.stellarguard.me/transactions/<id>
    });
}
```

## Examples

* [Submitting a Transaction](examples/submitTransaction.js)
* [Getting Basic Account Information](examples/getAccount.js)
* [Getting Multisig Setup XDR as Pre-Activation Step](examples/getMultisigSetup.js)
* [Activating an Account after Multisig is Setup](examples/activateAccount.js)
