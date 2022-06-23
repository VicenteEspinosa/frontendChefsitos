import puppeteer from 'puppeteer'

describe('App.js', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
    // const passwordInput = await page.$('.password-field')
    // await passwordInput!.click({ clickCount: 3 })
    // await passwordInput!.type('admin')
    await page.click('.login-button')

    await page.waitForNavigation()
    console.log('New Page URL:', page.url())
    const text = await page.evaluate((x) => x.value, usernameInput)
    expect(text).toBe('admin')
    // expect(inputs.length).toBe(2)
  })

  afterAll(() => browser.close())
})
