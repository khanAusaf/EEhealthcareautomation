const { test, expect } = require('@playwright/test');

test('Patient Registration', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
   await page.locator("//li/a[text()='Register']").click();
   await page.locator("//input[@placeholder='Enter full name']").fill("Asif");
   await page.locator("//input[@placeholder='Enter 10-digit mobile number']").fill("9931008587");
   await page.locator("//span[text()='Get OTP']").click();
   await page.locator("//div[@class='otp-part d-flex justify-content-between']").pressSequentially("123456");
   await page.locator("//input[@placeholder='Create a password']").fill("Password@123");
   await page.locator("#confirmPassword").pressSequentially("Password@123");
   await page.locator("#registerBtn").click();

})


test.only('Patient login', async ({ browser }) => {
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
test('Registration with existing mobile number', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
   await page.locator("//li/a[text()='Register']").click();
   await page.locator("//input[@placeholder='Enter full name']").fill("Asif");
   await page.locator("//input[@placeholder='Enter 10-digit mobile number']").fill("9931008587");
   await page.locator("//span[text()='Get OTP']").click();
   await expect(
        page.getByText('This mobile number is already registered. Please login instead.')
    ).toBeVisible();
});

test('Visual Testing',async({browser})=>
{
   const context=await browser.newContext();
   const page=await context.newPage();
   await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
   await page.waitForLoadState('networkidle');
   expect(await page.screenshot()).toMatchSnapshot('loginpage.png');

})