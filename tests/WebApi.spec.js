const { test, expect,request } = require('@playwright/test');
let token;
test.beforeAll('API', async() =>
{

   const apicontext = await request.newContext();
   const otpresponse=await apicontext.post("https://eehms-api-qa-evb5axf5hecfb0gz.centralindia-01.azurewebsites.net/api/auth/send-otp",
    {
        data:{identifierType:"MOBILE",identifierValue:"+919931008587",purpose:"LOGIN",userRole:"PATIENT"}
    }
   )
   expect (otpresponse.ok()).toBeTruthy();
   const otpresponseJSON=await otpresponse.json();
   console.log("OTP Message:", otpresponseJSON.message);

  const loginresponse= await apicontext.post("https://eehms-api-qa-evb5axf5hecfb0gz.centralindia-01.azurewebsites.net/api/auth/login/otp",
    {
        data:{identifier:"+919931008587",otpCode:"123456",userRole:"PATIENT"}
    }
   )
   expect(loginresponse.ok()).toBeTruthy();
   const loginresponseJSON=await loginresponse.json();
   token=loginresponseJSON.data.accessToken;
   console.log("Access Token:",token );

});


test('Patient login', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
    await page.addInitScript(value =>{
    window.localStorage.setItem('Access token',value)
   },token);
   await page.goto("https://orange-sand-05f613300.7.azurestaticapps.net/dashboard/patient-panel/home");
  
   
   await context.grantPermissions(['geolocation']);
//    await page.locator("//button[@aria-label='Doctor & Appointments']").click();
//    await page.locator("//span[text()='Find Doctors']").click();

  

});