const route = require("express").Router();
const crypto = require("crypto");
const jables = require("./jableshandler");
const webpush = require('web-push');
const searchArray = (searchkey, searchvalue, array)=>{
    if(array.length>0){
    let search = array.map((item)=>item);
    let bound = Math.round(search.length/2);
    while(search.length>1){
        if (searchvalue<search[bound][searchkey]){
            search.splice(bound, search.length-bound);
        }else{
            search.splice(0, bound);
        }
        bound=Math.round(search.length/2);
    }
    return {before: searchvalue!=search[0][searchkey]?searchvalue<search[0][searchkey]:undefined , i: array.indexOf(search[0])}
    }
    return {before: true, i: 0}
    }
const activeSubscriptions = [];
const verify = (fingerprint, signature, message)=>new Promise((res, rej)=>{
    jables.getFingerPrints().then((fingerprints)=>{
        const identity = searchArray('fingerprint', fingerprint, fingerprints);
        if (identity.before===undefined){
            const {publicKey} = fingerprints[identity.i];
            const verify = crypto.createVerify('sha256');
            verify.write(message);
            verify.end();
            const valid = verify.verify('-----BEGIN PUBLIC KEY-----\n'+publicKey+'\n-----END PUBLIC KEY-----', Buffer.from(signature, 'base64'))
            res(valid);
        }
    }).catch(rej);
})
const pushMessage = (fingerprint, message)=>new Promise((res, rej)=>{
    const {i, before} = searchArray('fingerprint', fingerprint, activeSubscriptions);
    console.log({i, before});
    if(before===undefined){
        const {endpoint, auth, p256dh} = activeSubscriptions[i].subscription;
        webpush.sendNotification({
            endpoint,
            keys: {
                p256dh,
                auth
            }
        }, message).then(({statusCode})=>{
            res(statusCode);
        }, rej);
    }else{
        rej(404);
    }
})
route.get("/:fingerprint", (req, res, next)=>{
    console.log("GET request to fingerprint");
    jables.getMessages(req.params.fingerprint).then((log)=>{
        res.status(200).json(log);
    }).catch((err)=>{
        res.status(err.error||500).json(err.message);
    })
})
route.post("/message/:src/:dest", (req, res, next)=>{
    console.log("POST request to submit message");
    jables.sendMessage(req.params.src, req.params.dest, req.body.message).then((ful)=>{
        res.status(201).json("message sent");
        pushMessage(req.params.dest, `${JSON.stringify({title:'YOU GOT MAIL', show:false, body:req.params.src})}`).then((status)=>{
            pushMessage(req.params.src, JSON.stringify({title:'MESSAGE SENT', show: false, body:req.params.dest, online:status==201})).then(()=>{}).catch(console.log)
        }).catch(console.log);
    }).catch((err)=>{
        res.status(err.error||500).json(err.message);
    })
})
route.get("/", (req, res, next)=>{
    console.log("GET request to main route");
    jables.getFingerPrints().then((ful)=>{
        res.status(200).json(ful);
    }).catch((err)=>{
        res.status(err.error||500).json(err.message);
    })
})
route.post("/subscribe/:fingerprint", (req, res, next)=>{
    console.log("POST request to subscribe route");
    const fingerprint = req.params.fingerprint;
    const {endpoint, p256dh, auth} = req.body;
    const {before, i} = searchArray('fingerprint', fingerprint, activeSubscriptions);
    verify(fingerprint, req.headers.signature, req.headers.nonce).then((valid)=>{
        if(valid){
            if (before!==undefined){
                if(before&&i==0){
                    activeSubscriptions.unshift({fingerprint, subscription:{endpoint, p256dh, auth}});
                }else if (!before&&i==activeSubscriptions.length-1){
                    activeSubscriptions.push({fingerprint, subscription:{endpoint, p256dh, auth}});
                } else{
                    activeSubscriptions.splice(i+1, 0, {fingerprint, subscription:{endpoint, p256dh, auth}})
                }
                res.status(200).json("ok");
            }else{
                res.status(401).json("fingerprint error");
            }
        }else{
            res.status(401).json('crypto rejection');
        }
    })
    
    
})
route.post("/unsubscribe/:fingerprint", (req, res, next)=>{
    console.log("POST request to unsubscribe ")
    const fingerprint = req.params.fingerprint;
    const {signature} = req.headers;
    verify(fingerprint, signature, req.headers.nonce).then((valid)=>{
        if(valid){
            const {i, before} = searchArray('fingerprint', fingerprint, activeSubscriptions);
            if(before===undefined){
                activeSubscriptions.splice(i, 1);
                res.status(200).json('ok');
            }else{
                res.status(404).json("fingerprint error");
            }
        }else{
            res.status(401).json('crypto rejection');
        }
    }).catch((err)=>{
        res.status(500).json(err);
    })
    

})
route.post("/", (req, res, next)=>{
    console.log("POST request to main route");
    const key = req.body.key;
    const alias = req.body.alias;
    jables.registerNew({alias, key}).then((ful)=>{
        res.status(201).json(ful);
        const newusermessage = JSON.stringify({show: true, title: 'NEW USER' ,body:`${req.body.alias} is available for communication`});
        activeSubscriptions.forEach(({subscription})=>{
            webpush.sendNotification({
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth
                }
            }, newusermessage).then(console.log, console.log)
        })
        
    }).catch((err)=>{
        console.log(err);
        res.status(err.error||500).json(err.message);
    })
})
module.exports=route;