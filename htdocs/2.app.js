(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{26:function(e,t){var n=[],r=function(e,t,n){for(var r=n.map((function(e){return e})),o=Math.round(r.length/2);r.length>1;)t<r[o][e]?r.splice(o,r.length-o):r.splice(0,o),o=Math.round(r.length/2);return r[0]&&r[0][e]===t?n.indexOf(r[0]):-1};e.exports={setState:function(e,t){var o,a,i=r("name",t,n);-1!=i&&(o=n[i].pickupstate,a=e,Object.keys(a).forEach((function(e){o[e]=a[e]})))},register:function(e){-1==r("name",e,n)&&(n.push({name:e,pickupstate:{}}),n.sort((function(e,t){return e.name-t.name})))},searchArray:r,getState:function(e){var t=r("name",e,n);if(-1!=t){var o=n[t].pickupstate;return n[t].pickupstate={},o}}}},28:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return h}));var r=n(0),o=n.n(r),a=n(33),i=n(32),s=n(26);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?m(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(t){function n(){var t,r;u(this,n);for(var c=arguments.length,l=new Array(c),y=0;y<c;y++)l[y]=arguments[y];return b(m(r=f(this,(t=p(n)).call.apply(t,[this].concat(l)))),"state",{inbox:!0,outbox:!1,messages:[],messageInter:void 0,replytomessage:""}),b(m(r),"getMessages",(function(){fetch("/umc/"+r.props.me.fingerprint,{method:"GET"}).then((function(e){e.json().then((function(e){r.setState({messages:[]}),e.forEach((function(e,t){e.from===r.props.me.fingerprint||e.decrypted||r.readMessage(e.message,t,e.from,e.timestamp)}))}))}))})),b(m(r),"verifySignature",(function(t,n,r){return new Promise((function(o,a){t?crypto.subtle.importKey("spki",e.from(r,"base64").buffer,{name:"RSA-PSS",modulusLength:1024,hash:"SHA-256"},!1,["verify"]).then((function(r){crypto.subtle.digest("SHA-256",n).then((function(n){crypto.subtle.verify({name:"RSA-PSS",saltLength:32},r,e.from(t,"base64").buffer,n).then(o).catch(a)})).catch(a)})).catch(a):o(!1)}))})),b(m(r),"readMessage",(function(t,n,o,a){if(localStorage.getItem("contacts")){var i=JSON.parse(t.substring(t.indexOf("-----AES KEY START-----"),t.indexOf("-----AES KEY END-----")).replace("-----AES KEY START-----","").trim()),s=i.wrapped,c=e.from(Object.keys(i.iv).map((function(e){return i.iv[e]})));r.unwrapAES(s,r.props.me.privateKey).then((function(i){var s=t.split("-----MESSAGE BODY-----")[1].split("-----SENDER SIGNATURE-----")[0];r.decryptMessage(i,c,s).then((function(i){r.verifySignature(t.split("-----SENDER SIGNATURE-----")[1],i,r.resolveFrom(o).publicKey).then((function(t){console.log({verified:t}),r.state.messages.splice(n,1,{index:n,message:e.from(i).toString(),decrypted:!0,from:o,timestamp:a,verified:t}),r.setState({messages:r.state.messages})})).catch(console.log)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}})),b(m(r),"unwrapAES",(function(t,n){return new Promise((function(r,o){crypto.subtle.importKey("pkcs8",e.from(n,"base64").buffer,{name:"RSA-OAEP",hash:"SHA-256"},!1,["unwrapKey"]).then((function(n){crypto.subtle.unwrapKey("raw",e.from(t,"base64").buffer,n,{name:"RSA-OAEP"},{name:"AES-GCM"},!1,["decrypt"]).then((function(e){r(e)})).catch((function(e){o(e)}))})).catch((function(e){o(e)}))}))})),b(m(r),"resolveFrom",(function(e){var t=JSON.parse(localStorage.getItem("contacts"))||[],n=Object(s.searchArray)("fingerprint",e,t);return-1!==n?t[n]:{fingerprint:e}})),b(m(r),"decryptMessage",(function(t,n,r){return crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,e.from(r,"base64").buffer)})),b(m(r),"render",(function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"IDBar"},o.a.createElement("h4",null,r.props.me.alias),o.a.createElement("div",{className:"linkContainer"},o.a.createElement("h5",null,r.props.me.fingerprint))),o.a.createElement("div",{className:"smallbar"},o.a.createElement("button",{onClick:function(){r.setState({inbox:!0,outbox:!1})}},"Inbox ",r.state.messages.length),o.a.createElement("button",{onClick:function(){r.setState({inbox:!1,outbox:!0})}},"Outbox")),o.a.createElement("div",null,r.state.inbox&&o.a.createElement(a.a,{fingerprint:r.props.me.fingerprint,messages:r.state.messages,resolveFrom:r.resolveFrom,reply:function(e){var t=e.fingerprint,n=e.replytomessage;r.props.setDestination(r.resolveFrom(t)),r.setState({replytomessage:n,inbox:!1,outbox:!0})}}),r.state.outbox&&o.a.createElement(i.a,{privateKey:r.props.me.privateKey,fingerprint:r.props.me.fingerprint,destination:r.props.destination,replytomessage:r.state.replytomessage,finish:function(){r.setState({replytomessage:""})}})))})),r}var r,c,h;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(n,t),r=n,(c=[{key:"componentDidMount",value:function(){this.getMessages(),this.state.messageInter=setInterval(this.getMessages,6e5)}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.messageInter)}}])&&l(r.prototype,c),h&&l(r,h),n}(o.a.Component)}).call(this,n(27).Buffer)},32:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return m}));var r=n(0),o=n.n(r);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?l(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(t){function n(){var t,r;i(this,n);for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return p(l(r=c(this,(t=u(n)).call.apply(t,[this].concat(a)))),"state",{sent:!1}),p(l(r),"encryptMessage",(function(t){return new Promise((function(n,r){var o=crypto.getRandomValues(new Uint8Array(12));crypto.subtle.generateKey({name:"AES-GCM",length:128},!0,["encrypt","decrypt"]).then((function(a){crypto.subtle.encrypt({name:"AES-GCM",iv:o},a,e.from(t).buffer).then((function(t){n({AES:a,encrypted:e.from(t).toString("base64"),iv:o})})).catch((function(e){r(e)}))})).catch((function(e){r(e)}))}))})),p(l(r),"wrapAES",(function(t,n){return new Promise((function(r,o){crypto.subtle.importKey("spki",e.from(n,"base64").buffer,{name:"RSA-OAEP",hash:"SHA-256"},!1,["wrapKey"]).then((function(n){crypto.subtle.wrapKey("raw",t,n,"RSA-OAEP").then((function(t){r(e.from(t).toString("base64"))})).catch((function(e){o(e)}))})).catch((function(e){o(e)}))}))})),p(l(r),"submit",(function(t){t.preventDefault();var n=t.target.subject.value+"\r\n\n"+t.target.message.value;r.encryptMessage(n).then((function(t){var o=t.AES,a=t.encrypted,i=t.iv;r.wrapAES(o,r.props.destination.publicKey).then((function(t){r.signMessage(n,r.props.privateKey).then((function(n){var o="-----AES KEY START-----\r\n"+JSON.stringify({wrapped:t,iv:i})+"\r\n-----AES KEY END-----\r\n-----MESSAGE BODY-----\r\n"+e.from(a).toString()+"\r\n-----SENDER SIGNATURE-----"+n;fetch("/umc/"+r.props.fingerprint+"/"+r.props.destination.fingerprint+"/",{method:"POST",headers:{"Content-Type":"Application/json"},body:JSON.stringify({message:o})}).then((function(e){e.status<400&&(r.setState({sent:!0}),r.props.finish(),setTimeout((function(){r.setState({sent:!1})}),5e3)),e.json().then((function(e){})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})).catch(console.log)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})),p(l(r),"signMessage",(function(t,n){return new Promise((function(r,o){var a=e.from(n,"base64").buffer;crypto.subtle.importKey("pkcs8",a,{name:"RSA-PSS",modulusLength:1024,publicExponent:new Uint8Array([1,0,1]),hash:"SHA-256"},!1,["sign"]).then((function(n){crypto.subtle.digest("SHA-256",e.from(t).buffer).then((function(t){crypto.subtle.sign({name:"RSA-PSS",saltLength:32},n,t).then((function(t){r(e.from(t).toString("base64"))})).catch(o)})).catch(o)})).catch(o)}))})),r}var r,a,m;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(n,t),r=n,(a=[{key:"render",value:function(){return o.a.createElement("div",null,this.props.destination&&o.a.createElement("div",{className:"newMessage"},o.a.createElement("label",null,'Destination: "',this.props.destination.alias,'" (',this.props.destination.fingerprint,") "),!this.state.sent&&o.a.createElement("form",{className:"MessageForm",onSubmit:this.submit},o.a.createElement("div",{className:"input-wrapper"},o.a.createElement("label",null,"Subject"),o.a.createElement("input",{defaultValue:""===this.props.replytomessage?"":"Re: "+this.props.replytomessage.split("\r\n")[0],type:"text",name:"subject"})),o.a.createElement("textarea",{name:"message",defaultValue:""===this.props.replytomessage?"":"\r\n\n\n-----previous message from "+this.props.destination.alias+"-----\r\n\n"+this.props.replytomessage}),o.a.createElement("input",{type:"submit",value:"Send Message"})),this.state.sent&&o.a.createElement("dir",null,o.a.createElement("label",null,"message successfully sent to ",this.props.destination.alias))))}}])&&s(r.prototype,a),m&&s(r,m),n}(o.a.Component)}).call(this,n(27).Buffer)},33:function(e,t,n){"use strict";var r=n(0),o=n.n(r);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?l(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(e){function t(){var e,n;i(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return p(l(n=c(this,(e=u(t)).call.apply(e,[this].concat(o)))),"state",{show:!1}),n}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),n=t,(r=[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"MessageBox"},o.a.createElement("button",{onClick:function(){e.setState({show:!e.state.show})}},"From: ",this.props.from.alias?this.props.from.alias+(this.props.verified?" verified":" CAUTION: not verified"):"unregistered fingerprint"," ",new Date(this.props.timestamp).toLocaleTimeString()," (",this.state.show?"hide":"show",")"),o.a.createElement("label",null,this.props.from.fingerprint),this.state.show&&o.a.createElement("textarea",{value:this.props.message,readOnly:!0}),this.state.show&&o.a.createElement("button",{onClick:function(){e.props.reply({fingerprint:e.props.from.fingerprint,replytomessage:e.props.message})}},"Reply"))}}])&&s(n.prototype,r),a&&s(n,a),t}(o.a.Component);t.a=function(e){return o.a.createElement("div",{className:"MessagePanel"},e.messages.map((function(t,n){return o.a.createElement(m,{from:e.resolveFrom(t.from),message:t.message,timestamp:t.timestamp,key:n,verified:t.verified,reply:e.reply})})))}},35:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=function(e){return o.a.createElement("div",{className:"mini-container"},o.a.createElement("button",{onClick:function(){e.onClick(e.contact)}},e.contact.alias))};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?f(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){function t(){var e,n;s(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return m(f(n=u(this,(e=l(t)).call.apply(e,[this].concat(o)))),"state",{contacts:[],interval:0}),m(f(n),"getContacts",(function(){fetch("/umc/",{method:"GET"}).then((function(e){e.json().then((function(e){n.setState({contacts:e.filter((function(e){return!(n.props.myID&&n.props.myID()&&e.fingerprint==n.props.myID())}))}),localStorage.setItem("contacts",JSON.stringify(e))})).catch((function(e){console.log(e)}))})).catch((function(){n.setState({contacts:[]})}))})),n}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,e),n=t,(r=[{key:"componentDidMount",value:function(){this.getContacts(),this.state.interval=setInterval(this.getContacts,6e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.interval)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"PanelLeft"},o.a.createElement("h3",null," Contacts"),this.state.contacts.map((function(t,n){return o.a.createElement(a,{contact:t,key:n,onClick:e.props.selectDestination})})))}}])&&c(n.prototype,r),i&&c(n,i),t}(o.a.Component),b=n(26),h=n(28),g=function(){return o.a.createElement("div",null,o.a.createElement("h2",null,"How to use UMC"),o.a.createElement("ol",{className:"major-ordered-list"},o.a.createElement("li",null,"Create a RSA Keypair (skip if you already have a .umc file)"),o.a.createElement("ol",{className:"minor-ordered-list"},o.a.createElement("li",null,"Go to /keymanager route"),o.a.createElement("li",null,'press "Generate Keypair" button or paste keypair from other source in the boxes'),o.a.createElement("li",null,"Choose an Alias"),o.a.createElement("li",null,'Press "Register Public Key" button'),o.a.createElement("li",null,"Your SHA-256 Fingerprint in hex from will appear in the fingerprint box once your Key has been registered"),o.a.createElement("li",null,'Optional: choose a password and press "encode" to protect your private key'),o.a.createElement("li",null,"Press Export File (will download a .umc file named with your Alias)"),o.a.createElement("li",null,"If you encoded your private key, decode it before going back to Main Page"),o.a.createElement("li",null,"return to Main Page")),o.a.createElement("li",null,"Import .umc file"),o.a.createElement("ol",{className:"minor-ordered-list"},o.a.createElement("li",null,"Go to /keymanager route"),o.a.createElement("li",null,'Press "import file" button'),o.a.createElement("li",null,'If you secured your private key with a password, enter this password and press "decode"'),o.a.createElement("li",null,"return to Main Page")),o.a.createElement("li",null,"Send someone a Message"),o.a.createElement("ol",{className:"minor-ordered-list"},o.a.createElement("li",null,'Press "Outbox" button'),o.a.createElement("li",null,"Click on an Alias in the Contacts list"),o.a.createElement("li",null,"Write a Message"),o.a.createElement("li",null,'Press "Send Message" button')),o.a.createElement("li",null,"Read a Message"),o.a.createElement("ol",{className:"minor-ordered-list"},o.a.createElement("li",null,'Press "Inbox" button'),o.a.createElement("li",null,"click on the Message you would like to read (if you have any)"),o.a.createElement("li",null,"Optional: Press Reply button to switch to Outbox with this Alias as recipient"))))};function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?O(e):t}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"default",(function(){return j}));var j=function(e){function t(){var e,n;v(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return A(O(n=S(this,(e=w(t)).call.apply(e,[this].concat(o)))),"state",{destination:void 0,me:void 0}),n}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(t,e),n=t,(r=[{key:"componentDidMount",value:function(){b.register("MainPage");var e=b.getState("MainPage");e&&Object.keys(e).length>0&&this.setState(e)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Page"},o.a.createElement(y,{selectDestination:function(t){e.setState({destination:t})},myID:function(){return e.state.me?e.state.me.fingerprint:void 0}}),this.state.me&&o.a.createElement(h.a,{me:this.state.me,destination:this.state.destination,setDestination:function(t){e.setState({destination:t})}}),!this.state.me&&o.a.createElement(g,null))}}])&&E(n.prototype,r),a&&E(n,a),t}(o.a.Component)}}]);