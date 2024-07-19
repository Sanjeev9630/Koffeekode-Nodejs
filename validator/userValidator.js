const {  Validator } = require('node-input-validator')

module.exports ={ 
    registerValidator: async function(dataObj) {
        let { username, email, password } = dataObj ;
        const v = new Validator(dataObj, {
            username: 'required|string',
            email: 'required|string',
            password: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { username, email: email.toLowerCase(), password }
        }
    },
    
    loginValidator: async function(dataObj) {
        let { email, password } = dataObj ;
        const v = new Validator(dataObj, {
            email: 'required|string',
            password: 'required|string',
        });

        let matched = await v.check();

        if(!matched){
            throw (v.errors)
        } else {
            return { email: email.toLowerCase(), password }
        }
    }
}