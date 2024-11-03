const argon2 = require("argon2");

function MakeHash(text) {

    return argon2.hash(text).then((hash)=>{

        return hash;
    });
}

function CompareHash(text, hash) {

    return argon2.verify(hash, text).then((result)=>{

        return result;
    });
}

module.exports = { MakeHash, CompareHash }