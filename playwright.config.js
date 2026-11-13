// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40*1000,
  expect:{
    timeout:40*1000,
  },
  reporter:'html', 
  projects: [
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     // Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
    //     channel: 'msedge',
    //     headless: true,
    //   },
    // },
    {
         name: 'webkit',
         use: {
          ...devices['Desktop Safari'],
          headless: false,
          trace: 'on',
        },
          
     },
  ],

});

