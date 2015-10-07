describe('the first time when the user tries access the login page', function() {

    /**
        TODO : Refactor to use page objects
    */

    it('then the system must be redirects to register administrator page', function() {
        browser.get('studio/');
        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/resources/adm-register-app/register/register-adm.html');
    });

    it('fill form with valid data should redirect to login', function() {
        element(by.model('user.name')).sendKeys('Test');
        element(by.model('user.surname')).sendKeys('Test');
        element(by.model('user.phone')).sendKeys('00000000000');
        element(by.model('user.email')).sendKeys('test@test.com');
        element(by.model('user.password')).sendKeys('aA1teste');
        element(by.model('user.passwordConfirm')).sendKeys('aA1teste');
        element(by.buttonText('Cadastrar')).click();

        element(by.css('button[ng-click="dialog.hide()"]')).click();

        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/studio/');
    });

});
