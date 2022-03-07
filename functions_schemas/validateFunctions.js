const bcrypt = require("bcryptjs");
const { verify } = require("jsonwebtoken");
const { token_secret } = require("../config");
const Usermodel = require("../models/UserModel");

const userInstance = new Usermodel();


module.exports = {

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
        },

    async verifyPassword(password, input) {
        const checkedPassword = await bcrypt.compare(password, input);
        return checkedPassword;
    },

    async verifyToken(token) {
            const email = verify(token, token_secret).email;
            const emailCheck = await userInstance.getByEmail(email);
            if(emailCheck.rows.length === 0){
                throw new Error('Invalid login_token')
            }
            return email;
    }
            
}
