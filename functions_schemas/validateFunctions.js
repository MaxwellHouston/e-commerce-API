const bcrypt = require("bcryptjs");


module.exports = {

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
        },

    async validateCard(data) {
        
    }
            
}
