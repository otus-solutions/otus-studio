var LoginPage = function() {
    var userEmailInput = element(by.model('user.email'));
    var passwordInput = element(by.model('user.password'));
    var registerButton = element(by.buttonText('Cadastrar-se'));

    this.setUserName = function(name) {
        userNameInput.sendKeys(name);
    };

    this.setEmail = function(email) {
        emailInput.sendKeys(email);
    };

    this.setPassword = function(password) {
        passwordInput.sendKeys(password);
    };

    this.getRegisterButton = function() {
        return registerButton;
    };

};

module.exports = new LoginPage();
