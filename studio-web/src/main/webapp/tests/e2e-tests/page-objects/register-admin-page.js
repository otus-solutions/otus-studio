var RegisterAdminPage = function() {
    var userNameInput = element(by.model('systemConf.user.name'));
    var surnameInput = element(by.model('systemConf.user.surname'));
    var phoneInput = element(by.model('systemConf.user.phone'));
    var emailInput = element(by.model('systemConf.user.email'));
    var passwordInput = element(by.model('systemConf.user.password'));
    var passwordConfirmInput = element(by.model('systemConf.user.passwordConfirm'));
    var registerButton = element(by.buttonText('Cadastrar'));
    var confirmAlertButton = element(by.css('button[ng-click="dialog.hide()"]'));

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

    this.getConfirmAlertButton = function() {
        return confirmAlertButton;
    };

};

module.exports = new RegisterAdminPage();
