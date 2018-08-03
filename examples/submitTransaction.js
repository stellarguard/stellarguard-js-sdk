var StellarGuardSdk = require('../src'); // replace with require('@stellarguard/sdk');
var StellarSdk = require('stellar-sdk');

// sign up for your own test account at https://test.stellarguard.me
var SOURCE_SECRET_KEY = '';
var sourceKeypair = StellarSdk.Keypair.fromSecret(SOURCE_SECRET_KEY);

var destinationPublicKey =
  'GA2KAWMDOAW4ZUKBWJNALBAMF3HIWFPZR2J4ZIAVFR6DBPW44FUBKKCS';

StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarGuardSdk.useTestNetwork();

function submitTransaction() {
  return server
    .loadAccount(sourceKeypair.publicKey())
    .then(function(account) {
      var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationPublicKey,
            amount: '1',
            asset: StellarSdk.Asset.native()
          })
        )
        .build();

      transaction.sign(sourceKeypair);

      if (StellarGuardSdk.hasStellarGuard(account)) {
        var callback = undefined; // add an optional callback such as https://webhook.site/cc677ade-969d-411e-9b9c-93745f69d37b
        return StellarGuardSdk.submitTransaction(transaction, callback);
      } else {
        return server.submitTransaction(transaction);
      }
    })
    .then(function(result) {
      if (result.stellarGuard) {
        console.log('From StellarGuard:', result);
        console.log('Go to ' + result.url + ' to authorize.');
      } else {
        console.log('From Horizon', result);
      }
    })
    .catch(function(err) {
      console.error(err);
    });
}

submitTransaction();
