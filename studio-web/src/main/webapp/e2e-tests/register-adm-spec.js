var registerAdminPage = require('./page-objects/register-admin-page');

describe('the first time when the user tries access the login page', function() {

    beforeEach(function() {
        browser.get('studio/');
    });

    afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('then the system must be redirects to register administrator page', function() {
        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/resources/adm-register-app/register/register-adm.html');
    });

    it('fill form with valid data should redirect to login page', function() {
        registerAdminPage.setUserName('Test');
        registerAdminPage.setSurname('surname');
        registerAdminPage.setPhone('00000000000');
        registerAdminPage.setEmail('test@test.com');
        registerAdminPage.setPassword('aA1test');
        registerAdminPage.setPasswordConfirm('aA1test');
        registerAdminPage.getRegisterButton().click();
        registerAdminPage.getConfirmAlertButton().click();

        browser.sleep(500);

        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/');
    });

});
