const route = require("express").Router();
const jables = require("./jableshandler");

route.get("/:fingerprint", (req, res, next)=>{
    console.log("GET request to fingerprint");
    jables.getMessages(req.params.fingerprint).then((log)=>{
        res.status(200).json(log);
    }).catch((err)=>{
        res.status(err.error||500).json(err.message);
    })
})
route.post("/:src/:dest", (req, res, next)=>{
    console.log("POST request to submit message");
    jables.sendMessage(req.params.src, req.params.dest, req.body.message).then((ful)=>{
        res.status(201).json("message sent");
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
route.post("/", (req, res, next)=>{
    console.log("POST request to main route");
    const key = req.body.key;
    const alias = req.body.alias;
    jables.registerNew({alias, key}).then((ful)=>{
        res.status(201).json(ful);
    }).catch((err)=>{
        console.log(err);
        res.status(err.error||500).json(err.message);
    })
})
module.exports=route;