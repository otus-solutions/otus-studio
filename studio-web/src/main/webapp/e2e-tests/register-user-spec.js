var registerUserPage = require('./page-objects/register-user-page');
var loginPage = require('./page-objects/login-page');

describe('the first time when the user tries access the login page', function() {

    beforeEach(function() {
        browser.get('studio/');
    });

    afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('clicked in button register user then should redirect', function() {

        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/');
        loginPage.getRegisterButton().click();

        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/resources/otus-studio-app/administration/register/user/register-user.html');
        browser.sleep(5000);
    });

    it('fill form with valid data should redirect to login page', function() {
    	registerUserPage.setUserName('name');
    	registerUserPage.setSurname('surname');
    	registerUserPage.setPhone('00000000000');
    	registerUserPage.setEmail('test@test.com');
    	registerUserPage.setPassword('aA1test');
    	registerUserPage.setPasswordConfirm('aA1test');
    	registerUserPage.getRegisterButton().click();

        browser.sleep(500);


    });

});
