let coseiljs = require('conseiljs');
let compte = require('./../comptes');
const serverInfo = {
    url: 'https://conseil-dev.cryptonomic-infra.tech:443',
    apiKey: 'BUIDLonTezos-021'
};
let tezosController = {};
tezosController.createAccount =(req,res)=>{
    //let keystore=initAccount(compte.mnemonic.join(' '),compte.email,compte.password,compte.pkh);
    let keystore = {
        publicKey: 'edpkuNhhjo1jHFghE1j2teGTEPmuEQVe9Je6xDFa7GsCgcEuAHzDoK',
        privateKey: 'edskS2v8AhRzHvz35Z5SsdM11TUT3rNW885Nx3n2o3MA6Wpa3nBdzyG7AgkPop18LsxkzLJpXbp2fuxuVv5qe7Qjqp2YeNMEem',
        publicKeyHash: 'tz1WogyfspZvD8a6X8pUyvhD9C6guFR3A53a',
        seed: '',
        storeType: 1
    };
    let result = activateAccount(serverInfo,keystore,compte.secret,' ');
};
tezosController.revealAccount = (req,res)=>{
    let result = revealAccount('','');
};

//fonction d'initialisation ducompte
async function initAccount(mnemonic,email,password,pkh) {
    const keystore =  coseiljs.TezosWalletUtil.unlockFundraiserIdentity(mnemonic,email,password, pkh);
    console.log(keystore);
}
//function d'activation du compte
async function activateAccount(server,Keystore,activationCode,derivationPath) {
    const result =  coseiljs.TezosNodeWriter.sendIdentityActivationOperation(server,Keystore,activationCode,derivationPath);
    console.log(`Injected operation group id ${result.operationGroupID}`);
    return result;
}
//function de revelation de compte
async function revealAccount(server,Keystore) {
    const result = await coseiljs.TezosNodeWriter.sendKeyRevealOperation(server,Keystore);
    console.log(`Injected operation group id ${result.operationGroupID}`);
    return result;
}

module.exports=tezosController;