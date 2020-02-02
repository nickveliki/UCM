const jables = require("jables-multiproc");
const crypto = require("crypto");
const secdatpath = process.argv[3]||"/etc/umc/.secdat";
const location = "./udb/";
jables.setup({location, secDatFileLoc:secdatpath});
const getMessages = (fingerprint)=>jables.getDefinitionProperty({location, definition:{path: "fingerprints", indexKey:"fingerprint", fingerprint, property: "messages"}});
const sendMessage = (src, dest, message) => new Promise((res, rej)=>{
    getMessages(dest).then((messages)=>{
        messages.push({from: src, message, timestamp: Date.now()});
        jables.writeDefinition({location, definition:{path: "fingerprints", indexKey: "fingerprint", fingerprint: dest, messages}}).then(()=>{res("message sent")}).catch((err)=>{rej(err)});
        }).catch((err)=>{rej(err)});
            
    })
const getFingerPrints = () => new Promise((res, rej)=>{
    jables.getDefinition({location, definition:{path: "fingerprints"}}).then((ful)=>{
        const Versions = JSON.parse(ful).Versions;
        res(Versions.map((Version)=>({fingerprint: Version.fingerprint, alias: Version.alias, publicKey: Version.publicKey})));
    }).catch((err)=>{rej(err)});
})
const registerNew = ({alias, key})=>new Promise((res, rej)=>{
    const fingerprint = crypto.createHash("sha256").update(key).digest("hex");
    return jables.writeDefinition({location, definition:{path: "fingerprints", indexKey:"fingerprint", fingerprint, alias, publicKey: key, messages: []}}).then(()=>{
        res({fingerprint, alias, publicKey: key});
    }).catch((err)=>{rej(err)})
})
setInterval(()=>{
    let cutoff = Date.now()-24*60*60*1000;
    let deleted = [0, 0];
    const write = [];
    jables.getDefinition({location, definition:{path: "fingerprints"}}).then((ful)=>{
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
                write.push({path: "fingerprints", indexKey: "fingerprint", fingerprint: Version.fingerprint, messages: Version.messages});
            }
        });
        jables.writeDefinition({location, definition:write}).then(()=>{
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