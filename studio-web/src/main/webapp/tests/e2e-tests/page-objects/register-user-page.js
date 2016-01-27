var RegisterUserPage = function() {
    var userNameInput = element(by.model('user.name'));
    var surnameInput = element(by.model('user.surname'));
    var phoneInput = element(by.model('user.phone'));
    var emailInput = element(by.model('user.email'));
    var passwordInput = element(by.model('user.password'));
    var passwordConfirmInput = element(by.model('user.passwordConfirm'));
    var registerButton = element(by.buttonText('Cadastrar'));

    this.setUserName = function(name) {
        userNameInput.sendKeys(name);
    };

    this.setSurname = function(surname) {
        surnameInput.sendKeys(surname);
    };

    this.setPhone = function(phone) {
        phoneInput.sendKeys(phone);
    };

    this.setEmail = function(email) {
        emailInput.sendKeys(email);
    };

    this.setPassword = function(password) {
        passwordInput.sendKeys(password);
    };

    this.setPasswordConfirm = function(passwordConfirm) {
        passwordConfirmInput.sendKeys(passwordConfirm);
    };

    this.getRegisterButton = function() {
        return registerButton;
    };

};

module.exports = new RegisterUserPage();
