//const {expect} = require('@playwright/test')
const { customtest } = require('../Utils/fixture.js')

customtest('fixture', async ({ authenticatedpage }) => {
    await authenticatedpage.goto("https://orange-sand-05f613300.7.azurestaticapps.net/auth/patient/login");
    
}
);