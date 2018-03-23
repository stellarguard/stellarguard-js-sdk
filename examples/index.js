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
        return StellarGuardSdk.submitTransaction(transaction);
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
    });
}

submitTransaction();
