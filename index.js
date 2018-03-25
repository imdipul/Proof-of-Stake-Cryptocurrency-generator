/**
 * Proof of Stake Cryptocurrency generator
 * Author: Sandoche ADITTANE
 */

'use strict';

const inquirer = require('inquirer');
const cmd = require('node-cmd');
const Promise = require('bluebird');
const replace = require('replace-in-file');

console.log('*****************************************************************');
console.log('Hi, welcome to Nxt clone Proof of Stake Cryptocurrency generator');
console.log('*****************************************************************');
console.log(' ')

var questions = [
  {
    type: 'input',
    name: 'application',
    message: "What is the name of your blockchain (example: SuperCoin)"
  },
  {
    type: 'input',
    name: 'coin_symbol',
    message: "What is the name the symbol of your coin (example: SPC)"
  },
  {
    type: 'input',
    name: 'default_peer_port',
    message: "What is the port that you want to use for the peer node (example: 97874)"
  },
  {
    type: 'input',
    name: 'testnet_peer_port',
    message: "What is the port that you want to use for the peer testnet node (example: 96874)"
  },
  {
    type: 'input',
    name: 'api_server_port',
    message: "What is the port that you want to use for the api server port (example: 97876)"
  }
];

inquirer.prompt(questions).then(answers => {
  // Rename the different files (check the commits)
  // copy the genesis block & other parameters

  // git clone https://bitbucket.org/Jelurida/nxt-clone-starter answers.application
  const folderName = answers.application;

  console.log('1. Cloning the nxt-clone-starter')
  const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });
  getAsync('git clone https://bitbucket.org/Jelurida/nxt-clone-starter ' + answers.application).then(data => {
    console.log('Repository cloned successfully');

    console.log('2. Setting up the parameters')
    try {
      const changes1 = replace.sync({
        files: folderName + '/src/java/nxt/Nxt.java',
        from: 'APPLICATION = "NxtClone"',
        to: 'APPLICATION = "' + answers.application + '"'
      });
      const changes2 = replace.sync({
        files: folderName + '/src/java/nxt/Constants.java',
        from: 'COIN_SYMBOL = "NxtCloneCoin"',
        to: 'COIN_SYMBOL = "' + answers.coin_symbol +'"'
      });
      const changes3 = replace.sync({
        files: folderName + '/src/java/nxt/Constants.java',
        from: 'ACCOUNT_PREFIX = "NXT"',
        to: 'ACCOUNT_PREFIX = "' + answers.coin_symbol +'"'
      });
      const changes4 = replace.sync({
        files: folderName + '/src/java/nxt/Constants.java',
        from: 'PROJECT_NAME = "NxtClone"',
        to: 'PROJECT_NAME  = "' + answers.application +'"'
      });
      const changes5 = replace.sync({
        files: folderName + '/src/java/nxt/peer/Peers.java',
        from: 'DEFAULT_PEER_PORT = 47874',
        to: 'DEFAULT_PEER_PORT = ' + answers.default_peer_port
      });
      const changes6 = replace.sync({
        files: folderName + '/src/java/nxt/peer/Peers.java',
        from: 'TESTNET_PEER_PORT = 46874',
        to: 'TESTNET_PEER_PORT = ' + answers.testnet_peer_port
      });
      console.log('Modified files:', changes1.join(', '));
      console.log('Modified files:', changes2.join(', '));
      console.log('Modified files:', changes3.join(', '));
      console.log('Modified files:', changes4.join(', '));
      console.log('Modified files:', changes5.join(', '));
      console.log('Modified files:', changes6.join(', '));

      // Change the docker file
      // Copy nxt.proprities and change the ports
      // Copying conf files & images and replace the old ones
      // Copying the wallet
      // Setting up the wallet
    }
    catch (error) {
      console.error('An error occurred:', error);
    }

  }).catch(error => {
    console.log('An error occured', error)
  })
});