var StellarGuardSdk = require('../src'); // replace with require('@stellarguard/sdk');
var StellarSdk = require('stellar-sdk');

StellarGuardSdk.useTestNetwork();

// sign up for your own test account at https://test.stellarguard.me
var publicKey = 'GCIY6H26OGKQ5YZDIOBELMTNNUBBOCZRQSJMCWS2IFEI7257YAOT22AU'; // the public key of the account you want to protect with StellarGuard

StellarGuardSdk.getAccount(publicKey)
  .then(function(result) {
    console.log(
      `UserId: ${result.userId} 
StellarGuard Signer Public Key: ${result.stellarGuardSignerPublicKey}`
    );
  })
  .catch(function(err) {
    console.error(err.response.data);
  });
