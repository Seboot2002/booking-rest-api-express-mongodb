// Entidades

class UserModel {
    constructor({ email, password, socialLogins }) {
        
        this.email = email;
        this.password = password;
        this.socialLogins = socialLogins || [];
    }

    isValidEmail() {
        return /\S+@\S+\.\S+/.test(this.email);
    }
}

module.exports = UserModel;