var StellarGuardSdk = require('../src'); // replace with require('@stellarguard/sdk');
var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarGuardSdk.useTestNetwork();

var publicKey = ''; // the public key of the account that is protected by StellarGuard

activateAccount(publicKey);

// implementation
function activateAccount(publicKey) {
  StellarGuardSdk.activateAccount(publicKey)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(err) {
      console.error(err.response.data);
    });
}
