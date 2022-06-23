import puppeteer from 'puppeteer'
import logUser from './users/login.test'

describe('rescipes features', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
    })
    page = await browser.newPage()
    await logUser(page)
  })
  
  describe('show recipes', () => {
    it('redirects to /recipes', async () => {
      await page.waitForSelector('.recipes-link')
      await page.click('.recipes-link')
      await page.waitForNavigation()
      expect(page.url()).toBe("http://localhost:3000/recipes");
    })
  })
  afterAll(() => browser.close())
})