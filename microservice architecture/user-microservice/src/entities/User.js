class UserModel {

    constructor({ email, password }) {

        this.email = email;
        this.password = password;
    }

    isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}

module.exports = UserModel;