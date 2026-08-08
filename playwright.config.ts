import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
   forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
      ["html"],
      ["list"],
      ["allure-playwright"]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL for your application */
    baseURL: process.env.BASE_URL ?? 'http://localhost:8080',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Screenshot only on failure */
    screenshot: 'only-on-failure',

    /* Video only on first retry */
    video: 'on-first-retry',
    headless: !!process.env.CI,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'smoke',
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'regression',
      grep: /@regression/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium',
      grepInvert: /@smoke|@regression/,
      use: { ...devices['Desktop Chrome'] },
    },
      ...(process.env.CI ? [
        {
          name: 'smoke-firefox',
          grep: /@smoke/,
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'regression-firefox',
          grep: /@regression/,
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'firefox',
          grepInvert: /@smoke|@regression/,
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'smoke-webkit',
          grep: /@smoke/,
          use: { ...devices['Desktop Safari'] },
        },
        {
          name: 'regression-webkit',
          grep: /@regression/,
          use: { ...devices['Desktop Safari'] },
        },
        {
          name: 'webkit',
          grepInvert: /@smoke|@regression/,
          use: { ...devices['Desktop Safari'] },
        },
      ]: []),


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
