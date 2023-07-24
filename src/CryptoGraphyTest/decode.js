import * as fs from "fs";

// This base64 characters get from the metamask after process the cipher text(ct);
const decode = "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";
  // Decode the base64 to final bytes

  // let buff = new Buffer(decrypt, 'base64');
  // console.log(buff);
  // let text = buff.toString('ascii');
  // console.log(text);

  // const a = Buffer.from(decrypt,'utf8')
  // const b = new Buffer(decrypt, 'base64');
  // console.log(a,"btoa");
  //   const d = btoa(decrypt);
  //   console.log(d);
    // const _a =  ascii85.decode(decrypt);
  //   console.log(a.toString());
  // const ss = Base64.decode(decrypt);
  // fs.writeFileSync("application.mtz", ss);
  const imageBuffer = new Buffer.from(decode, 'base64');
  // writing original content in file. 
  fs.writeFileSync('decoded.zip', imageBuffer);