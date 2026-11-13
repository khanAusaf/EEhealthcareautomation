const { test } = require('@playwright/test');
let WebContext;
test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
    await page.locator("//input[@placeholder='Enter 10-digit mobile number or email Id']").fill("9931008587");
    await page.locator("button[class='otp-btn mt-3']").click();
    await page.locator("div[class='otp-part d-flex justify-content-between mt-2']").pressSequentially("123456");
    await page.locator("button[class='otp-btn mt-3']").click();
    await context.storageState({path:'state.JSON'});
    WebContext=await browser.newContext({storageState:'state.JSON'});

})

test('Patient login', async () => {
    const page=await WebContext.newPage();
    await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
    await context.grantPermissions(['geolocation']);
    await page.locator("//button[@aria-label='Doctor & Appointments']").click();
    await page.locator("//span[text()='Find Doctors']").click();

})