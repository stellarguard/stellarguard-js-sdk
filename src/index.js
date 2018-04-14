var axios = require('axios');

var STELLARGUARD_PUBLIC_KEY =
  'GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD';

function StellarGuard() {}

StellarGuard.prototype.useTestNetwork = function() {
  this.httpClient = axios.create({
    baseURL: 'https://test.stellarguard.me/api'
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
  this._verifyNetworkSet();
  var xdr = transaction.toEnvelope().toXDR('base64');
  return this.httpClient
    .post('/transactions', { xdr: xdr })
    .then(function(result) {
      return result.data;
    });
};

StellarGuard.prototype.getMultigSetup = function(
  publicKey,
  email,
  backupSignerPublicKey
) {
  this._verifyNetworkSet();
  return this.httpClient
    .get('/users/' + encodeURIComponent(email) + '/multisig', {
      params: {
        publicKey: publicKey,
        backupSignerPublicKey: backupSignerPublicKey
      }
    })
    .then(function(result) {
      return result.data;
    });
};

StellarGuard.prototype.activateAccount = function(publicKey, email) {
  this._verifyNetworkSet();
  return this.httpClient
    .post(
      '/accounts/' + encodeURIComponent(publicKey),
      {},
      {
        params: {
          email: email
        }
      }
    )
    .then(function(result) {
      return result.data;
    });
};

StellarGuard.prototype._verifyNetworkSet = function() {
  if (!this.httpClient) {
    throw new Error(
      'Call StellarGuard.useTestNetwork() or StellarGuard.usePublicNetwork() before submitting.'
    );
  }
};

module.exports = new StellarGuard();
