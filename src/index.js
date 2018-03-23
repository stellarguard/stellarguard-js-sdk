var axios = require('axios');

var STELLARGUARD_PUBLIC_KEY =
  'GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD';

function StellarGuard() {}

StellarGuard.prototype.useTestNetwork = function() {
  this.httpClient = axios.create({
    baseURL: 'http://test.stellarguard.me/api'
  });
};

StellarGuard.prototype.usePublicNetwork = function() {
  this.httpClient = axios.create({
    baseURL: 'https://stellarguard.me/api'
  });
};

StellarGuard.prototype.hasStellarGuard = function(account) {
  return account.signers.some(function(signer) {
    return signer.public_key === STELLARGUARD_PUBLIC_KEY;
  });
};

StellarGuard.prototype.submitTransaction = function(transaction) {
  var xdr = transaction.toEnvelope().toXDR('base64');
  if (!this.httpClient) {
    throw new Error(
      'Call StellarGuard.useTestNetwork() or StellarGuard.usePublicNetwork() before submitting.'
    );
  }
  return this.httpClient
    .post('/transactions', { xdr: xdr })
    .then(function(result) {
      return result.data;
    });
};

module.exports = new StellarGuard();
