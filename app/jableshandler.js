const jables = require("jables/proc/fetchData");
const fs = require("fs");
const crypto = require("crypto");
const sec = {key:undefined, iv:undefined};
if (!fs.existsSync("/etc/umc/.secdat")){
    if (!fs.existsSync("/etc/umc")){
        fs.mkdirSync("/etc/umc");
    }
    fs.writeFileSync("/etc/umc/.secdat", JSON.stringify({key: crypto.randomBytes(16), iv: crypto.randomBytes(16)}));
}
const secdat = JSON.parse(fs.readFileSync("./.secdat").toString());
sec.key = Buffer.from(secdat.key.data);
sec.iv = Buffer.from(secdat.iv.data);
console.log(sec);
jables.setup("udb", sec);
const getMessages = (fingerprint)=>jables.getDefinitionProperty({path: "fingerprints", indexKey:"fingerprint", fingerprint, property: "messages"});
const sendMessage = (src, dest, message) => new Promise((res, rej)=>{
    getMessages(dest).then((messages)=>{
        messages.push({from: src, message, timestamp: Date.now()});
        jables.writeDefinition({path: "fingerprints", indexKey: "fingerprint", fingerprint: dest, messages}).then(()=>{res("message sent")}).catch((err)=>{rej(err)});
        }).catch((err)=>{rej(err)});
            
    })
const getFingerPrints = () => new Promise((res, rej)=>{
    jables.getDefinition({path: "fingerprints"}).then((ful)=>{
        const Versions = JSON.parse(ful).Versions;
        res(Versions.map((Version)=>({fingerprint: Version.fingerprint, alias: Version.alias, publicKey: Version.publicKey})));
    }).catch((err)=>{rej(err)});
})
const registerNew = ({alias, key})=>new Promise((res, rej)=>{
    const fingerprint = crypto.createHash("sha256").update(key).digest("hex");
    return jables.writeDefinition({path: "fingerprints", indexKey:"fingerprint", fingerprint, alias, publicKey: key, messages: []}).then(()=>{
        res({alias, fingerprint});
    }).catch((err)=>{rej(err)})
})
setInterval(()=>{
    let cutoff = Date.now()-24*60*60*1000;
    let deleted = [0, 0];
    const write = [];
    jables.getDefinition({path: "fingerprints"}).then((ful)=>{
        JSON.parse(ful).Versions.forEach((Version)=>{
            let del = false;
            while(Version.messages[0]!=undefined&&Version.messages[0].timestamp < cutoff){
                if(!del){
                    del=true;
                    deleted[1]++;
                }
                Version.messages.shift();
                deleted[0]++;
            }
            if (del){
                write.push(Jables.update({path: "fingerprints", indexKey: "fingerprint", fingerprint: Version.fingerprint, messages: Version.messages}));
            }
        });
        jables.writeDefinition(write).then(()=>{
            console.log("deleted " + deleted[0] + " messages from " + deleted[1] + " fingerprint records");
        })
    }).catch((err)=>{console.log(err)})
}, 60*60*1000)
module.exports = {
    getMessages,
    sendMessage,
    getFingerPrints,
    registerNew
}