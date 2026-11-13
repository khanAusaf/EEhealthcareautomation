class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.registerbutton = page.locator("//li/a[text()='Register']");
        this.fullName = page.locator("//input[@placeholder='Enter full name']");
        this.mobilenumber = page.locator("//input[@placeholder='Enter 10-digit mobile number']");
        this.getOtp = page.locator("//span[text()='Get OTP']");
        this.otp = page.locator("//div[@class='otp-part d-flex justify-content-between']");
        this.password = page.locator("//input[@placeholder='Create a password']");
        this.confirmpassword = page.locator("#confirmPassword");
        this.submitbutton = page.locator("#registerBtn");
    }
    async landing() {
        await this.page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
    }

    async registration(fullName, mobilenumber, otp, password) {
        await this.registerbutton.click();
        await this.fullName.fill(fullName);
        await this.mobilenumber.fill(mobilenumber);
        await this.getOtp.click();
        await this.otp.pressSequentially(otp);
        await this.password.fill(password);
        await this.confirmpassword.pressSequentially(password);
        await this.submitbutton.click();

    }
}
module.exports = {RegistrationPage};