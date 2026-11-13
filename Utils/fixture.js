const base = require('@playwright/test')


    exports.customtest= base.test.extend({
    authenticatedpage: async ({browser }, use) =>
         {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
    await page.locator("//input[@placeholder='Enter 10-digit mobile number or email Id']").fill("9931008587");
    await page.locator("button[class='otp-btn mt-3']").click();
    await page.locator("div[class='otp-part d-flex justify-content-between mt-2']").pressSequentially("123456");
    await page.locator("button[class='otp-btn mt-3']").click();
    await use(page);
}
}
)