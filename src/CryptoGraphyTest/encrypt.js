import { encrypt } from '@metamask/eth-sig-util';
// import { base64 } from 'ethers/lib/utils';
// import ascii85  from 'ascii85';
import * as fs from 'fs';
import { Buffer } from 'node:buffer';
import { create } from 'ipfs-http-client';

// Account is account address provided as string
// App must have access to the specified account
// const account = "0x012...bc"

// // Key is returned as base64
// const keyB64 = await window.ethereum.request({
//   method: 'eth_getEncryptionPublicKey',
//   params: [account],
// }) as string;
// const publicKey = Buffer.from(keyB64, 'base64');

// We need to get the encryption key of user's metamask.
const keyB64 = "vK5vEZNeAxr8k3AGXKBbkHJtp2BtJ/vmxvNzVtnTLAY=";
const publicKey = Buffer.from(keyB64, "base64");

// This function takes input as public key and data to do encrypt. 
function encryptData(publicKey, data) {
  // Returned object contains 4 properties: version, ephemPublicKey, nonce, ciphertext
  // Each contains data encoded using base64, version is always the same string
  const enc = encrypt({
    publicKey: publicKey.toString('base64'),
    data: data.toString('base64'),
    // data: ascii85.encode(data).toString(),
    version: 'x25519-xsalsa20-poly1305',
  });
  // console.log(enc,"enc");
  return enc;
}

const data = fs.readFileSync('unsecureFile.zip');
console.log("Data",data);

const result = encryptData(publicKey, data);
console.log(result);

const client = create();
const {cid}  = await client.add(JSON.stringify(result));
console.log(cid);


// fs.writeFileSync('check.json',JSON.stringify(result));
// ethereum.request({method: 'eth_decrypt', params: [ct, account]})

