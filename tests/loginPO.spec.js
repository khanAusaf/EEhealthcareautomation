const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pageobjects/Registration');
//JSON->String->JS Object
const dataset = JSON.parse(JSON.stringify(require('../Utils/registrationdata.json')));

test.only('Patient Registration', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   const registrationpage = new RegistrationPage(page);
   await registrationpage.landing();
   await registrationpage.registration(dataset.fullname, dataset.mobilenumber, dataset.otp, dataset.password);

})


test('Patient login', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
   await page.locator("//input[@placeholder='Enter 10-digit mobile number or email Id']").fill("9931008587");
   await page.locator("button[class='otp-btn mt-3']").click();
   await page.locator("div[class='otp-part d-flex justify-content-between mt-2']").pressSequentially("123456");
   await page.locator("button[class='otp-btn mt-3']").click();
   await context.grantPermissions(['geolocation']);
   await page.locator("//button[@aria-label='Doctor & Appointments']").click();
   await page.locator("//span[text()='Find Doctors']").click();

})
test.only('Registration with existing mobile number', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
   await page.locator("//li/a[text()='Register']").click();
   await page.locator("//input[@placeholder='Enter full name']").fill("Asif");
   await page.locator("//input[@placeholder='Enter 10-digit mobile number']").fill("9931008584");
   await page.locator("//span[text()='Get OTP']").click();
   await expect(
      page.getByText('This mobile number is already registered. Please login instead.')
   ).toBeVisible();
});

