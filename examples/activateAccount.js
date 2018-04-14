var StellarGuardSdk = require('../src'); // replace with require('@stellarguard/sdk');
var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarGuardSdk.useTestNetwork();

// sign up for your own test account at https://test.stellarguard.me
var email = '';
var publicKey = '';

activateAccount(publicKey, email);

// implementation
function activateAccount(publicKey, email) {
  StellarGuardSdk.activateAccount(publicKey, email)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(err) {
      console.error(err.response.data);
    });
}
