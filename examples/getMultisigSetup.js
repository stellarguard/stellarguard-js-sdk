var StellarGuardSdk = require('../src'); // replace with require('@stellarguard/sdk');
var StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarGuardSdk.useTestNetwork();

// sign up for your own test account at https://test.stellarguard.me
var externalId = ''; // get your external id by going to the "Settings" page in the top right user menu (or /settings)
var publicKey = ''; // the public key of the account you want to protect with StellarGuard
var backupSigner = ''; // OPTIONAL backup signer - see https://stellarguard.me/faq#backup-signer

getMultisigSetup(externalId, publicKey /* backupSigner */);

// implementation
function getMultisigSetup(externalId, publicKey, backupSigner) {
  StellarGuardSdk.getMultigSetup(externalId, publicKey, backupSigner)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(err) {
      console.error(err.response.data);
    });
}
