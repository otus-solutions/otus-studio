var registerUserPage = require('./page-objects/register-user-page');
var loginPage = require('./page-objects/login-page');

describe('the first time when the user tries access the login page', function() {

    beforeEach(function() {
        browser.get('studio/');
    });

    it('clicked in button register user then should redirect', function() {
        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/');
        // Cara, preciso clicar no botão aqui para direcionar para a tela de cadastro de usuário!
        loginPage.getRegisterButton().click();
    });
    
    it('then the system must be redirects to register administrator page', function() {
        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/resources/otus-studio-app/administration/user/register/register-user.html');
    });

    it('fill form with valid data should redirect to login page', function() {
        registerAdminPage.setUserName('Test');
        registerAdminPage.setSurname('surname');
        registerAdminPage.setPhone('00000000000');
        registerAdminPage.setEmail('test@test.com');
        registerAdminPage.setPassword('aA1test');
        registerAdminPage.setPasswordConfirm('aA1test');
        registerAdminPage.getRegisterButton().click();

        browser.sleep(500);

        // Mas no final, ele ira ser direcionado para alguma tela?! Qual?! A de login?!
        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/');
    });

});
