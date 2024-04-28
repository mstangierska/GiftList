const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require('prompt-sync')({sigint:true})

const serverUrl = 'http://localhost:1225';

async function main() {

  let name = prompt("What is your name? ");
  var index = niceList.indexOf(name)
  const merkle = new MerkleTree(niceList)

  const proof = merkle.getProof(index)
  const { data: gift } = await axios.post(`${serverUrl}/gift`,
  {
    'proof': proof,
    'name': name
  });

  console.log({ gift });
}

main();