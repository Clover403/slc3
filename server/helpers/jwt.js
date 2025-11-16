const jwt = require('jsonwebtoken')

const signToken=(payload)=>{
    return jwt.sign(payload, 'secretKey')
}
const verify=(token)=>{
    return jwt.verify(token, 'secretKey')
}

module.exports = {signToken, verify}