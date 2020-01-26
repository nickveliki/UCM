(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{27:function(e,t){var n=[],a=function(e,t,n){for(var a=n.map((function(e){return e})),r=Math.round(a.length/2);a.length>1;)t<a[r][e]?a.splice(r,a.length-r):a.splice(0,r),r=Math.round(a.length/2);return a[0]&&a[0][e]===t?n.indexOf(a[0]):-1};e.exports={setState:function(e,t){var r,i,o=a("name",t,n);-1!=o&&(r=n[o].pickupstate,i=e,Object.keys(i).forEach((function(e){r[e]=i[e]})))},register:function(e){-1==a("name",e,n)&&(n.push({name:e,pickupstate:{}}),n.sort((function(e,t){return e.name-t.name})))},searchArray:a,getState:function(e){var t=a("name",e,n);if(-1!=t){var r=n[t].pickupstate;return n[t].pickupstate={},r}}}},36:function(e,t,n){"use strict";n.r(t),function(e){n.d(t,"default",(function(){return m}));var a=n(0),r=n.n(a),i=n(27);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function l(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?f(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(t){function n(){var t,a;s(this,n);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return y(f(a=l(this,(t=u(n)).call.apply(t,[this].concat(o)))),"state",{publicKey:"",privateKey:"",fingerprint:"",alias:"",password:""}),y(f(a),"setMainPageState",(function(e){i.setState(e,"MainPage")})),y(f(a),"formSubmit",(function(t){t.preventDefault(),a.state.alias&&a.state.publicKey&&fetch("/umc/",{method:"POST",body:JSON.stringify({key:a.state.publicKey,alias:a.state.alias}),headers:{"Content-Type":"Application/json"}}).then((function(t){t.arrayBuffer().then((function(t){var n=JSON.parse(e.from(t).toString()).fingerprint;a.setState({fingerprint:n})}))})).catch((function(e){console.log(e)}))})),y(f(a),"allAvailable",(function(){""!==a.state.fingerprint&&""!==a.state.privateKey&&""!==a.state.publicKey&&""!==a.state.alias&&a.setMainPageState({me:{fingerprint:a.state.fingerprint,publicKey:a.state.publicKey,privateKey:a.state.privateKey,alias:a.state.alias}})})),y(f(a),"readFile",(function(t){t.target.files[0].arrayBuffer().then((function(t){var n=e.from(t).toString(),r=n.substring(n.indexOf("-----BEGIN RSA PRIVATE KEY-----"),n.indexOf("-----END RSA PRIVATE KEY-----")).replace("-----BEGIN RSA PRIVATE KEY-----","").trim(),i=n.substring(n.indexOf("-----BEGIN PUBLIC KEY-----"),n.indexOf("-----END PUBLIC KEY-----")).replace("-----BEGIN PUBLIC KEY-----","").trim(),o=n.substring(n.indexOf("-----BEGIN FINGERPRINT-----"),n.indexOf("-----END FINGERPRINT-----")).replace("-----BEGIN FINGERPRINT-----","").trim(),s=n.substring(n.indexOf("-----BEGIN ALIAS-----"),n.indexOf("-----END ALIAS-----")).replace("-----BEGIN ALIAS-----","").trim();a.setState({privateKey:r,publicKey:i,fingerprint:o,alias:s})})).catch((function(e){console.log(e)}))})),y(f(a),"writeFile",(function(){var e=new Blob(["-----BEGIN RSA PRIVATE KEY-----\r\n",a.state.privateKey,"\r\n-----END RSA PRIVATE KEY-----\r\n","-----BEGIN PUBLIC KEY-----\r\n",a.state.publicKey,"\r\n-----END PUBLIC KEY-----\r\n","-----BEGIN FINGERPRINT-----\r\n",a.state.fingerprint,"\r\n-----END FINGERPRINT-----","\r\n-----BEGIN ALIAS-----\r\n",a.state.alias,"\r\n-----END ALIAS-----"]),t=document.getElementById("exflink");t.href=URL.createObjectURL(e),t.download=a.state.alias+".umc"})),y(f(a),"deriveKey",(function(){return new Promise((function(t,n){crypto.subtle.importKey("raw",e.from(a.state.password).buffer,{name:"PBKDF2"},!1,["deriveBits","deriveKey"]).then((function(a){crypto.subtle.deriveKey({name:"PBKDF2",salt:e.from("rock").buffer,iterations:1e5,hash:"SHA-256"},a,{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]).then((function(r){crypto.subtle.deriveBits({name:"PBKDF2",salt:e.from("salt").buffer,iterations:1e5,hash:"SHA-256"},a,256).then((function(e){t({key:r,iv:e})})).catch(n)})).catch(n)})).catch(n)}))})),y(f(a),"encodePkey",(function(t){t.preventDefault(),""!=a.state.password&&""!=a.state.privateKey&&a.deriveKey().then((function(t){crypto.subtle.encrypt({name:"AES-GCM",iv:t.iv},t.key,e.from(a.state.privateKey,"base64").buffer).then((function(t){var n=e.from(t).toString("base64");a.setState({privateKey:n})}))})).catch(console.log)})),y(f(a),"decodePKey",(function(t){t.preventDefault(),""!=a.state.password&&""!=a.state.privateKey&&a.deriveKey().then((function(t){crypto.subtle.decrypt({name:"AES-GCM",iv:t.iv},t.key,e.from(a.state.privateKey,"base64").buffer).then((function(t){var n=e.from(t).toString("base64");a.setState({privateKey:n})}))})).catch(console.log)})),y(f(a),"generateKeys",(function(){crypto.subtle.generateKey({name:"RSA-OAEP",modulusLength:1024,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},!0,["encrypt","decrypt"]).then((function(t){crypto.subtle.exportKey("pkcs8",t.privateKey).then((function(t){a.setState({privateKey:e.from(t).toString("base64")})})),crypto.subtle.exportKey("spki",t.publicKey).then((function(t){a.setState({publicKey:e.from(t).toString("base64")})}))}))})),a}var a,o,m;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(n,t),a=n,(o=[{key:"componentDidUpdate",value:function(){this.state.publicKey&&this.state.privateKey&&this.state.fingerprint&&this.writeFile(),this.allAvailable()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.formSubmit,className:"KeyForm"},r.a.createElement("textarea",{placeholder:"paste private key here or import from file",className:"KeyBox",value:this.state.privateKey,onChange:function(t){e.setState({privateKey:t.target.value})}}),r.a.createElement("textarea",{placeholder:"paste public key here or import from file",className:"KeyBox",value:this.state.publicKey,onChange:function(t){e.setState({publicKey:t.target.value})}}),r.a.createElement("textarea",{placeholder:"paste key fingerprint here or import from file",className:"fingerprint",value:this.state.fingerprint,onChange:function(t){e.setState({fingerprint:t.target.value})}}),r.a.createElement("div",{className:"buttonContainer"},r.a.createElement("div",{className:"smallField"},r.a.createElement("label",{htmlFor:"file-upload",className:"file-input"},"import file"),r.a.createElement("input",{className:"submitPkey",type:"submit",value:"register public key"})),r.a.createElement("div",{className:"smallField"},r.a.createElement("label",{style:{margin:"1rem"}},"Your Alias ",r.a.createElement("input",{value:this.state.alias,type:"text",onChange:function(t){e.setState({alias:t.target.value})}})),r.a.createElement("a",{style:{margin:"1rem"},href:"/",id:"exflink",download:!0},"export file"),r.a.createElement("div",{className:"input-wrapper-column"},r.a.createElement("label",null,"Password for Private Key"),r.a.createElement("input",{type:"text",value:this.state.password,onChange:function(t){e.setState({password:t.target.value})}}),r.a.createElement("div",{className:"input-wrapper"},r.a.createElement("button",{className:"submitPkey",onClick:this.encodePkey},"encode"),r.a.createElement("button",{className:"submitPkey",onClick:this.decodePKey},"decode"))))),r.a.createElement("input",{id:"file-upload",type:"file",onChange:this.readFile})),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.generateKeys},"Generate Keypair (RSA1024)")))}}])&&c(a.prototype,o),m&&c(a,m),n}(r.a.Component)}.call(this,n(28).Buffer)}}]);