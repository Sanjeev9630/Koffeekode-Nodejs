const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    let salt = bcrypt.genSaltSync(10);
    let bcryptpass = bcrypt.hashSync(password, salt)
    return bcryptpass ;
}

const comparePassword = async (password, hashPassword) => {
    let compPass = bcrypt.compareSync(password, hashPassword);
    return compPass ;
}
module.exports = {
    comparePassword , hashPassword
}