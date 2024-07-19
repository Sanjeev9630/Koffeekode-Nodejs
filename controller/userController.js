const userValidator = require('../validator/userValidator')
const authmiddleware = require('../utils/authmiddleware')
const commonHelpher = require("../utils/commonHelpher")
const db = require("../db")


const registerController = async(req, res) => {
    try {
        const user = await userValidator.registerValidator(req.body)
        const { username, email, password } = req.body ;

        const existingUser = await db.query(`Select * from "user" where "email" = '${email}'`)
        if(existingUser.rowCount) return res.status(400).json({ message: "User already exists"})  

        const hashPass = await commonHelpher.hashPassword(password)

        const useradd = await db.query(`Insert into "user" ("username", "email", "password") values ('${username}', '${email}', '${hashPass}')`)

        const queryGet = await db.query(`Select "userid" from "user" where "email" = '${email}'`)
        let { rows } = queryGet

        res.status(201).json({ message: "User registerd successfully", "userId": rows[0].userid })

    } catch (error) {
        res.status(400).json({ error, message: "Error In Registration" })
    }
}

const loginController = async(req, res) => {
    try {
        const userLogin = await userValidator.loginValidator(req.body)
        console.log(userLogin)
        const { email, password } = req.body ;

        const existingUser = await db.query(`Select * from "user" where "email" = '${email}'`)
        if(!existingUser.rowCount) return res.status(401).json({ message: "Invalid Credentials"})
        
        const [{ email: userEmail, password: existPassword }] = existingUser.rows;   

        const comparePass = await commonHelpher.comparePassword(password, existPassword )
        if(!comparePass) return res.status(401).json({ message : "Invalid Credentials"})
   
        const jwt_token = await authmiddleware.jwtToken({ email })
        const insertjwtQuery = await db.query(`Update "user" set "currentToken" = '${jwt_token}' where "email" = '${email}'`)

        res.status(200).json({ token: jwt_token })

    } catch (error) {
        res.status(401).json({ error, message: "Error In Login" })
    }
}

const profileController = async(req, res) => {
    try {
        const decodejwt = await authmiddleware.decodeToken(req.rawHeaders[1])

        const userData = await db.query(`Select "username", "email", "currentToken" from "user" 
        where "email" = '${decodejwt.obj.email}'`)
        const { rows } = userData
        if(req.rawHeaders[1] != rows[0].currentToken) return res.status(401).json({ message: "You have been Logged out" })

        res.status(200).json({ username: rows[0].username, email: rows[0].email  })

    } catch (error) {
        res.status(401).json({ error, message: "Error In getting User Profile" })
    }
}


module.exports = { 
    loginController,
    registerController,
    profileController
}