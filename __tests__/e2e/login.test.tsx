import puppeteer from 'puppeteer'

describe('App.js', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/chromium-browser',
    })
    page = await browser.newPage()
  })

  it('contains the welcome text', async () => {
    await page.goto('http://localhost:3000/login')
    await page.waitForSelector('.username-field', {
      visible: true,
      timeout: 3000,
    })
    await page.type('.username-field', 'admin')
    await page.type('.password-field', 'admin')
    await page.click('.login-button')

    await page.waitForNavigation()
    expect(page.url()).toBe('http://localhost:3000/')
  })

  afterAll(() => browser.close())
})
