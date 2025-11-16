const jwt = require('jsonwebtoken')

const signToken=(payload)=>{
    return jwt.sign(payload, 'secretKey')
}
const verify=(token)=>{
    return jwt.sign(token, 'secretKey')
}

module.exports = {signToken, verify}