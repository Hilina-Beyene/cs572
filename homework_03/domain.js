const dns = require('dns');

let domain = "www.mum.edu";

dns.lookup(domain, (error, IP, family) => {
    console.log("DNS: %s and the equivalent IP: %j",domain,IP);
});