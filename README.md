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
    .then(function(result)) {
      console.log(result.url); // https://test.stellarguard.me/transactions/<id>
    }
});
```

## Example

See [examples/index.js](examples/index.js) for a more detailed example
