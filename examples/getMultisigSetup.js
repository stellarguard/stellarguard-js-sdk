var StellarGuardSdk = require('../src'); // replace with require('@stellarguard/sdk');
var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarGuardSdk.useTestNetwork();

// sign up for your own test account at https://test.stellarguard.me
var publicKey = ''; // the public key of the account you want to protect with StellarGuard
var stellarGuardPublicKey = ''; // get your StellarGuard public key from the
var backupSignerPublicKey = ''; // OPTIONAL backup signer - see https://stellarguard.me/faq#backup-signer

StellarGuardSdk.getMultigSetup(
  publicKey,
  stellarGuardPublicKey,
  backupSignerPublicKey
)
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.error(err.response.data);
  });
