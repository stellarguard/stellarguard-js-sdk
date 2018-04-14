var StellarGuardSdk = require('../src'); // replace with require('@stellarguard/sdk');
var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarGuardSdk.useTestNetwork();

// sign up for your own test account at https://test.stellarguard.me
var email = '';
var publicKey = '';
var backupSigner = ''; // OPTIONAL backup signer - see https://stellarguard.me/faq#backup-signer

getMultisigSetup(publicKey, email /* backupSigner */);

// implementation
function getMultisigSetup(publicKey, email, backupSigner) {
  StellarGuardSdk.getMultigSetup(publicKey, email, backupSigner)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(err) {
      console.error(err.data);
    });
}
