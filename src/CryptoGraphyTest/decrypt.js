import { log } from 'console';
import * as fs from 'fs';
import { create } from "ipfs-http-client";

async function downloadFiles() {
  // Instantiation of ipfs. 
  const client = create();
  // console.log(client);
  // providing CID which get from ipfs.
  const cid = "QmWx6DJ37BE984HzdcRZShsQZU4b1SXeqSCFmH3gBcFTdC";
  for await (const val of client.cat(cid)) {
    console.log(val.toString());
    return val;
  }
}


// This function decrypt encoded data and return us cipher text.
async function decryptData(account, data) {
    // console.log(data);
    // Reconstructing the original object outputed by encryption
    const structuredData = data;
    // console.log("structuredData",structuredData,"structuredData");
    // const structuredData = {
    //     version: "x25519-xsalsa20-poly1305",
    //     ephemPublicKey: data.slice(0, 32),
    //     nonce: data.slice(32, 56),
    //     ciphertext: data.slice(56),
    //   };
    // Convert data to hex string required by MetaMask
    const ct = `${Buffer.from(JSON.stringify(structuredData), "utf8").toString(
      "hex"
    )}`;
    console.log("ct", ct, "ct");
  
    // const writeToFile = fs.writeFileSync("2.txt", ct);
    // console.log("writeToFile", writeToFile, "writeToFile");
    // Send request to MetaMask to decrypt the ciphertext
    // Once again application must have acces to the account
    //   const decrypt = await window.ethereum.request({
    //     method: 'eth_decrypt',
    //     params: [ct, account],
    //   });
    //   // Decode the base85 to final bytes
    //   return ascii85.decode(decrypt);
}
// const result = fs.readFileSync('encrypt.json');
// console.log(JSON.parse(result),"result");

let getText = await downloadFiles();
// console.log(getText.toString(),"k");
const parsedText = JSON.parse(getText.toString());
console.log(see);
const decodeResult = await decryptData("0x378367eb35a793817aD92ae055394E4A6CF1A0FF",parsedText);
console.log(decodeResult,"Done");